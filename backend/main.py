from fastapi.security import OAuth2PasswordBearer
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token
)
from database import engine, SessionLocal
from models import Base, User, Trip
from schemas import (
    UserCreate,
    UserLogin,
    TripCreate,
    UserResponse
)
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)
Base.metadata.create_all(bind=engine)

def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    email = verify_token(token)

    if not email:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    return user

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
def create_trip(
    trip: TripCreate,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    new_trip = Trip(
        destination=trip.destination,
        start_date=trip.start_date,
        end_date=trip.end_date,
        budget=trip.budget,
        user_id=current_user.id
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

@app.get("/my-trips")
def get_my_trips(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    trips = db.query(Trip).filter(
        Trip.user_id == current_user.id
    ).all()

    return trips

@app.delete("/trip/{trip_id}")
def delete_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    trip = db.query(Trip).filter(
        Trip.id == trip_id,
        Trip.user_id == current_user.id
    ).first()

    if not trip:
        return {
            "message": "Trip not found"
        }

    db.delete(trip)

    db.commit()

    return {
        "message": "Trip deleted successfully"
    }

@app.get("/recommendations")
def get_recommendations(
    current_user: User = Depends(get_current_user)
):

    scores = {
        "food": current_user.food_score,
        "adventure": current_user.adventure_score,
        "culture": current_user.culture_score,
        "shopping": current_user.shopping_score
    }

    personality = max(
        scores,
        key=scores.get
    )

    recommendations = {
        "food": [
            "Tokyo",
            "Bangkok",
            "Seoul"
        ],
        "adventure": [
            "Ladakh",
            "Iceland",
            "New Zealand"
        ],
        "culture": [
            "Rome",
            "Kyoto",
            "Istanbul"
        ],
        "shopping": [
            "Dubai",
            "Singapore",
            "Seoul"
        ]
    }

    return {
        "personality": personality,
        "recommendations":
        recommendations[personality]
    }

@app.get("/profile")
def get_profile(
    current_user: User = Depends(get_current_user)
):
    return {
        "name": current_user.name,
        "budget": current_user.budget,
        "travel_style": current_user.travel_style,
        "food_score": current_user.food_score,
        "adventure_score": current_user.adventure_score,
        "culture_score": current_user.culture_score,
        "shopping_score": current_user.shopping_score
    }

@app.get("/trip-cost/{destination}")
def get_trip_cost(destination: str):

    cost_map = {
        "Tokyo": 120000,
        "Bangkok": 60000,
        "Dubai": 90000,
        "Singapore": 85000,
        "Iceland": 180000,
        "Ladakh": 50000,
        "Ooty": 8000,
"Munnar": 10000,
"Kodaikanal": 9000,
    }

    return {
        "destination": destination,
        "estimated_cost": cost_map.get(
            destination,
            75000
        )
    }