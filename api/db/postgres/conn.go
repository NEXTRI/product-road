package postgres

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

// Connect establishes a connection to the PostgreSQL database.
func Connect() error {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	connectionString := os.Getenv("DATABASE_URL") + "?sslmode=disable"

	conn, err := sql.Open("postgres", connectionString)

	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
		return err
	}

	err = conn.Ping()
	if err != nil {
		log.Fatalf("Error pinging the database: %v", err)
		return err
	}

	db = conn
	return nil
}

// GetDBConnection returns the current database connection.
func GetDBConnection() *sql.DB {
  return db
}
