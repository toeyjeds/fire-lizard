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

logs-gateway:
	podman compose logs -f cds-gateway-service

logs-orch:
	podman compose logs -f cds-orch-service

ps:
	podman compose ps

clean:
	podman compose down -v
