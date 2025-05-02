# Weather API

A NestJS-based API that provides weather data for cities. The API allows for creating cities, storing weather data, and fetching current and historical weather information for cities.

## Features

- Create cities and store weather data for them.
- Retrieve the latest weather data for all cities.
- Retrieve all historical weather data for all cities.
- Retrieve the weather history for a specific city from the last two days.
- Automatic weather data fetching using cron jobs.

## Tech Stack

- **NestJS**: Web framework for building APIs.
- **Prisma**: ORM for database access (PostgreSQL).
- **Swagger**: API documentation.
- **OpenWeatherMap API**: Fetch weather data.

## Requirements

- Node.js v20+ (for compatibility with `crypto` and other dependencies)
- PostgreSQL database
- OpenWeatherMap API Key

## Setup

### 1. Clone the repository

```bash
git clone <repository_url>
cd <project_folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root of the project and add the following:

```bash
DATABASE_URL=postgres://postgres:postgres@db:5432/weatherdb
POSTGRES_DB=database_name
POSTGRES_USER=database_username
POSTGRES_PASSWORD=database_user_password
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

### 4. Build and run the Docker container
```bash
docker compose up --build
```

### 5. Run the database migrations inside Docker
```bash
docker compose exec app npx prisma migrate dev --name <migration-name>
```

### 6. Swagger API Documentation
Once the server is running, you can access the API documentation at:

```bash
http://localhost:3000/api
```

## API Endpoints

### POST /cities

Create a city with the latest weather.


### GET /cities

Get all cities with the latest weather saved in the database.


### GET /cities/weather

Get all cities with all the weather data saved in the database.


### GET /cities/:name/weather

Get the last 2 days of weather data for a specific city


### DELETE /cities/:id

Delete a city by ID.