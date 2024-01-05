include .env

DB_CONNECTION := ${DATABASE_URL}?sslmode=disable

.PHONY: migrateup
migrateup:
	migrate -path api/db/migrations/ -database ${DB_CONNECTION} up

.PHONY: migratedown
migratedown:
	migrate -path api/db/migrations/ -database ${DB_CONNECTION} down
