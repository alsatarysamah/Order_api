from pydantic import BaseModel
from typing import Optional

class ItemBase(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = False


class ItemCreate(ItemBase):
    pass


class ItemResponse(ItemBase):
    id: int
