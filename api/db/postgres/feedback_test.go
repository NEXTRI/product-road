package postgres

import (
	"context"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/nextri/product-road/model"
	"github.com/stretchr/testify/assert"
)

var feedback = &model.Feedback{
	ID:             1,
	UserID:         1,
	ProjectID:      1,
	Title:          "Test Title",
	Description:    "Test Description",
	Votes:          7,
	Category:       model.Idea,
	Status:         model.Open,
	CreatedAt:      time.Now(),
	UpdatedAt:      time.Now(),
}

func TestFeedbackRepository_CreateFeedback(t *testing.T) {
	rows := sqlmock.NewRows([]string{"id"}).AddRow(1)

	mock.ExpectQuery("INSERT INTO feedbacks \\(user_id, project_id, title, description, category, status, created_at, updated_at\\) VALUES \\(\\$1, \\$2, \\$3, \\$4, \\$5, \\$6, \\$7, \\$8\\) RETURNING id").
		WithArgs(feedback.UserID, feedback.ProjectID, feedback.Title, feedback.Description, feedback.Category, feedback.Status, feedback.CreatedAt, feedback.UpdatedAt).
		WillReturnRows(rows)

	repo := NewFeedbackRepository()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	feedbackID, err := repo.CreateFeedback(ctx, feedback)
	assert.NoError(t, err)
	assert.Equal(t, feedback.ID, feedbackID)
}

func TestFeedbackRepository_GetFeedbackByID(t *testing.T) {
	rows := sqlmock.NewRows([]string{"id", "user_id", "project_id", "external_user_id", "title", "description", "votes", "category", "status", "created_at", "updated_at"}).
		AddRow(feedback.ID, feedback.UserID, feedback.ProjectID, 0, feedback.Title, feedback.Description, feedback.Votes, feedback.Category, feedback.Status, feedback.CreatedAt, feedback.UpdatedAt)

	mock.ExpectQuery("SELECT \\* FROM feedbacks WHERE id = \\$1 AND user_id = \\$2").
		WithArgs(feedback.ID, feedback.UserID).
		WillReturnRows(rows)

	repo := NewFeedbackRepository()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	retrievedFeedback, err := repo.GetFeedbackByID(ctx, feedback.ID, feedback.UserID)
	assert.NoError(t, err)
	assert.NotNil(t, retrievedFeedback)
	assert.Equal(t, feedback.ID, retrievedFeedback.ID)
	assert.Equal(t, feedback.UserID, retrievedFeedback.UserID)
	assert.Equal(t, feedback.ProjectID, retrievedFeedback.ProjectID)
	assert.Zero(t, feedback.ExternalUserID)
	assert.Equal(t, feedback.Title, retrievedFeedback.Title)
	assert.Equal(t, feedback.Description, retrievedFeedback.Description)
	assert.Equal(t, feedback.Votes, retrievedFeedback.Votes)
	assert.Equal(t, feedback.Category, retrievedFeedback.Category)
	assert.Equal(t, feedback.Status, retrievedFeedback.Status)
	assert.Equal(t, feedback.CreatedAt, retrievedFeedback.CreatedAt)
	assert.Equal(t, feedback.UpdatedAt, retrievedFeedback.UpdatedAt)
}

func TestFeedbackRepository_GetAllFeedbacks(t *testing.T) {
	rows := sqlmock.NewRows([]string{"id", "user_id", "project_id", "external_user_id", "title", "description", "votes", "category", "status", "created_at", "updated_at"}).
		AddRow(feedback.ID, feedback.UserID, feedback.ProjectID, 0, feedback.Title, feedback.Description, feedback.Votes, feedback.Category, feedback.Status, feedback.CreatedAt, feedback.UpdatedAt)

	mock.ExpectQuery("SELECT \\* FROM feedbacks WHERE project_id = \\$1").
		WithArgs(feedback.ProjectID).
		WillReturnRows(rows)

	repo := NewFeedbackRepository()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	retrievedFeedbacks, err := repo.GetAllFeedbacks(ctx, feedback.ProjectID)
	assert.NoError(t, err)
	assert.NotNil(t, retrievedFeedbacks)
	assert.Equal(t, feedback.ID, retrievedFeedbacks[0].ID)
	assert.Equal(t, feedback.UserID, retrievedFeedbacks[0].UserID)
	assert.Equal(t, feedback.ProjectID, retrievedFeedbacks[0].ProjectID)
	assert.Zero(t, feedback.ExternalUserID)
	assert.Equal(t, feedback.Title, retrievedFeedbacks[0].Title)
	assert.Equal(t, feedback.Description, retrievedFeedbacks[0].Description)
	assert.Equal(t, feedback.Votes, retrievedFeedbacks[0].Votes)
	assert.Equal(t, feedback.Category, retrievedFeedbacks[0].Category)
	assert.Equal(t, feedback.Status, retrievedFeedbacks[0].Status)
	assert.Equal(t, feedback.CreatedAt, retrievedFeedbacks[0].CreatedAt)
	assert.Equal(t, feedback.UpdatedAt, retrievedFeedbacks[0].UpdatedAt)
}

func TestFeedbackRepository_UpdateFeedback(t *testing.T) {

	mock.ExpectExec("UPDATE feedbacks SET title = \\$1, description = \\$2, votes = \\$3, category = \\$4, status = \\$5, updated_at = \\$6 WHERE id = \\$7").
		WithArgs(feedback.Title, feedback.Description, feedback.Votes, feedback.Category, feedback.Status, feedback.UpdatedAt, feedback.ID).
		WillReturnResult(sqlmock.NewResult(1, 1))

	repo := NewFeedbackRepository()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := repo.UpdateFeedback(ctx, feedback)
	assert.NoError(t, err)
}

func TestFeedbackRepository_DeleteFeedback(t *testing.T) {

	mock.ExpectExec("DELETE FROM feedbacks WHERE id = \\$1").
		WithArgs(feedback.ID).
		WillReturnResult(sqlmock.NewResult(1, 1))

	repo := NewFeedbackRepository()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := repo.DeleteFeedback(ctx, feedback.ID)
	assert.NoError(t, err)
}
