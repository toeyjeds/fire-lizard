from app.ai.base import LLMProvider


class MockLLMProvider(LLMProvider):
    async def generate(self, prompt: str) -> str:
        cleaned_prompt = " ".join(prompt.split())
        return f"I received: {cleaned_prompt}. This is a mock response ready for your demo."
