from app.ai.base import LLMProvider


class MockLLMProvider(LLMProvider):
    async def generate(self, prompt: str) -> str:
        message = prompt.strip()
        if not message:
            return "I’m ready to help. Please share your question."

        lowered = message.lower()
        if "hello" in lowered:
            return "Hello! How can I help you?"

        if "thank" in lowered:
            return "You’re welcome! I’m here whenever you need more help."

        return (
            f"Mock AI response: I received your message: '{message}'. "
            "This demo is running with the offline mock provider."
        )
