# Hotel Reservation System

A full-stack hotel reservation system built with Vue.js (frontend) and Express.js + MySQL (backend).

## System Architecture

- **Frontend**: Nuxt 3 with Vue.js, Vuetify, TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: MySQL 8.0 with Knex.js migrations
- **Deployment**: Docker containers with docker-compose

## Features

- ✅ Reservation creation form with validation
- ✅ MySQL database integration
- ✅ RESTful API endpoints for reservations
- ✅ Form validation (both frontend and backend)
- ✅ Responsive UI with Material Design
- ✅ Docker containerization

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/k-masasa/hotel-reservation-system.git
cd hotel-reservation-system
```

2. Start all services:
```bash
docker compose up -d
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/health

### Local Development

#### Backend Setup

```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create a new reservation
- `GET /health` - Health check
- `GET /api` - API information

## Database Schema

The `reservations` table includes:

- Guest information (name, phone, email, address)
- Stay details (check-in/out dates, room type/id)
- Pricing information
- Audit fields (created_at, updated_at, is_deleted, is_cancelled)

## Environment Variables

Backend environment variables:
- `DB_HOST` - MySQL host (default: mysql)
- `DB_PORT` - MySQL port (default: 3306)
- `DB_NAME` - Database name (default: hotel_reservation)
- `DB_USER` - Database user (default: hotel_user)
- `DB_PASSWORD` - Database password (default: hotel_password)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

## Development Commands

### Backend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run migrate:latest  # Run database migrations
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Database Operations

### Run migrations manually

```bash
cd backend
npx knex migrate:latest
```

### Create new migration

```bash
cd backend
npx knex migrate:make migration_name
```

## Troubleshooting

1. **Database connection issues**: Ensure MySQL container is running and healthy
2. **Port conflicts**: Check if ports 3000, 3001, 3306 are available
3. **Migration errors**: Check database credentials and connection

## Technology Stack

### Frontend
- Nuxt 3
- Vue.js 3
- Vuetify 3
- TypeScript
- Tailwind CSS

### Backend
- Express.js
- TypeScript
- Knex.js (SQL query builder)
- MySQL2 (database driver)
- Joi (validation)

### Infrastructure
- Docker & Docker Compose
- MySQL 8.0