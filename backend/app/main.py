from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.ai.providers.mock import MockLLMProvider
from app.ai.service import AIService
from app.api.routes import chat, health
from app.core.config import get_settings
from app.core.logging import configure_logging
from app.services.chat import ChatService

configure_logging()
settings = get_settings()

chat_service = ChatService(AIService(MockLLMProvider()))

app = FastAPI(title=settings.app_name, version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(health.router, prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")
