# 🛍️ FastAPI Order Management App

This project is a simple **FastAPI** application that manages **orders**, **items**, and **order items** using **SQLAlchemy ORM** and **PostgreSQL**.  
It supports creating orders with multiple items, calculating total amount and tax automatically, and viewing all orders or a specific one.

---

## 🚀 Features
- Create an order with multiple items  
- Automatically calculate total amount and tax (16%)  
- Retrieve all orders or a single order by ID  
- PostgreSQL database with SQLAlchemy ORM  
- Pydantic schemas for validation  
- Organized folder structure (config, models, schemas, CRUD, routers, utils)

---

## 🧩 Tech Stack
- **FastAPI** — web framework  
- **SQLAlchemy** — ORM  
- **PostgreSQL** — database  
- **Uvicorn** — ASGI server  
- **Pydantic v2** — data validation  
- **Python 3.11+**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/samahsatary/fastapi-orders.git
cd first_fast
```

### 2️⃣ Create a virtual environment
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On macOS/Linux
```

### 3️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Set up environment variables
Create a `.env` file in the project root:
```
DB_USER=postgres
DB_PASSWORD=1234
DB_HOST=localhost
DB_PORT=5433
DB_NAME=sales
```

### 5️⃣ Run the app
```bash
uvicorn app.main:app --reload
```

### 6️⃣ Access Swagger UI
Open your browser and go to  
👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🗂 Folder Structure

```
app/
├── main.py                  # FastAPI entry point
├── config/
│   └── db.py                # Database setup (engine, session, Base)
├── models/
│   ├── order.py             # Order model
│   ├── item.py              # Item model
│   └── order_item.py        # Bridge table (Order ↔ Item)
├── schemas/
│   ├── order_schema.py      # Pydantic schemas for orders
│   └── order_item_schema.py # Pydantic schemas for order items
├── crud/
│   ├── order_crud.py        # CRUD for orders
│   └── order_item_crud.py   # CRUD for order items
├── routers/
│   ├── order_router.py      # FastAPI endpoints for orders
│   └── item_router.py       # FastAPI endpoints for items
└── utils/
    └── order_utils.py       # Helper functions (e.g., tax calculation)
```

---

## 🧠 Example API Usage

### ➕ Create an Order
**Endpoint:** `POST /orders/`  
**Request Body:**
```json
[
  {
    "item_id": 1,
    "quantity": 2,
    "price": 10.0
  },
  {
    "item_id": 2,
    "quantity": 1,
    "price": 15.0
  }
]
```
**Response:**
```json
{
  "id": 1,
  "total_amount": 30.0,
  "tax": 4.8
}
```

---

### 🔍 Get All Orders
**Endpoint:** `GET /orders/`  
**Response:**
```json
[
  {
    "id": 1,
    "total_amount": 30.0,
    "tax": 4.8
  },
  {
    "id": 2,
    "total_amount": 45.0,
    "tax": 7.2
  }
]
```

---

### 🔎 Get Order by ID
**Endpoint:** `GET /orders/{order_id}`  
**Example:**  
`GET /orders/1`

**Response:**
```json
{
  "id": 1,
  "total_amount": 30.0,
  "tax": 4.8
}
```

---

## 🧮 Utility Function Example
File: `app/utils/order_utils.py`
```python
def calculate_order_totals(order_items):
    total_amount = sum(item["quantity"] * item["price"] for item in order_items)
    tax = total_amount * 0.16
    return {"total_amount": total_amount, "tax": tax}
```



## 🧑‍💻 Author
**Samah Alsatary**  
📧 [alsatary.samah@gmail.com]  
💻 Built with ❤️ using FastAPI
