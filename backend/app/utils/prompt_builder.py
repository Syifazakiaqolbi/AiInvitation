"""Structured prompt builder for the AI invitation generator."""

from app.models.invitation_model import InvitationRequest


SYSTEM_PROMPT = """You are an expert wedding invitation copywriter. Generate elegant, emotionally engaging invitation text.

Return ONLY valid JSON with exactly 3 variations. No markdown, no explanation.

Each variation must have this exact structure:
{
  "hero": { "headline": "string", "subheadline": "string" },
  "event": { "title": "string", "date": "string", "time": "string", "venue": "string", "address": "string" },
  "closing": { "message": "string", "signature": "string" },
  "style": "string"
}

Return format: { "variations": [ {variation1}, {variation2}, {variation3} ] }"""


def build_user_prompt(req: InvitationRequest) -> str:
    lang_label = "Bahasa Indonesia" if req.language.value == "id" else "English"
    tone_label = req.tone.value.capitalize()

    return f"""Generate 3 creative invitation variations for this event.

Event Details:
- Type: {req.event_type.value}
- Host Names: {req.host_names}
- Date/Time: {req.date_time}
- Venue: {req.venue_name}
- Address: {req.venue_address}
- Dress Code: {req.dress_code}
- Theme: {req.theme.value}
- Tone: {tone_label}
- Language: {lang_label}

Requirements:
1. Write ALL text in {lang_label}.
2. Each variation should have a different creative approach.
3. Variation 1: Classic and {tone_label.lower()} style
4. Variation 2: Modern and romantic style
5. Variation 3: Traditional and heartfelt style
6. hero.headline: The couple's names beautifully formatted
7. hero.subheadline: A warm, inviting message (2-3 sentences)
8. event.title: The event name (e.g., "Wedding Ceremony", "Akad Nikah")
9. event.date: Formatted date (e.g., "Saturday, March 15, 2026")
10. event.time: Formatted time (e.g., "10:00 AM onwards")
11. event.venue: Venue name
12. event.address: Full address
13. closing.message: A warm closing (1-2 sentences)
14. closing.signature: The couple's signature line
15. style: One of "elegant", "modern", "minimalist"

Return ONLY the JSON object with variations array."""
