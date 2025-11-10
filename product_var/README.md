# Product & Variant API

This is a **NestJS API** for managing Products and their Variants. It includes:

- JWT authentication
- Role-based access control (Admin/User)
- TypeORM integration with PostgreSQL
- Swagger API documentation

---

## Features

- Public endpoints:  
  - `GET /products` – list all products  
  - `GET /products/:id` – get product by ID  
  - `GET /variants` – list all variants  
  - `GET /variants/:id` – get variant by ID

- Protected endpoints (Admin only, JWT required):  
  - `POST /products` – create product  
  - `PUT /products/:id` – update product  
  - `DELETE /products/:id` – delete product  
  - `POST /variants` – create variant  
  - `PUT /variants/:id` – update variant  
  - `DELETE /variants/:id` – delete variant

---

## Tech Stack

- [NestJS](https://nestjs.com/)  
- [TypeORM](https://typeorm.io/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Swagger](https://swagger.io/)  
- [class-validator](https://github.com/typestack/class-validator)

---

## Prerequisites

- Node.js >= 18
- npm or yarn
- PostgreSQL database

---

## Setup

1. **Clone the repository**

```bash
git clone git@github.com:alsatarysamah/Order_api.git
cd product_var
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Create `.env` file** in the root directory:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_NAME=sales


PORT=4000

JWT_SECRET=mySecretKey
JWT_EXPIRES_IN=1d

FE_URL=http://localhost:3000
```

4. **Create database** in PostgreSQL:

```sql
CREATE DATABASE product_db;
```

5. **Configure TypeORM** in `app.module.ts` or `typeorm.config.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

})
```

---

## Running the application

```bash
# Development mode
npm run start:dev
# or
yarn start:dev
```

The API will be available at:  

```
http://localhost:3000
```

---

## Swagger Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

- Click **Authorize** and enter your JWT token to access protected endpoints.  
- JWT should **not** include the word `Bearer` — Swagger will handle it.

---

## Authentication

- Generate JWT token via login endpoint (e.g., `/auth/token`)  
- Include the token in protected requests:  

```
Authorization: Bearer <your_token_here>
```

- Admin endpoints require the JWT payload to include:

```json
{
  "role": "admin"
}
```

---

## Folder Structure (example)

```
src/
├─ auth/
│  ├─ auth.controller.ts
│  ├─ auth.service.ts
│  ├─ jwt.strategy.ts
│  ├─ jwt-auth.guard.ts
│  ├─ admin.guard.ts
├─ products/
│  ├─ product.entity.ts
│  ├─ product.service.ts
│  ├─ product.controller.ts
│  └─ dto/
├─ variants/
│  ├─ variant.entity.ts
│  ├─ variant.service.ts
│  ├─ variant.controller.ts
│  └─ dto/
├─ main.ts
```

