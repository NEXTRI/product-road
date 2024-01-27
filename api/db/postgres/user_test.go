package postgres

import (
	"context"
	"log"
	"os"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"

	"github.com/nextri/product-road/model"
	"github.com/stretchr/testify/assert"
)

var (
	mock   sqlmock.Sqlmock
)

var user = &model.User{
	ID:       1,
	Email:    "test@test.com",
	Username: "testuser",
}

func TestMain(m *testing.M) {
  var err error
  db, mock, err = sqlmock.New()
  if err != nil {
    log.Fatalf("error creating mock: %v", err)
  }
  defer db.Close()

  exitVal := m.Run()

  if err := mock.ExpectationsWereMet(); err != nil {
    log.Fatalf("expectations not met: %v", err)
  }

  os.Exit(exitVal)
}

func TestUserRepository_CheckEmailExists(t *testing.T) {
	rows := sqlmock.NewRows([]string{"exists"}).AddRow(true)

	mock.ExpectQuery("SELECT EXISTS \\(SELECT 1 FROM users WHERE email = \\$1\\)").
		WithArgs(user.Email).
		WillReturnRows(rows)

	repo := NewUserRepository()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	exists, err := repo.CheckEmailExists(ctx, user.Email)

	assert.NoError(t, err)
	assert.True(t, exists)
}

func TestPostgresRepository_CreateUser(t *testing.T) {
  createUserResult := sqlmock.NewResult(1, 1)
  mock.ExpectExec("INSERT INTO users \\(email\\) VALUES \\(\\$1\\)").
    WithArgs(user.Email).
    WillReturnResult(createUserResult)

  repo := NewUserRepository()

  ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
  defer cancel()

  err := repo.CreateUser(ctx, user)

  assert.NoError(t, err)
}

func TestPostgresRepository_GetUserByID(t *testing.T) {
  rows := sqlmock.NewRows([]string{"id", "username", "email", "full_name", "profile_picture", "created_at", "updated_at"}).AddRow(user.ID, user.Username, user.Email, user.FullName, user.ProfilePicture, user.CreatedAt, user.UpdatedAt)

  mock.ExpectQuery("SELECT \\* FROM users WHERE id = \\$1").
  WithArgs(user.ID).
  WillReturnRows(rows)

  repo := NewUserRepository()

  ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
  defer cancel()

  retrievedUser, err := repo.GetUserByID(ctx, int(user.ID))

  assert.NoError(t, err)
  assert.NotNil(t, retrievedUser)
  assert.Equal(t, user.ID, retrievedUser.ID)
  assert.Equal(t, user.Email, retrievedUser.Email)
  assert.Equal(t, user.Username, retrievedUser.Username)
  assert.Equal(t, user.FullName, retrievedUser.FullName)
  assert.Equal(t, user.ProfilePicture, retrievedUser.ProfilePicture)
  assert.Equal(t, user.CreatedAt, retrievedUser.CreatedAt)
  assert.Equal(t, user.UpdatedAt, retrievedUser.UpdatedAt)
}

func TestPostgresRepository_GetUserByEmail(t *testing.T) {
  rows := sqlmock.NewRows([]string{"id", "username", "email", "full_name", "profile_picture", "createdAt", "updatedAt"}).AddRow(user.ID, user.Username, user.Email, user.FullName, user.ProfilePicture, user.CreatedAt, user.UpdatedAt)

  mock.ExpectQuery("SELECT \\* FROM users WHERE email = \\$1").
  WithArgs(user.Email).
  WillReturnRows(rows)

  repo := NewUserRepository()

  ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
  defer cancel()

  retrievedUser, err := repo.GetUserByEmail(ctx, user.Email)

  assert.NoError(t, err)
  assert.NotNil(t, retrievedUser)
  assert.Equal(t, user.ID, retrievedUser.ID)
  assert.Equal(t, user.Email, retrievedUser.Email)
  assert.Equal(t, user.Username, retrievedUser.Username)
  assert.Equal(t, user.FullName, retrievedUser.FullName)
  assert.Equal(t, user.ProfilePicture, retrievedUser.ProfilePicture)
  assert.Equal(t, user.CreatedAt, retrievedUser.CreatedAt)
  assert.Equal(t, user.UpdatedAt, retrievedUser.UpdatedAt)
}
