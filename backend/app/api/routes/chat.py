from fastapi import APIRouter, HTTPException, status

from app.ai.service import AIServiceError
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat import ChatService

router = APIRouter(prefix="/ai", tags=["ai"])


def get_chat_service() -> ChatService:
    from app.main import chat_service

    return chat_service


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        response = await get_chat_service().respond(request.message)
    except AIServiceError as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail={"code": "AI_SERVICE_ERROR", "message": "Unable to process AI request"},
        ) from error
    return ChatResponse(message=response)
