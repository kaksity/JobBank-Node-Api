build:
	docker-compose build

up:
	docker-compose up

up-d:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down -v

bash:
	docker-compose exec node /bin/sh
