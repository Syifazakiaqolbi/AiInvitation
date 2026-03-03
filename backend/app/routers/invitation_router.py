"""Invitation router – AI generation, publish, and retrieval."""

import io
import logging
import uuid
import re
from typing import Dict

from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import StreamingResponse

import qrcode

from app.models.invitation_model import (
    InvitationRequest,
    PublishRequest,
    GenerateResponse,
    PublishResponse,
    GuestLink,
    InvitationData,
    ErrorResponse,
    Variation,
    HeroContent,
    EventContent,
    ClosingContent,
)
from app.services.ai_service import generate_invitation_variations
from app.config.settings import settings

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["invitations"])

# ── In-memory store (swap for a real DB in production) ───────────────
_invitations: Dict[str, dict] = {}
_guests: Dict[str, dict] = {}  # key: f"{invitation_slug}:{guest_slug}"


def _generate_slug(text: str = "", length: int = 12) -> str:
    """Generate a URL-safe slug."""
    if text:
        # Create slug from text
        slug = re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')
        suffix = uuid.uuid4().hex[:6]
        return f"{slug[:20]}-{suffix}"
    # Random slug
    return uuid.uuid4().hex[:length]


def _generate_guest_slug(name: str) -> str:
    """Generate a guest slug from name."""
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    suffix = uuid.uuid4().hex[:4]
    return f"{slug[:30]}-{suffix}"


# ────────────────────────────────────────────────────────────────────
# POST /api/generate – Generate AI content variations
# ────────────────────────────────────────────────────────────────────
async def _do_generate(req: InvitationRequest) -> GenerateResponse:
    """Shared logic for invitation generation."""
    try:
        variations = await generate_invitation_variations(req)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:
        logger.exception("AI generation failed")
        raise HTTPException(status_code=500, detail=str(exc))

    # Convert to response model
    result = []
    for v in variations:
        result.append(Variation(
            hero=HeroContent(**v["hero"]),
            event=EventContent(**v["event"]),
            closing=ClosingContent(**v["closing"]),
            style=v["style"],
        ))

    return GenerateResponse(variations=result)


@router.post(
    "/generate",
    response_model=GenerateResponse,
    responses={500: {"model": ErrorResponse}},
    summary="Generate 3 AI-powered invitation variations",
)
async def generate_invitation(req: InvitationRequest):
    return await _do_generate(req)


@router.post(
    "/generate-invitation",
    response_model=GenerateResponse,
    responses={500: {"model": ErrorResponse}},
    include_in_schema=False,
)
async def generate_invitation_alias(req: InvitationRequest):
    """Alias endpoint for frontend compatibility."""
    return await _do_generate(req)


# ────────────────────────────────────────────────────────────────────
# POST /api/publish – Publish invitation and generate guest links
# ────────────────────────────────────────────────────────────────────
@router.post(
    "/publish",
    response_model=PublishResponse,
    responses={400: {"model": ErrorResponse}},
    summary="Publish invitation and generate guest links",
)
async def publish_invitation(req: PublishRequest):
    if not req.guest_list or len(req.guest_list) == 0:
        raise HTTPException(status_code=400, detail="At least one guest is required")

    if req.selected_variation >= len(req.variations):
        raise HTTPException(status_code=400, detail="Invalid variation selection")

    # Generate invitation slug
    invitation_slug = _generate_slug(req.host_names)
    
    # Store invitation data
    _invitations[invitation_slug] = {
        "slug": invitation_slug,
        "event_type": req.event_type.value,
        "host_names": req.host_names,
        "date_time": req.date_time,
        "venue_name": req.venue_name,
        "venue_address": req.venue_address,
        "maps_link": req.maps_link or "",
        "dress_code": req.dress_code,
        "theme": req.theme.value,
        "tone": req.tone.value,
        "language": req.language.value,
        "music": req.music.value,
        "variation": req.variations[req.selected_variation],
    }

    # Generate guest links
    base_url = settings.base_url
    guest_links = []
    
    for guest_name in req.guest_list:
        guest_name = guest_name.strip()
        if not guest_name:
            continue
            
        guest_slug = _generate_guest_slug(guest_name)
        
        # Store guest data
        _guests[f"{invitation_slug}:{guest_slug}"] = {
            "invitation_slug": invitation_slug,
            "guest_slug": guest_slug,
            "guest_name": guest_name,
        }
        
        link = f"{base_url}/invite/{invitation_slug}/{guest_slug}"
        guest_links.append(GuestLink(
            name=guest_name,
            slug=guest_slug,
            link=link,
        ))

    main_link = f"{base_url}/invite/{invitation_slug}/guest"
    
    logger.info("Published invitation %s with %d guests", invitation_slug, len(guest_links))

    return PublishResponse(
        invitation_slug=invitation_slug,
        main_link=main_link,
        guest_links=guest_links,
        total_guests=len(guest_links),
    )


# ────────────────────────────────────────────────────────────────────
# GET /api/invitation/{slug}/{guest_slug} – Get invitation data
# ────────────────────────────────────────────────────────────────────
@router.get(
    "/invitation/{invitation_slug}/{guest_slug}",
    response_model=InvitationData,
    responses={404: {"model": ErrorResponse}},
    summary="Get invitation data for guest view",
)
async def get_invitation(invitation_slug: str, guest_slug: str):
    # Find invitation
    invitation = _invitations.get(invitation_slug)
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")

    # Find guest or use default
    guest_key = f"{invitation_slug}:{guest_slug}"
    guest = _guests.get(guest_key, {"guest_name": "Guest"})
    guest_name = guest.get("guest_name", "Guest")

    # Build variation model
    v = invitation["variation"]
    variation = Variation(
        hero=HeroContent(**v["hero"]),
        event=EventContent(**v["event"]),
        closing=ClosingContent(**v["closing"]),
        style=v["style"],
    )

    return InvitationData(
        slug=invitation["slug"],
        event_type=invitation["event_type"],
        host_names=invitation["host_names"],
        date_time=invitation["date_time"],
        venue_name=invitation["venue_name"],
        venue_address=invitation["venue_address"],
        maps_link=invitation["maps_link"],
        dress_code=invitation["dress_code"],
        theme=invitation["theme"],
        tone=invitation["tone"],
        language=invitation["language"],
        music=invitation["music"],
        variation=variation,
        guest_name=guest_name,
    )


# ────────────────────────────────────────────────────────────────────
# GET /api/qr/{invitation_slug}/{guest_slug} – QR code as PNG
# ────────────────────────────────────────────────────────────────────
@router.get(
    "/qr/{invitation_slug}/{guest_slug}",
    summary="Get QR code image for guest invitation link",
    responses={404: {"model": ErrorResponse}},
)
async def get_qr_code(invitation_slug: str, guest_slug: str):
    if invitation_slug not in _invitations:
        raise HTTPException(status_code=404, detail="Invitation not found")

    link = f"{settings.base_url}/invite/{invitation_slug}/{guest_slug}"

    img = qrcode.make(link)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/png")
