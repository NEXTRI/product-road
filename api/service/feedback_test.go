package service

import (
	"context"
	"testing"
	"time"

	"github.com/nextri/product-road/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockFeedbackRepository struct {
	mock.Mock
}

func (m *MockFeedbackRepository) CreateFeedback(ctx context.Context, feedback *model.Feedback) (int, error) {
	args := m.Called(ctx, feedback)
	return args.Int(0), args.Error(1)
}

func (m *MockFeedbackRepository) GetFeedbackByID(ctx context.Context, feedbackID, userID int) (*model.Feedback, error) {
	args := m.Called(ctx, feedbackID, userID)
	return args.Get(0).(*model.Feedback), args.Error(1)
}

func (m *MockFeedbackRepository) GetAllFeedbacks(ctx context.Context, projectID int) ([]*model.Feedback, error) {
	args := m.Called(ctx, projectID)
	return args.Get(0).([]*model.Feedback), args.Error(1)
}

func (m *MockFeedbackRepository) UpdateFeedback(ctx context.Context, feedback *model.Feedback) error {
	args := m.Called(ctx, feedback)
	return args.Error(0)
}

func (m *MockFeedbackRepository) DeleteFeedback(ctx context.Context, feedbackID int) error {
	args := m.Called(ctx, feedbackID)
	return args.Error(0)
}

func TestFeedbackService_CreateFeedback(t *testing.T) {
	repo := new(MockFeedbackRepository)
	
	feedbackService := NewFeedbackService(repo)

	feedback := &model.Feedback{
		UserID:      1,
		ProjectID:   1,
		Title:       "Test Title",
		Description: "Test Description",
		Category:    model.Idea,
		Status:      model.Open,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	repo.On("CreateFeedback", mock.Anything, feedback).Return(1, nil)

	feedbackID, err := feedbackService.CreateFeedback(context.Background(), feedback)

	assert.NoError(t, err)
	assert.Equal(t, 1, feedbackID)

	repo.AssertExpectations(t)
}

func TestFeedbackService_GetFeedbackByID(t *testing.T) {
	repo := new(MockFeedbackRepository)
	
	feedbackService := NewFeedbackService(repo)

	feedbackID := 1
	userID := 1
	expectedFeedback := &model.Feedback{
		ID:          feedbackID,
		UserID:      1,
		ProjectID:   1,
		Title:       "Test Title",
		Description: "Test Description",
		Category:    model.Idea,
		Status:      model.Open,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	repo.On("GetFeedbackByID", mock.Anything, feedbackID, userID).Return(expectedFeedback, nil)

	resultFeedback, err := feedbackService.GetFeedbackByID(context.Background(), feedbackID, userID)

	assert.NoError(t, err)
	assert.Equal(t, expectedFeedback, resultFeedback)

	repo.AssertExpectations(t)
}

func TestFeedbackService_GetAllFeedbacks(t *testing.T) {
	repo := new(MockFeedbackRepository)
	
	feedbackService := NewFeedbackService(repo)

	projectID := 1
	expectedFeedbacks := []*model.Feedback{
		{
			ID:          1,
			UserID:      1,
			ProjectID:   1,
			Title:       "Test Title",
			Description: "Test Description",
			Category:    model.Idea,
			Status:      model.Open,
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			ID:          2,
			UserID:      1,
			ProjectID:   1,
			Title:       "Test Title",
			Description: "Test Description",
			Category:    model.Idea,
			Status:      model.Open,
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
	}

	repo.On("GetAllFeedbacks", mock.Anything, projectID).Return(expectedFeedbacks, nil)

	resultFeedbacks, err := feedbackService.GetAllFeedbacks(context.Background(), projectID)

	assert.NoError(t, err)
	assert.Equal(t, expectedFeedbacks, resultFeedbacks)

	repo.AssertExpectations(t)
}

func TestFeedbackService_UpdateFeedback(t *testing.T) {
	repo := new(MockFeedbackRepository)
	
	feedbackService := NewFeedbackService(repo)

	feedback := &model.Feedback{
		ID:          1,
		UserID:      1,
		ProjectID:   1,
		Title:       "Updated Title",
		Description: "Updated Description",
		Category:    model.Idea,
		Status:      model.Open,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	repo.On("UpdateFeedback", mock.Anything, feedback).Return(nil)

	err := feedbackService.UpdateFeedback(context.Background(), feedback)

	assert.NoError(t, err)

	repo.AssertExpectations(t)
}

func TestFeedbackService_DeleteFeedback(t *testing.T) {
	repo := new(MockFeedbackRepository)
	
	feedbackService := NewFeedbackService(repo)

	feedbackID := 1

	repo.On("DeleteFeedback", mock.Anything, feedbackID).Return(nil)

	err := feedbackService.DeleteFeedback(context.Background(), feedbackID)

	assert.NoError(t, err)

	repo.AssertExpectations(t)
}
