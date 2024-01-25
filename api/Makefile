include .env

DB_CONNECTION := ${DATABASE_URL}?sslmode=disable

.PHONY: migrateup
migrateup:
	migrate -path db/migrations/ -database ${DB_CONNECTION} up

.PHONY: migratedown
migratedown:
	migrate -path db/migrations/ -database ${DB_CONNECTION} down

.PHONY: createmigration
createmigration:
	migrate create -ext sql -dir db/migrations/ -seq new_migration
