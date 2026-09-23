from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_chat_endpoint_uses_mock_provider() -> None:
    response = client.post("/api/v1/ai/chat", json={"message": "Give me an idea"})

    assert response.status_code == 200
    assert "Give me an idea" in response.json()["message"]


def test_chat_endpoint_validates_empty_message() -> None:
    response = client.post("/api/v1/ai/chat", json={"message": ""})

    assert response.status_code == 422
