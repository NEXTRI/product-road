package model

import "time"

// Project represents a project in the system.
type Project struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	UserID      int       `json:"user_id"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
