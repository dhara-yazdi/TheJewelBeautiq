# The Jewel Beautiq

# Luxe Jewels - Luxury Jewellery Catalog

A production-ready jewellery catalog website built with **Angular 19** and **ASP.NET Core 9**.

## Tech Stack

### Frontend
- Angular 19 (standalone components, signals, lazy loading)
- Tailwind CSS v4 (luxury black & gold theme)
- TypeScript

### Backend
- ASP.NET Core 9 Web API
- Entity Framework Core 9
- SQL Server 2022
- JWT Authentication (admin only)
- Swagger/OpenAPI

### Architecture
- Clean Architecture (Domain → Application → Infrastructure → API)
- Repository + Unit of Work pattern
- PBKDF2 password hashing

## Getting Started

### Prerequisites
- [.NET 9 SDK](https://dot.net/download)
- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (for SQL Server)

### Database Setup
```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Admin@12345!" \
  -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```

### Backend
```bash
cd backend
dotnet restore
dotnet build
dotnet run --project src/JewelleryCatalog.API
```
The API will start at `http://localhost:5000` with Swagger at `/swagger`.

### Frontend
```bash
cd frontend
npm install
ng serve
```
The app will be available at `http://localhost:4200`.

## Project Structure

```
├── backend/
│   └── src/
│       ├── JewelleryCatalog.Domain/          # Entities & interfaces
│       ├── JewelleryCatalog.Application/     # DTOs, services, business logic
│       ├── JewelleryCatalog.Infrastructure/  # EF Core, repositories, SQL Server
│       └── JewelleryCatalog.API/             # Controllers, auth, middleware
│
└── frontend/
    └── src/app/
        ├── core/           # Guards, interceptors, services
        ├── shared/         # Navbar, footer, models
        └── features/
            ├── public/     # Home, Collections, Product Detail, About, Contact
            └── admin/      # Login, Dashboard, Category/Product/Image/Inquiry mgmt
```

## Pages

### Public (no login required)
- **Home** — Hero, featured products, categories, value propositions
- **Collections** — Filterable/searchable product grid with pagination
- **Product Detail** — Full product info with image gallery
- **About Us** — Brand story and values
- **Contact Us** — Inquiry form (stored in database)

### Admin (JWT protected)
- **Login** — Admin authentication
- **Dashboard** — Stats, recent products & inquiries
- **Category Management** — CRUD with modal forms
- **Product Management** — CRUD with category assignment
- **Image Upload** — Multi-image upload per product
- **Inquiry Management** — View, filter, mark read, delete

## Default Admin Credentials

| Username | Password |
|----------|----------|
| admin    | Admin@123 |

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/categories | - | Active categories |
| GET | /api/categories/all | Admin | All categories |
| POST | /api/categories | Admin | Create category |
| PUT | /api/categories/:id | Admin | Update category |
| DELETE | /api/categories/:id | Admin | Delete category |
| GET | /api/products | - | Paged products |
| GET | /api/products/featured | - | Featured products |
| GET | /api/products/:id | - | Product detail |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| POST | /api/products/:id/images/upload | Admin | Upload image |
| DELETE | /api/products/:id/images/:imageId | Admin | Remove image |
| POST | /api/inquiries | - | Submit inquiry |
| GET | /api/inquiries | Admin | List inquiries |
| PATCH | /api/inquiries/:id/read | Admin | Mark as read |
| DELETE | /api/inquiries/:id | Admin | Delete inquiry |
| POST | /api/auth/login | - | Admin login |
| GET | /api/auth/dashboard | Admin | Dashboard stats |
