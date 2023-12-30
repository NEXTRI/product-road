package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	_ "github.com/lib/pq"
	"github.com/nextri/product-road/authentication/model"
)

// PostgresRepository is a PostgreSQL implementation of the Repository interface.
type PostgresRepository struct {
	db *sql.DB
}

// NewPostgresRepository creates a new PostgresRepository instance.
func NewPostgresRepository(connectionString string) (*PostgresRepository, error) {
  db, err := sql.Open("postgres", connectionString)

  if err != nil {
		return nil, err
	}

  return &PostgresRepository{db: db}, nil
}

// CheckEmailExists checks if an email already exists in the database.
func (r *PostgresRepository) CheckEmailExists(ctx context.Context, email string) (bool, error) {

  var exists bool

  ctx, cancel := context.WithTimeout(ctx, 5 * time.Second)
  defer cancel()

  err := r.db.QueryRowContext(ctx, "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)", email).Scan(&exists)

  if err != nil {
    if errors.Is(err, context.DeadlineExceeded) {
      return false, fmt.Errorf("timeout exceeded while checking email existence")
    }
    return false, err
  }
  return exists, nil
}

// CreateUser creates a new user in the database.
func (r *PostgresRepository) CreateUser(ctx context.Context, user *model.User) error {
  _, err := r.db.ExecContext(ctx, "INSERT INTO users (email) VALUES ($1)", user.Email)

  if err != nil {
    return err
  }

  return nil
}

// GetUserByID retrieves a user by ID from the database.
func (r *PostgresRepository) GetUserByID(ctx context.Context, id int) (*model.User, error) {
  var user model.User

  ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
  defer cancel()

  err := r.db.QueryRowContext(ctx, "SELECT * FROM users WHERE id = $1", id).Scan(&user.ID, &user.Username, &user.Email, &user.FullName, &user.ProfilePicture, &user.CreatedAt, &user.UpdatedAt)

  if err != nil {
    if errors.Is(err, context.DeadlineExceeded) {
      return &user, fmt.Errorf("timeout exceeded while trying get record")
    }
    return &user, err
  }

  return &user, nil
}

// GetUserByEmail retrieves a user by email from the database.
func (r *PostgresRepository) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
  var user model.User

  ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
  defer cancel()

  err := r.db.QueryRowContext(ctx, "SELECT * FROM users WHERE email = $1", email).Scan(&user.ID, &user.Username, &user.Email, &user.FullName, &user.ProfilePicture, &user.CreatedAt, &user.UpdatedAt)

  if err != nil {
    if errors.Is(err, context.DeadlineExceeded) {
      return &user, fmt.Errorf("timeout exceeded while trying get record")
    }
    return &user, err
  }

  return &user, nil
}
