from fastapi import FastAPI, Request
from app.config.db import Base, engine
from app.routers import item_router, order_router
from app.middleware.order_validation import validate_order_middleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sales API")

@app.middleware("http")
async def apply_order_validation(request: Request, call_next):
    return await validate_order_middleware(request, call_next)

app.include_router(item_router.router)
app.include_router(order_router.router)
