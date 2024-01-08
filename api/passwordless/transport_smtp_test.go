package passwordless

import (
	"context"
	"testing"
)

func TestSMTPTransport_SendToken_MagicLink_NewUser(t *testing.T) {
	smtpTransport := NewSMTPTransport(config)

	email := "odjaidri@gmail.com"
	token := "qyGdH7Ouuhq8ONOUX2OUKWGB-One_K2Lh0k5F4WhaU8"

	err := smtpTransport.SendToken(context.Background(), email, token, TokenTypeString, true)
	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}
}

func TestSMTPTransport_SendToken_CodePIN_NewUser(t *testing.T) {
	smtpTransport := NewSMTPTransport(config)

	email := "odjaidri@gmail.com"
	token := "123456"

	err := smtpTransport.SendToken(context.Background(), email, token, TokenTypePin, true)
	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}
}

func TestSMTPTransport_SendToken_MagicLink_ExistingUser(t *testing.T) {
	smtpTransport := NewSMTPTransport(config)

	email := "odjaidri@gmail.com"
	token := "qyGdH7Ouuhq8ONOUX2OUKWGB-One_K2Lh0k5F4WhaU8"

	err := smtpTransport.SendToken(context.Background(), email, token, TokenTypeString, false)
	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}
}

func TestSMTPTransport_SendToken_CodePIN_ExistingUser(t *testing.T) {
	smtpTransport := NewSMTPTransport(config)

	email := "odjaidri@gmail.com"
	token := "123456"

	err := smtpTransport.SendToken(context.Background(), email, token, TokenTypePin, true)
	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}
}
