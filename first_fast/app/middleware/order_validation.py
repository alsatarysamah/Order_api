from fastapi import Request, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from app.config.db import get_db
from app.models.item import ItemModel
import json
import logging

logging.basicConfig(level=logging.INFO)

async def validate_order_middleware(request: Request, call_next):
    if request.url.path.rstrip("/") == "/orders" and request.method == "POST":
        body = await request.body()
        try:
            data = json.loads(body)
        except Exception:
            return JSONResponse(status_code=400, content={"detail": "Invalid JSON"})
        
        order_items = data if isinstance(data, list) else data.get("items")
        if not order_items or not isinstance(order_items, list):
            return JSONResponse(status_code=400, content={"detail": "Order must contain at least one item"})

        db: Session = next(get_db())
        for item in order_items:
            item_id = item.get("item_id")
            if not item_id or not db.query(ItemModel).filter(ItemModel.id == item_id).first():
                return JSONResponse(status_code=400, content={"detail": f"Item with id {item_id} does not exist"})

    response = await call_next(request)
    return response
