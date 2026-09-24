from app.models.chat import ChatMessage
from app.db.database import SessionLocal


class ChatRepository:
    def save_message(self, message: str) -> bool:
        db = SessionLocal()
        try:
            db.add(ChatMessage(content=message))
            db.commit()
            return True
        except Exception:
            return False
        finally:
            db.close()
