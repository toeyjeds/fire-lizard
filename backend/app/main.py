from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.api.routes.ai import router as ai_router
from app.api.routes.health import router as health_router
from app.db.database import Base, engine
from app.models.chat import ChatMessage  # noqa: F401


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="AI Hackathon Demo",
    version="1.0.0",
    description="FastAPI backend for the AI Hackathon demo application.",
    lifespan=lifespan,
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(ai_router, prefix="/api/v1")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Request validation failed.",
                "details": exc.errors(),
            },
        },
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    detail: Any = exc.detail if isinstance(exc.detail, dict) else {"message": str(exc.detail)}
    payload = {
        "success": False,
        "error": {
            "code": detail.get("code", "HTTP_ERROR"),
            "message": detail.get("message", str(exc.detail)),
        },
    }
    if "details" in detail:
        payload["error"]["details"] = detail["details"]
    return JSONResponse(status_code=exc.status_code, content=payload)


@app.exception_handler(Exception)
async def generic_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    if isinstance(exc, HTTPException):
        return await http_exception_handler(_, exc)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected server error occurred.",
            },
        },
    )


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "AI Hackathon Demo API"}
