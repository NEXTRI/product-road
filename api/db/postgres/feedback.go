package postgres

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/nextri/product-road/model"
)

// FeedbackRepositoryImp is a PostgreSQL implementation of the FeedbackRepository interface.
type FeedbackRepositoryImp struct{}

// NewFeedbackRepository creates a new FeedbackRepository instance.
func NewFeedbackRepository() *FeedbackRepositoryImp {
	return &FeedbackRepositoryImp{}
}

// CreateFeedback inserts a new feedback into the database.
func (f *FeedbackRepositoryImp) CreateFeedback(ctx context.Context, feedback *model.Feedback) (int, error) {

	var feedbackID int
	
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	err := db.QueryRowContext(ctx, "INSERT INTO feedbacks (user_id, project_id, title, description, category, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id", feedback.UserID, feedback.ProjectID, feedback.Title, feedback.Description, feedback.Category, feedback.Status ,feedback.CreatedAt, feedback.UpdatedAt).Scan(&feedbackID)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return 0, fmt.Errorf("timeout exceeded while creating feedback")
		}
		return 0, err
	}

	return feedbackID, nil
}

// GetFeedbackByID retrieves a feedback from the database by its ID.
func (f *FeedbackRepositoryImp) GetFeedbackByID(ctx context.Context, feedbackID, userID int) (*model.Feedback, error) {

	var feedback model.Feedback
	
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	err := db.QueryRowContext(ctx, "SELECT * FROM feedbacks WHERE id = $1 AND user_id = $2", feedbackID, userID).Scan(&feedback.ID, &feedback.UserID, &feedback.ProjectID, &feedback.ExternalUserID, &feedback.Title, &feedback.Description, &feedback.Votes, &feedback.Category, &feedback.Status, &feedback.CreatedAt, &feedback.UpdatedAt)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return nil, fmt.Errorf("timeout exceeded while getting feedback")
		}
		return nil, err
	}

	return &feedback, nil
}

// GetAllFeedbacks retrieves all feedbacks for a specific user from the database.
func (f *FeedbackRepositoryImp) GetAllFeedbacks(ctx context.Context, projectID int) ([]*model.Feedback, error) {

	var feedbacks []*model.Feedback
	
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	rows, err := db.QueryContext(ctx, "SELECT * FROM feedbacks WHERE project_id = $1", projectID)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return nil, fmt.Errorf("timeout exceeded while trying to get all feedbacks")
		}
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var feedback model.Feedback
		err := rows.Scan(&feedback.ID, &feedback.UserID, &feedback.ProjectID, &feedback.ExternalUserID, &feedback.Title, &feedback.Description, &feedback.Votes, &feedback.Category, &feedback.Status, &feedback.CreatedAt, &feedback.UpdatedAt)
		if err != nil {
			return nil, fmt.Errorf("error scanning feedback row: %v", err)
		}
		feedbacks = append(feedbacks, &feedback)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over feedbacks rows: %v", err)
	}

	return feedbacks, nil
}

// UpdateFeedback updates an existing feedback in the database.
func (f *FeedbackRepositoryImp) UpdateFeedback(ctx context.Context, feedback *model.Feedback) error {

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	result, err := db.ExecContext(ctx,
		"UPDATE feedbacks SET title = $1, description = $2, votes = $3, category = $4, status = $5, updated_at = $6 WHERE id = $7",
		feedback.Title, feedback.Description, feedback.Votes, feedback.Category, feedback.Status, feedback.UpdatedAt, feedback.ID,
	)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return fmt.Errorf("timeout exceeded while updating feedback")
		}
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected after updating feedback: %v", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no feedback found with ID %d", feedback.ID)
	}

	return nil
}

// DeleteFeedback deletes a feedback from the database by its ID.
func (f *FeedbackRepositoryImp) DeleteFeedback(ctx context.Context, feedbackID int) error {

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	result, err := db.ExecContext(ctx, "DELETE FROM feedbacks WHERE id = $1", feedbackID)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return fmt.Errorf("timeout exceeded while deleting feedback")
		}
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected after deleting feedback: %v", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no feedback found with ID %d", feedbackID)
	}

	return nil
}
