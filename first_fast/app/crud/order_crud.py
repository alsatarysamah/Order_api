from sqlalchemy.orm import Session
from typing import List
from app.models.order import OrderModel
from app.schemas.order_schema import  OrderResponse

from app.schemas.order_item_schema import OrderItemCreate
from app.crud.order_item_crud import create_order_item
from app.schemas.order_item_schema import OrderItemCreate
from app.utils.order_utils import calculate_order_totals

def create_order(db: Session, order_items: List[OrderItemCreate]) -> OrderResponse:
    print(OrderItemCreate)
    
    totals = calculate_order_totals(order_items)

    db_order = OrderModel(total_amount=totals['total_amount'] - totals['tax'], tax=totals['tax'])
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in order_items:
        create_order_item(db, item,db_order.id)

    return OrderResponse.model_validate(db_order)


def get_order(db: Session, order_id: int) -> OrderResponse | None:

    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if db_order:
        return OrderResponse.model_validate(db_order)
    return None


def get_all_order(db: Session) -> List[OrderResponse] | None:

    db_orders = db.query(OrderModel).all()
    if db_orders:
        return [OrderResponse.model_validate(order) for order in db_orders]
    return None