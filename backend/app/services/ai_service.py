"""AI service – calls Qwen via DashScope compatible API."""

import logging
import httpx
import json
from typing import List, Dict, Any

from app.config.settings import settings
from app.utils.prompt_builder import SYSTEM_PROMPT, build_user_prompt
from app.models.invitation_model import InvitationRequest

logger = logging.getLogger(__name__)

DASHSCOPE_CHAT_URL = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions"


async def generate_invitation_variations(req: InvitationRequest) -> List[Dict[str, Any]]:
    """Send the structured prompt to Qwen and return 3 variations."""

    api_key = settings.dashscope_api_key
    if not api_key or api_key == "your_dashscope_api_key_here":
        raise ValueError(
            "DASHSCOPE_API_KEY is not configured. "
            "Set it in the .env file before calling the AI service."
        )

    temperature = req.temperature if req.temperature is not None else settings.default_temperature
    # Qwen API requires temperature in [0.0, 2.0) — clamp to safe max
    temperature = max(0.0, min(temperature, 1.99))
    user_prompt = build_user_prompt(req)

    payload = {
        "model": "qwen-plus",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": temperature,
        "max_tokens": 4096,
        "response_format": {"type": "json_object"},
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    logger.info("Calling Qwen AI (model=qwen-plus, temperature=%.2f)", temperature)

    async with httpx.AsyncClient(timeout=90.0) as client:
        resp = await client.post(DASHSCOPE_CHAT_URL, json=payload, headers=headers)

    if resp.status_code != 200:
        body = resp.text
        logger.error("Qwen API error %s: %s", resp.status_code, body)
        raise RuntimeError(f"AI service returned HTTP {resp.status_code}")

    data = resp.json()

    # Extract generated text
    try:
        text: str = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError) as exc:
        logger.error("Unexpected Qwen response structure: %s", data)
        raise RuntimeError("Failed to parse AI response") from exc

    # Parse JSON response
    try:
        # Strip markdown fences if present
        cleaned = text.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("\n", 1)[1] if "\n" in cleaned else cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned.rsplit("```", 1)[0]
        cleaned = cleaned.strip()
        
        parsed = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        logger.error("Failed to parse AI JSON response: %s", text)
        raise RuntimeError("AI returned invalid JSON") from exc

    # Extract variations array
    variations = parsed.get("variations", [])
    if not variations and isinstance(parsed, list):
        variations = parsed

    if len(variations) < 1:
        logger.error("No variations in AI response: %s", parsed)
        raise RuntimeError("AI returned no variations")

    # Validate and normalize each variation
    validated = []
    for v in variations[:3]:
        validated.append(validate_variation(v, req))

    # Ensure we have exactly 3 variations
    while len(validated) < 3:
        validated.append(validated[0] if validated else get_fallback_variation(req))

    return validated


def validate_variation(v: dict, req: InvitationRequest) -> dict:
    """Validate and normalize a variation structure."""
    hero = v.get("hero", {})
    event = v.get("event", {})
    closing = v.get("closing", {})
    
    return {
        "hero": {
            "headline": hero.get("headline", req.host_names),
            "subheadline": hero.get("subheadline", "You are cordially invited to celebrate with us."),
        },
        "event": {
            "title": event.get("title", f"{req.event_type.value} Ceremony"),
            "date": event.get("date", req.date_time.split("T")[0] if "T" in req.date_time else req.date_time),
            "time": event.get("time", req.date_time.split("T")[1] if "T" in req.date_time else ""),
            "venue": event.get("venue", req.venue_name),
            "address": event.get("address", req.venue_address),
        },
        "closing": {
            "message": closing.get("message", "We look forward to celebrating with you."),
            "signature": closing.get("signature", req.host_names),
        },
        "style": v.get("style", req.theme.value),
    }


def get_fallback_variation(req: InvitationRequest) -> dict:
    """Generate a fallback variation if AI fails."""
    return {
        "hero": {
            "headline": req.host_names,
            "subheadline": "You are cordially invited to celebrate our special day with us.",
        },
        "event": {
            "title": f"{req.event_type.value} Ceremony",
            "date": req.date_time.split("T")[0] if "T" in req.date_time else req.date_time,
            "time": req.date_time.split("T")[1] if "T" in req.date_time else "",
            "venue": req.venue_name,
            "address": req.venue_address,
        },
        "closing": {
            "message": "We look forward to celebrating with you.",
            "signature": req.host_names,
        },
        "style": req.theme.value,
    }
