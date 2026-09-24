from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_chat_api_returns_successful_response() -> None:
    response = client.post("/api/v1/ai/chat", json={"message": "Hello AI"})

    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert "message" in payload
    assert payload["message"] == "Hello! How can I help you?"


def test_chat_api_validates_empty_message() -> None:
    response = client.post("/api/v1/ai/chat", json={"message": ""})

    assert response.status_code == 422
    payload = response.json()
    assert payload["success"] is False
    assert payload["error"]["code"] == "VALIDATION_ERROR"
