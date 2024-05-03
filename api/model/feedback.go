package model

import "time"

// FeedbackCategory represents the category of feedback.
type FeedbackCategory string

const (
	Bug         FeedbackCategory = "bug"
	Question    FeedbackCategory = "question"
	Idea        FeedbackCategory = "idea"
	Enhancement FeedbackCategory = "enhancement"
	Other       FeedbackCategory = "other"
)

// FeedbackStatus represents the status of a feedback.
type FeedbackStatus string

const (
	Open               FeedbackStatus = "open"
	UnderConsideration FeedbackStatus = "under consideration"
	Planned            FeedbackStatus = "planned"
	InProgress         FeedbackStatus = "in progress"
	Shipped            FeedbackStatus = "shipped"
	Rejected           FeedbackStatus = "rejected"
)

// Feedback represents a feedback in the system.
type Feedback struct {
	ID             int              `json:"id"`
	UserID         int              `json:"user_id"`
	ExternalUserID int              `json:"external_user_id"`
	ProjectID      int              `json:"project_id"`
	Title          string           `json:"title"`
	Description    string           `json:"description"`
	Votes          int              `json:"votes"`
	Category       FeedbackCategory `json:"category"`
	Status         FeedbackStatus   `json:"status"`
	CreatedAt      time.Time        `json:"created_at"`
	UpdatedAt      time.Time        `json:"updated_at"`
}
