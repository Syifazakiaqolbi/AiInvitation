"""FastAPI application entry point."""

import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config.settings import settings
from app.models.invitation_model import HealthResponse
from app.routers.invitation_router import router as invitation_router

# ── Logging ──────────────────────────────────────────────────────────
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s │ %(levelname)-8s │ %(name)s │ %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)

# ── App ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="AI Invitation Generator",
    description="Generate elegant, AI-powered event invitations with RSVP, QR codes, and PDF export.",
    version="1.0.0",
)

# ── CORS (must be added before routers) ──────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──────────────────────────────────────────────────────────
app.include_router(invitation_router)


# ── Health Check ─────────────────────────────────────────────────────
@app.get("/health", response_model=HealthResponse, tags=["system"])
async def health_check():
    return HealthResponse()


logger.info("AI Invitation Generator ready (env=%s)", settings.app_env)
