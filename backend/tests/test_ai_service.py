import pytest

from app.ai.providers.mock import MockLLMProvider
from app.ai.service import AIService


@pytest.mark.asyncio
async def test_mock_provider_generates_response() -> None:
    service = AIService(MockLLMProvider())

    response = await service.generate_response("Hello AI")

    assert "Hello AI" in response
    assert "mock response" in response
