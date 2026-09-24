from app.ai.service import AIService
from app.repositories.chat_repository import ChatRepository
from app.schemas.chat import ChatRequest, ChatResponse
from app.db.redis import redis_client


class ChatService:
    def __init__(self, ai_service: AIService, repository: ChatRepository):
        self.ai_service = ai_service
        self.repository = repository

    async def process_chat(self, request: ChatRequest) -> ChatResponse:
        message = request.message.strip()
        if not message:
            raise ValueError("Message is required.")

        try:
            self.repository.save_message(message)
        except Exception:
            pass

        try:
            redis_client.setex("last_chat_message", 300, message)
        except Exception:
            pass

        response = await self.ai_service.generate_response(message)
        return ChatResponse(message=response)
