from app.ai.base import LLMProvider


class AIService:
    def __init__(self, provider: LLMProvider):
        self.provider = provider

    async def generate_response(self, prompt: str) -> str:
        if not prompt or not prompt.strip():
            raise ValueError("Message is required.")
        return await self.provider.generate(prompt)
