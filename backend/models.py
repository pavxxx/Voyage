from sqlalchemy import Column, Integer, String
from database import Base

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

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)

    destination = Column(String)

    start_date = Column(String)

    end_date = Column(String)

    budget = Column(String)

    user_id = Column(Integer)