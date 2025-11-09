from sqlalchemy.orm import Session
from app.models.item import ItemModel
from app.schemas.item_schema import ItemCreate,ItemResponse
from typing import List


def create_item(db: Session, item: ItemCreate):
    db_item = ItemModel(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return "db_item"

def get_item(db: Session, item_id: int):
    return db.query(ItemModel).filter(ItemModel.id == item_id).first()

def get_all_item(db: Session)-> List[ItemResponse] | None:
    return db.query(ItemModel).all() 