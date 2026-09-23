from app.ai.service import AIService


class ChatService:
    def __init__(self, ai_service: AIService) -> None:
        self.ai_service = ai_service

    async def respond(self, message: str) -> str:
        return await self.ai_service.generate_response(message)
