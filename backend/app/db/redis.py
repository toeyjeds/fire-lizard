import redis

from app.core.config import settings

redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    decode_responses=True,
    socket_connect_timeout=2,
    socket_timeout=2,
)


def check_redis_connection() -> bool:
    try:
        return bool(redis_client.ping())
    except Exception:
        return False
