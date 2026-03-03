"""Application settings loaded from environment variables."""

from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    # AI
    dashscope_api_key: str = Field(default="", alias="DASHSCOPE_API_KEY")

    # App
    app_env: str = Field(default="development", alias="APP_ENV")
    log_level: str = Field(default="info", alias="LOG_LEVEL")
    default_temperature: float = Field(default=0.85, alias="DEFAULT_TEMPERATURE")
    frontend_origin: str = Field(default="http://localhost:5173", alias="FRONTEND_ORIGIN")
    base_url: str = Field(default="http://localhost:5170", alias="BASE_URL")

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
