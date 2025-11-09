from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.order_schema import  OrderResponse
from app.schemas.order_item_schema import OrderItemCreate
from app.crud.order_crud import create_order, get_order,get_all_order
from app.config.db import get_db

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order_endpoint(order_items: List[OrderItemCreate], db: Session = Depends(get_db)):
    db_order = create_order(db,order_items)
    if not db_order:
        raise HTTPException(status_code=400, detail="Failed to create order")
    return db_order

@router.get("/{order_id}", response_model=OrderResponse)
def get_order_by_id_endpoint(order_id: int, db: Session = Depends(get_db)):
    db_order = get_order(db, order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order


@router.get("/", response_model=List[OrderResponse])
def get_all_orders_endpoint( db: Session = Depends(get_db)):

    db_orders=get_all_order(db)
    if not db_orders:
        raise HTTPException(status_code=404, detail="Orders not found")
    return db_orders
