from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.config.db import Base, engine
from app.routers import order_router
from app.middleware.order_validation import validate_order_middleware
from app.models.order_item import OrderItemModel

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sales API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


@app.middleware("http")
async def apply_order_validation(request: Request, call_next):
    return await validate_order_middleware(request, call_next)

app.include_router(order_router.router)
