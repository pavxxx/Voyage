"""
password_reset.py
-----------------
Secure token generation and validation for the Forgot Password flow.

- Uses secrets.token_urlsafe(32) for cryptographically secure tokens
- Stores SHA-256 hash of the token in the DB (never the raw token)
- Tokens expire after 30 minutes
- Tokens are single-use; marked `used=True` after consumption
"""

import secrets
import hashlib
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import PasswordResetToken

TOKEN_EXPIRY_MINUTES = 30


def _hash_token(token: str) -> str:
    """Return the SHA-256 hex digest of the raw token."""
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def create_reset_token(user_id: int, db: Session) -> str:
    """
    Generate a new reset token for `user_id`.
    Invalidates any previous unused tokens for this user.
    Returns the raw token string (to be sent in the email link).
    """
    # Invalidate previous tokens for this user
    db.query(PasswordResetToken).filter(
        PasswordResetToken.user_id == user_id,
        PasswordResetToken.used == False,  # noqa: E712
    ).update({"used": True})

    raw_token = secrets.token_urlsafe(32)
    token_hash = _hash_token(raw_token)
    expires_at = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRY_MINUTES)

    db_token = PasswordResetToken(
        user_id=user_id,
        token_hash=token_hash,
        expires_at=expires_at,
        used=False,
    )
    db.add(db_token)
    db.commit()

    return raw_token


def verify_reset_token(raw_token: str, db: Session):
    """
    Validate a raw token.
    Returns the PasswordResetToken ORM object if valid, else None.
    Does NOT mark it used — call `consume_reset_token` separately.
    """
    token_hash = _hash_token(raw_token)
    db_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token_hash == token_hash,
        PasswordResetToken.used == False,  # noqa: E712
    ).first()

    if not db_token:
        return None

    if datetime.utcnow() > db_token.expires_at:
        return None

    return db_token


def consume_reset_token(db_token: PasswordResetToken, db: Session) -> None:
    """Mark a verified token as used so it cannot be replayed."""
    db_token.used = True
    db.commit()
