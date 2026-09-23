.PHONY: build up down restart logs logs-backend ps clean test

build:
	podman compose build

up:
	podman compose up -d

down:
	podman compose down

restart:
	podman compose down
	podman compose up -d

logs:
	podman compose logs -f

logs-backend:
	podman compose logs -f backend

ps:
	podman compose ps

clean:
	podman compose down -v

test:
	cd backend && python -m pytest
