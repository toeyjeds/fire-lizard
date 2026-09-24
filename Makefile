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
