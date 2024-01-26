package projectmanagement

import (
	"context"
	"database/sql"
	"log"
	"os"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

var (
	db   *sql.DB
	mock sqlmock.Sqlmock
)

var project = &Project{
	ID:          1,
	Name:        "Test Project",
	Description: "Test Description",
	CreatedAt:   time.Now(),
	UpdatedAt:   time.Now(),
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

func TestProjectRepository_CreateProject(t *testing.T) {
	rows := sqlmock.NewRows([]string{"id"}).AddRow(1)

	mock.ExpectQuery("INSERT INTO projects \\(name, description, created_at, updated_at\\) VALUES \\(\\$1, \\$2, \\$3, \\$4\\) RETURNING id").
		WithArgs(project.Name, project.Description, project.CreatedAt, project.UpdatedAt).
		WillReturnRows(rows)

	repo := &ProjectRepository{db}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	projectID, err := repo.CreateProject(ctx, project)
	assert.NoError(t, err)
	assert.Equal(t, project.ID, projectID)
}

func TestProjectRepository_GetProjectByID(t *testing.T) {
	rows := sqlmock.NewRows([]string{"id", "name", "description", "created_at", "updated_at"}).
		AddRow(project.ID, project.Name, project.Description, project.CreatedAt, project.UpdatedAt)

	mock.ExpectQuery("SELECT \\* FROM projects WHERE id = \\$1").
		WithArgs(project.ID).
		WillReturnRows(rows)

	repo := &ProjectRepository{db}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	retrievedProject, err := repo.GetProjectByID(ctx, project.ID)
	assert.NoError(t, err)
	assert.NotNil(t, retrievedProject)
	assert.Equal(t, project.ID, retrievedProject.ID)
	assert.Equal(t, project.Name, retrievedProject.Name)
	assert.Equal(t, project.Description, retrievedProject.Description)
	assert.Equal(t, project.CreatedAt, retrievedProject.CreatedAt)
	assert.Equal(t, project.UpdatedAt, retrievedProject.UpdatedAt)
}

func TestProjectRepository_UpdateProject(t *testing.T) {
	mock.ExpectExec("UPDATE projects SET name = \\$1, description = \\$2, updated_at = \\$3 WHERE id = \\$4").
		WithArgs(project.Name, project.Description, project.UpdatedAt, project.ID).
		WillReturnResult(sqlmock.NewResult(0, 1))

	repo := &ProjectRepository{db}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := repo.UpdateProject(ctx, project)

	assert.NoError(t, err)
}

func TestProjectRepository_DeleteProject(t *testing.T) {
	mock.ExpectExec("DELETE FROM projects WHERE id = \\$1").
		WithArgs(project.ID).
		WillReturnResult(sqlmock.NewResult(0, 1))

	repo := &ProjectRepository{db}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := repo.DeleteProject(ctx, project.ID)

	assert.NoError(t, err)
}
