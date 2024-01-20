package passwordless

import "context"

// Transport is an interface for transporting tokens.
type Transport interface {
  SendToken(ctx context.Context, email, token string, tokenType TokenType) error
}
