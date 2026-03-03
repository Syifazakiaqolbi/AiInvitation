"""Pydantic models for invitation request / response schemas."""

from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum


class EventType(str, Enum):
    wedding = "Wedding"
    engagement = "Engagement"
    birthday = "Birthday"
    anniversary = "Anniversary"
    graduation = "Graduation"


class Theme(str, Enum):
    minimalist = "minimalist"
    elegant = "elegant"
    modern = "modern"
    floral = "floral"


class Tone(str, Enum):
    formal = "formal"
    casual = "casual"
    poetic = "poetic"
    elegant = "elegant"


class Language(str, Enum):
    id = "id"
    en = "en"


class Music(str, Enum):
    wedding1 = "wedding1"
    wedding2 = "wedding2"
    instrumental = "instrumental"
    none = "none"


# ── Request Models ─────────────────────────────────────────────

class InvitationRequest(BaseModel):
    """Request body for generating AI invitation content."""
    event_type: EventType = Field(default=EventType.wedding, description="Type of event")
    host_names: str = Field(..., min_length=1, max_length=200, description="Host names (e.g., John & Jane)")
    date_time: str = Field(..., min_length=1, max_length=60, description="Event date and time")
    venue_name: str = Field(..., min_length=1, max_length=200, description="Venue name")
    venue_address: str = Field(..., min_length=1, max_length=500, description="Venue full address")
    maps_link: Optional[str] = Field(default="", max_length=500, description="Google Maps link")
    dress_code: str = Field(default="Formal", max_length=100, description="Dress code")
    theme: Theme = Field(default=Theme.elegant, description="Visual theme")
    tone: Tone = Field(default=Tone.formal, description="Writing tone")
    language: Language = Field(default=Language.en, description="Output language")
    music: Music = Field(default=Music.wedding1, description="Background music selection")
    temperature: Optional[float] = Field(
        default=None, ge=0.0, le=2.0,
        description="Creativity slider – overrides the server default when provided",
    )


class PublishRequest(BaseModel):
    """Request body for publishing invitation with guest list."""
    event_type: EventType
    host_names: str
    date_time: str
    venue_name: str
    venue_address: str
    maps_link: Optional[str] = ""
    dress_code: str
    theme: Theme
    tone: Tone
    language: Language
    music: Music
    selected_variation: int = Field(default=0, ge=0, le=2)
    variations: List[dict]
    guest_list: List[str] = Field(..., min_length=1)


# ── Response Models ────────────────────────────────────────────

class HeroContent(BaseModel):
    headline: str
    subheadline: str


class EventContent(BaseModel):
    title: str
    date: str
    time: str
    venue: str
    address: str


class ClosingContent(BaseModel):
    message: str
    signature: str


class Variation(BaseModel):
    hero: HeroContent
    event: EventContent
    closing: ClosingContent
    style: str


class GenerateResponse(BaseModel):
    """Response with 3 AI-generated variations."""
    variations: List[Variation]


class GuestLink(BaseModel):
    name: str
    slug: str
    link: str


class PublishResponse(BaseModel):
    """Response after publishing invitation."""
    invitation_slug: str
    main_link: str
    guest_links: List[GuestLink]
    total_guests: int


class InvitationData(BaseModel):
    """Full invitation data for guest view."""
    slug: str
    event_type: str
    host_names: str
    date_time: str
    venue_name: str
    venue_address: str
    maps_link: str
    dress_code: str
    theme: str
    tone: str
    language: str
    music: str
    variation: Variation
    guest_name: str


class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "2.0.0"


class ErrorResponse(BaseModel):
    detail: str
