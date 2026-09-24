import asyncio

from app.ai.providers.mock import MockLLMProvider
from app.ai.service import AIService


def test_mock_provider_returns_response() -> None:
    provider = MockLLMProvider()
    response = asyncio.run(provider.generate("Hello AI"))

    assert "Hello! How can I help you?" in response


def test_ai_service_requires_message() -> None:
    service = AIService(MockLLMProvider())

    try:
        asyncio.run(service.generate_response("   "))
        assert False, "Expected ValueError for empty message"
    except ValueError:
        pass
