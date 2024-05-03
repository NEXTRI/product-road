package service

import (
	"context"

	"github.com/nextri/product-road/db"
	"github.com/nextri/product-road/model"
)

// FeedbackService handles business logic for feedbacks.
type FeedbackService struct {
	repo db.FeedbackRepository
}

// NewFeedbackService creates a new instance of FeedbackService.
func NewFeedbackService(repo db.FeedbackRepository) *FeedbackService {
	return &FeedbackService{repo}
}

// CreateFeedback creates a new feedback.
func (s *FeedbackService) CreateFeedback(ctx context.Context, project *model.Feedback) (int, error) {
	return s.repo.CreateFeedback(ctx, project)
}

// GetFeedbackByID retrieves a feedback by its ID.
func (s *FeedbackService) GetFeedbackByID(ctx context.Context, feedbackID, userID int) (*model.Feedback, error) {
	return s.repo.GetFeedbackByID(ctx, feedbackID, userID)
}

// GetAllFeedbacks retrieves all feedbacks for a specific project.
func (s *FeedbackService) GetAllFeedbacks(ctx context.Context, projectID int) ([]*model.Feedback, error) {
	return s.repo.GetAllFeedbacks(ctx, projectID)
}

// UpdateFeedback updates an existing feedback.
func (s *FeedbackService) UpdateFeedback(ctx context.Context, feedback *model.Feedback) error {
	return s.repo.UpdateFeedback(ctx, feedback)
}

// DeleteFeedback deletes a feedback.
func (s *FeedbackService) DeleteFeedback(ctx context.Context, feedbackID int) error {
	return s.repo.DeleteFeedback(ctx, feedbackID)
}
