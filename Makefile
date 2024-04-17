all: build up

pull:  ## Pulls the database
	docker compose pull db

build: pull
	docker compose build nestjs
	docker compose build client

up:
	docker compose up -d

down:
	docker compose down

logs-server:
	docker compose logs --follow nestjs