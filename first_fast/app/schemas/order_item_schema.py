from pydantic import BaseModel

class OrderItemBase(BaseModel):
  
    item_id: int
    quantity: int
    price: float
  
class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    id: int
