package model

import "time"

// User represents a user in the system.
type User struct {
	ID            int       `json:"id"`
	Username      string    `json:"username"`
	Email         string    `json:"email"`
	FullName      string    `json:"full_name"`
	ProfilePicture string    `json:"profile_picture"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

// NewUser creates a new user with the given params.
func NewUser(username, email, fullName, profilePicture string) *User {
	return &User{
		Username:  username,
		Email:     email,
    FullName:     fullName,
    ProfilePicture:     profilePicture,
		CreatedAt: time.Now(),
    UpdatedAt: time.Now(),
	}
}
