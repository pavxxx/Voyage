from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token
)
import os
from dotenv import load_dotenv
from database import engine, SessionLocal
from models import Base, User, Trip
from schemas import (
    UserCreate,
    UserLogin,
    TripCreate,
    UserResponse
)
from destinations import DESTINATIONS
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000"
).split(",")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    email = verify_token(token)

    if not email:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.email == email
    ).first()

    return user

@app.get("/")
def home():
    return {"message": "Smart Travel Companion API"}


@app.post("/user")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    print("Password received:", user.password)
    print("Password length:", len(user.password))
    print("Password bytes:", len(user.password.encode("utf-8")))

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
@app.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_trip = Trip(
        destination=trip.destination,
        start_date=trip.start_date,
        end_date=trip.end_date,
        budget=trip.budget,
        travel_style=trip.travel_style,
        travellers=trip.travellers,
        user_id=current_user.id
    )

    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)

    return {
        "message": "Trip created successfully",
        "trip_id": new_trip.id
    }


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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    trips = db.query(Trip).filter(
        Trip.user_id == current_user.id
    ).all()

    return trips

@app.delete("/trip/{trip_id}")
def delete_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

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
    # Safe fallback values for scores
    user_food = current_user.food_score or 0
    user_adventure = current_user.adventure_score or 0
    user_culture = current_user.culture_score or 0
    user_shopping = current_user.shopping_score or 0

    # Calculate score for every destination
    ranked_destinations = []
    for dest in DESTINATIONS:
        score = (
            user_food * dest["food"] +
            user_adventure * dest["adventure"] +
            user_culture * dest["culture"] +
            user_shopping * dest["shopping"]
        )
        ranked_destinations.append((dest["name"], score))

    # Sort destinations by score in descending order
    ranked_destinations.sort(key=lambda x: x[1], reverse=True)

    # Get top 3 destinations
    top_3 = [dest[0] for dest in ranked_destinations[:3]]

    # Heuristic for travel personality label based on user scores
    user_scores = {
        "food": user_food,
        "adventure": user_adventure,
        "culture": user_culture,
        "shopping": user_shopping
    }

    sorted_user_scores = sorted(user_scores.values(), reverse=True)
    max_val = max(user_scores.values())
    min_val = min(user_scores.values())

    # If top two scores are equal, or max-min range is narrow (<= 1), classify as Balanced Traveler
    if sorted_user_scores[0] == sorted_user_scores[1] or (max_val - min_val) <= 1:
        personality = "Balanced Traveler"
    else:
        dominant = max(user_scores, key=user_scores.get)
        if dominant == "food":
            personality = "Food Explorer"
        elif dominant == "adventure":
            personality = "Adventure Seeker"
        elif dominant == "culture":
            personality = "Culture Enthusiast"
        elif dominant == "shopping":
            personality = "Luxury Shopper"
        else:
            personality = "Balanced Traveler"

    return {
        "personality": personality,
        "recommendations": top_3
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
def get_trip_cost(
    destination:str,
    days:int=3,
    budget:str="Medium",
    travellers:int=1
):
    # Find destination
    dest = next(
        (
            d for d in DESTINATIONS
            if d["name"].lower() == destination.lower()
        ),
        None
    )

    if not dest:
        return {
            "message": "Destination not found."
        }

    # Select hotel cost based on travel style
    if budget.lower() == "budget":
        hotel_cost = dest["hotel_budget"]

    elif budget.lower() == "luxury":
        hotel_cost = dest["hotel_luxury"]

    else:
        hotel_cost = dest["hotel_medium"]

    transport = dest["transport"]
    food = dest["food_per_day"] * days * travellers
    hotel = hotel_cost * days * travellers
    activities = dest["activities_per_day"] * days * travellers

    total = (
        transport +
        hotel +
        food +
        activities
    )

    return {

        "destination": dest["name"],

        "days": days,

        "budget": budget,

        "breakdown": {

            "transport": transport,

            "hotel": hotel,

            "food": food,

            "activities": activities

        },

        "estimated_cost": total,

        "estimated_range": {
            "min": int(total * 0.9),
            "max": int(total * 1.1)
        }

    }

@app.get("/destinations")
def get_destinations():
    return DESTINATIONS