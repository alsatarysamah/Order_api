from pydantic import BaseModel


class OrderBase(BaseModel):
    total_amount: float
    tax: float

class OrderCreate(OrderBase):
    pass


class OrderResponse(BaseModel):
    id: int
    total_amount: float
    tax: float

    model_config = {"from_attributes": True}
