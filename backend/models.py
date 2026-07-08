from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True)

    password = Column(String)

    budget = Column(String)

    food_score = Column(Integer)

    adventure_score = Column(Integer)

    culture_score = Column(Integer)

    shopping_score = Column(Integer)

    travel_style = Column(String)

    trips = relationship("Trip", back_populates="user")

    reset_tokens = relationship("PasswordResetToken", back_populates="user")

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)

    destination = Column(String)

    start_date = Column(String)

    end_date = Column(String)

    budget = Column(String)

    travel_style = Column(String)

    travellers = Column(Integer, default=1)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    user = relationship(
        "User",
        back_populates="trips"
    )


class PasswordResetToken(Base):
    """Stores hashed, single-use, time-limited password reset tokens."""
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # SHA-256 hash of the raw token — raw token is never stored
    token_hash = Column(String, unique=True, nullable=False, index=True)

    expires_at = Column(DateTime, nullable=False)

    used = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="reset_tokens")