from sqlalchemy import Column, Integer, String, Float, Boolean
from app.config.db import Base

class ItemModel(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    is_offer = Column(Boolean, default=False)
