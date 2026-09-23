import logging

from app.ai.base import LLMProvider

logger = logging.getLogger(__name__)


class AIServiceError(Exception):
    pass


class AIService:
    def __init__(self, provider: LLMProvider) -> None:
        self.provider = provider

    async def generate_response(self, message: str) -> str:
        try:
            return await self.provider.generate(message)
        except Exception as error:
            logger.error("AI provider request failed: %s", error)
            raise AIServiceError from error
