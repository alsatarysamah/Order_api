from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.config.db import get_db
from app.schemas.item_schema import ItemCreate, ItemResponse
from app.crud.item_crud import create_item, get_item,get_all_item

router = APIRouter(prefix="/items", tags=["Items"])

@router.post("/", response_model=ItemResponse)
def create_item_endpoint(item: ItemCreate, db: Session = Depends(get_db)):
    return create_item(db, item)

@router.get("/{item_id}", response_model=ItemResponse)
def get_item_endpoint(item_id: int, db: Session = Depends(get_db)):
    db_item = get_item(db, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.get("/", response_model=List[ItemResponse])
def get_item_by_id_endpoint( db: Session = Depends(get_db)):
    db_items = get_all_item(db)
    if not db_items:
        raise HTTPException(status_code=404, detail="Items not found")
    return db_items