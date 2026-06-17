from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    budget: str

    food_score: int
    adventure_score: int
    culture_score: int
    shopping_score: int

    travel_style: str