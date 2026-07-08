from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str

    email: str

    password: str

    budget: str

    food_score: int
    adventure_score: int
    culture_score: int
    shopping_score: int

    travel_style: str

class UserLogin(BaseModel):
    email: str
    password: str

class TripCreate(BaseModel):
    destination: str
    start_date: str
    end_date: str
    budget: str
    travel_style: str
    travellers: int = 1
    
class UserResponse(BaseModel):
    email: str

# ── Forgot / Reset Password ─────────────────────────────────────────────────

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str