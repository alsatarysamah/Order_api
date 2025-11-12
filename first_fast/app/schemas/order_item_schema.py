from pydantic import BaseModel

class OrderItemBase(BaseModel):
  
    product_id: int
    quantity: int
    price: float
  
class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    id: int
