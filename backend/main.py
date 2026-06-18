
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token
)
from database import engine, SessionLocal
from models import Base, User, Trip
from schemas import UserCreate, UserLogin, TripCreate 

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Smart Travel Companion API"}


@app.post("/user")
def create_user(user: UserCreate):

    db = SessionLocal()

    new_user = User(
    name=user.name,
    email=user.email,
    password=hash_password(user.password),

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

@app.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        return {
            "message": "User not found"
        }

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {
            "message": "Invalid password"
        }

    token = create_access_token(
    {"email": db_user.email}
)

    return {
    "access_token": token,
    "token_type": "bearer"
}

@app.post("/trip")
def create_trip(trip: TripCreate):

    db = SessionLocal()

    new_trip = Trip(
        destination=trip.destination,
        start_date=trip.start_date,
        end_date=trip.end_date,
        budget=trip.budget,
        user_id=trip.user_id
    )

    db.add(new_trip)

    db.commit()

    db.refresh(new_trip)

    return {
        "message": "Trip created successfully",
        "trip_id": new_trip.id
    }

@app.get("/trips")
def get_trips():

    db = SessionLocal()

    trips = db.query(Trip).all()

    return trips

@app.get("/me")
def get_me(token: str = Depends(oauth2_scheme)):

    email = verify_token(token)

    if not email:
        return {
            "message": "Invalid token"
        }

    return {
        "email": email
    }