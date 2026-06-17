from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    budget = Column(String)

    food_score = Column(Integer)

    adventure_score = Column(Integer)

    culture_score = Column(Integer)

    shopping_score = Column(Integer)

    travel_style = Column(String)