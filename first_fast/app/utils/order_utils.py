from typing import List
from app.schemas.order_item_schema import OrderItemCreate

def calculate_order_totals(order_items: List[OrderItemCreate]) -> dict:

    total_amount = sum(item.quantity * item.price for item in order_items)
    tax = round(total_amount * 0.16,2) if total_amount>0 else 0 # 16% tax
    return {"total_amount": total_amount, "tax": tax}
