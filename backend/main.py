from fastapi import FastAPI

from database import engine, SessionLocal
from models import Base, User
from schemas import UserCreate

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Smart Travel Companion API"}


@app.post("/user")
def create_user(user: UserCreate):

    db = SessionLocal()

    new_user = User(
        name=user.name,
        budget=user.budget,
        food_score=user.food_score,
        adventure_score=user.adventure_score,
        culture_score=user.culture_score,
        shopping_score=user.shopping_score,
        travel_style=user.travel_style
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }

@app.get("/users")
def get_users():

    db = SessionLocal()

    users = db.query(User).all()

    return users