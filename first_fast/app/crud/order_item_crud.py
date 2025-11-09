from sqlalchemy.orm import Session
from app.models.order_item import OrderItemModel
from app.schemas.order_item_schema import OrderItemCreate

def create_order_item(db: Session, order_item: OrderItemCreate, order_id: int):
    db_order_item = OrderItemModel(**order_item.dict(),order_id=order_id)
    db.add(db_order_item)
    db.commit()
    db.refresh(db_order_item)
    return db_order_item

def get_order_item(db: Session, order_item_id: int):
    return db.query(OrderItemModel).filter(OrderItemModel.id == order_item_id).first()
