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