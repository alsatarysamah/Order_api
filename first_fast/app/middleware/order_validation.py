from fastapi import Request
from fastapi.responses import JSONResponse
from app.config.db import get_db
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

    response = await call_next(request)
    return response
