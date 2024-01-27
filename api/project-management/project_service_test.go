package projectmanagement

import (
	"context"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestProjectService_CreateProject(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("Error creating mock database: %v", err)
	}
	defer db.Close()

	repo := NewProjectRepository(db)
	service := NewProjectService(repo)

	project := &Project{
		ID:          1,
		Name:        "Test Project",
		UserID:      1,
		Description: "Test Description",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	mock.ExpectQuery("INSERT INTO projects").
		WithArgs(project.Name, project.UserID, project.Description, project.CreatedAt, project.UpdatedAt).
		WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))

	projectID, err := service.CreateProject(context.Background(), project)

	assert.NoError(t, err)
	assert.Equal(t, 1, projectID)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestProjectService_GetProjectByID(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("Error creating mock database: %v", err)
	}
	defer db.Close()

	repo := NewProjectRepository(db)
	service := NewProjectService(repo)

	projectID := 1
	expectedProject := &Project{
		ID:          projectID,
		Name:        "Test Project",
		UserID:      1,
		Description: "Test Description",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	mock.ExpectQuery("SELECT \\* FROM projects WHERE id = \\$1").
		WithArgs(projectID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "name", "user_id", "description", "created_at", "updated_at"}).
			AddRow(expectedProject.ID, expectedProject.Name, expectedProject.UserID, expectedProject.Description, expectedProject.CreatedAt, expectedProject.UpdatedAt))

	resultProject, err := service.GetProjectByID(context.Background(), projectID)

	assert.NoError(t, err)
	assert.Equal(t, expectedProject, resultProject)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestProjectService_GetAllProjects(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("Error creating mock database: %v", err)
	}
	defer db.Close()

	repo := NewProjectRepository(db)
	service := NewProjectService(repo)

	userID := 1
	expectedProjects := []*Project{
		{
			ID:          1,
			Name:        "Project 1",
			UserID:      userID,
			Description: "Description 1",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			ID:          2,
			Name:        "Project 2",
			UserID:      userID,
			Description: "Description 2",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
	}

	mock.ExpectQuery("SELECT \\* FROM projects WHERE user_id = \\$1").
		WithArgs(userID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "user_id", "name", "description", "created_at", "updated_at"}).
			AddRow(expectedProjects[0].ID, expectedProjects[0].UserID, expectedProjects[0].Name, expectedProjects[0].Description, expectedProjects[0].CreatedAt, expectedProjects[0].UpdatedAt).
			AddRow(expectedProjects[1].ID, expectedProjects[1].UserID, expectedProjects[1].Name, expectedProjects[1].Description, expectedProjects[1].CreatedAt, expectedProjects[1].UpdatedAt))

	resultProjects, err := service.GetAllProjects(context.Background(), userID)

	assert.NoError(t, err)
	assert.Equal(t, expectedProjects, resultProjects)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestProjectService_UpdateProject(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("Error creating mock database: %v", err)
	}
	defer db.Close()

	repo := NewProjectRepository(db)
	service := NewProjectService(repo)

	project := &Project{
		ID:          1,
		Name:        "Updated Project",
		UserID:      1,
		Description: "Updated Description",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	mock.ExpectExec("UPDATE projects SET name = \\$1, description = \\$2, updated_at = \\$3 WHERE id = \\$4").
		WithArgs(project.Name, project.Description, project.UpdatedAt, project.ID).
		WillReturnResult(sqlmock.NewResult(1, 1))

	err = service.UpdateProject(context.Background(), project)

	assert.NoError(t, err)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestProjectService_DeleteProject(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("Error creating mock database: %v", err)
	}
	defer db.Close()

	repo := NewProjectRepository(db)
	service := NewProjectService(repo)

	projectID := 1

	mock.ExpectExec("DELETE FROM projects WHERE id = \\$1").
		WithArgs(projectID).
		WillReturnResult(sqlmock.NewResult(1, 1))

	err = service.DeleteProject(context.Background(), projectID)

	assert.NoError(t, err)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}
