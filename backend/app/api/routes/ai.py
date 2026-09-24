from fastapi import APIRouter, HTTPException

from app.ai.providers.mock import MockLLMProvider
from app.ai.service import AIService
from app.repositories.chat_repository import ChatRepository
from app.schemas.chat import ChatRequest
from app.services.chat_service import ChatService

router = APIRouter()
chat_service = ChatService(ai_service=AIService(MockLLMProvider()), repository=ChatRepository())


@router.post("/ai/chat")
async def chat(request: ChatRequest):
    try:
        response = await chat_service.process_chat(request)
        return {"success": True, "message": response.message}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail={"code": "AI_SERVICE_ERROR", "message": str(exc)}) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={"code": "AI_SERVICE_ERROR", "message": "Unable to process AI request"},
        ) from exc
