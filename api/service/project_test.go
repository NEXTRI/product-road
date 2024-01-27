package service

import (
	"context"
	"testing"
	"time"

	"github.com/nextri/product-road/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockProjectRepository struct {
	mock.Mock
}

func (m *MockProjectRepository) CreateProject(ctx context.Context, project *model.Project) (int, error) {
	args := m.Called(ctx, project)
	return args.Int(0), args.Error(1)
}

func (m *MockProjectRepository) GetProjectByID(ctx context.Context, projectID int) (*model.Project, error) {
	args := m.Called(ctx, projectID)
	return args.Get(0).(*model.Project), args.Error(1)
}

func (m *MockProjectRepository) GetAllProjects(ctx context.Context, userID int) ([]*model.Project, error) {
	args := m.Called(ctx, userID)
	return args.Get(0).([]*model.Project), args.Error(1)
}

func (m *MockProjectRepository) UpdateProject(ctx context.Context, project *model.Project) error {
	args := m.Called(ctx, project)
	return args.Error(0)
}

func (m *MockProjectRepository) DeleteProject(ctx context.Context, projectID int) error {
	args := m.Called(ctx, projectID)
	return args.Error(0)
}

func TestProjectService_CreateProject(t *testing.T) {
	repo := new(MockProjectRepository)
	
  projectService := NewProjectService(repo)

	project := &model.Project{
		Name:        "Test Project",
		UserID:      1,
		Description: "Test Description",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	repo.On("CreateProject", mock.Anything, project).Return(1, nil)

	projectID, err := projectService.CreateProject(context.Background(), project)

	assert.NoError(t, err)
	assert.Equal(t, 1, projectID)

	repo.AssertExpectations(t)
}

func TestProjectService_GetProjectByID(t *testing.T) {
	repo := new(MockProjectRepository)
	
  projectService := NewProjectService(repo)

	projectID := 1
	expectedProject := &model.Project{
		ID:          projectID,
		Name:        "Test Project",
		UserID:      1,
		Description: "Test Description",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	repo.On("GetProjectByID", mock.Anything, projectID).Return(expectedProject, nil)

	resultProject, err := projectService.GetProjectByID(context.Background(), projectID)

	assert.NoError(t, err)
	assert.Equal(t, expectedProject, resultProject)

	repo.AssertExpectations(t)
}

func TestProjectService_GetAllProjects(t *testing.T) {
	repo := new(MockProjectRepository)
	
  projectService := NewProjectService(repo)

	userID := 1
	expectedProjects := []*model.Project{
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

	repo.On("GetAllProjects", mock.Anything, userID).Return(expectedProjects, nil)

	resultProjects, err := projectService.GetAllProjects(context.Background(), userID)

	assert.NoError(t, err)
	assert.Equal(t, expectedProjects, resultProjects)

	repo.AssertExpectations(t)
}

func TestProjectService_UpdateProject(t *testing.T) {
	repo := new(MockProjectRepository)
	
  projectService := NewProjectService(repo)

	project := &model.Project{
		ID:          1,
		Name:        "Updated Project",
		UserID:      1,
		Description: "Updated Description",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	repo.On("UpdateProject", mock.Anything, project).Return(nil)

	err := projectService.UpdateProject(context.Background(), project)

	assert.NoError(t, err)

	repo.AssertExpectations(t)
}

func TestProjectService_DeleteProject(t *testing.T) {
	repo := new(MockProjectRepository)
	
  projectService := NewProjectService(repo)

	projectID := 1

	repo.On("DeleteProject", mock.Anything, projectID).Return(nil)

	err := projectService.DeleteProject(context.Background(), projectID)

	assert.NoError(t, err)

	repo.AssertExpectations(t)
}
