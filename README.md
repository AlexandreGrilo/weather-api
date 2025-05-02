# 🌦️ Weather API (NestJS)

A simple Weather API built with **NestJS**, **TypeScript**, **Prisma**, and **PostgreSQL**, integrating the **OpenWeatherMap API** and using **@nestjs/schedule** for recurring weather data collection.

## 🚀 Features

- Add and remove cities
- Fetch current and historical weather data (last 48h)
- Automatic periodic weather fetching (cron job)
- Swagger API docs (`/api`)
- DTOs with validation and API metadata
- Modular, clean architecture with services and scheduling

## 🛠️ Tech Stack

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Docker](https://www.docker.com/)
- [@nestjs/schedule](https://docs.nestjs.com/techniques/task-scheduling)

## 📦 Installation

```bash
git clone https://github.com/AlexandreGrilo/weather-api.git
cd weather-api
npm install
```

### Create a `.env` file in the root of the project and add the following:

```bash
DATABASE_URL=postgres://postgres:postgres@db:5432/weatherdb
POSTGRES_DB=database_name
POSTGRES_USER=database_username
POSTGRES_PASSWORD=database_user_password
OPENWEATHER_API_KEY=your_openweathermap_api_key
```
### Run with Docker:

```bash
docker-compose up --build
docker compose exec app npx prisma migrate dev
```

### Run locally (without Docker):

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

## 🧪 Endpoints
Once running, access Swagger docs at:

http://localhost:3000/api

### Some endpoints:

* POST /cities – Add a city with the latest weather data

* GET /cities – List all cities and all weather history

* GET /cities/weather – All cities with latest weather

* GET /cities/:name/weather – Weather history of a city

* DELETE /cities/:id – Delete a city and all it's weather data


## 🗓️ Cron Job

Weather data is fetched every hour and stored in the database automatically.


## ✅ Todo / Extras (for future improvements)

* Redis cache layer for weather

* Circuit breaker and retry logic for API resilience

* End-to-end and load tests


## 👨‍💻 Author

Alexandre Vaz

[github.com/AlexandreGrilo](https://github.com/AlexandreGrilo)