from fastapi import FastAPI
from app.config.db import Base, engine
from app.routers import item_router,order_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sales API")

app.include_router(item_router.router)
app.include_router(order_router.router)


