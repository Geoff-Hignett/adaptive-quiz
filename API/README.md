# Adaptive Quiz API

A .NET 8 REST API powering the Adaptive Quiz Platform.

The API manages quiz progression, adaptive difficulty, scoring, user progression, leaderboards, question management, and bug reporting while exposing a clean REST interface for the React frontend.

---

## Overview

The API is responsible for:

- Managing the complete quiz lifecycle
- Serving adaptive quiz questions
- Calculating scores
- Tracking user progression
- Enforcing monthly quiz restrictions
- Preventing question repetition
- Managing leaderboard data
- Managing questions through admin endpoints
- Handling bug reports and comments
- Authenticating users using Supabase JWTs

---

## Tech Stack

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger / OpenAPI
- JWT Authentication
- xUnit
- FluentAssertions

---

## Architecture

The API follows a layered architecture.

```
Controllers
    ↓
Services
    ↓
Entity Framework Core
    ↓
SQLite
```

### Project Structure

```
Controllers/
Data/
Domain/
DTOs/
Exceptions/
Infrastructure/
Middleware/
Migrations/
Services/
```

### Responsibilities

**Controllers**

- Handle HTTP requests
- Authorisation
- Validation
- Return DTO responses

**Services**

Contain all business logic, including:

- Adaptive difficulty
- Scoring
- Quiz flow
- Question management
- User management
- Bug management

**Domain**

Database entities and models.

**DTOs**

Separate request and response contracts for the API.

**Middleware**

Global exception handling and consistent API error responses.

---

## Features

### Quiz

- Adaptive difficulty (levels 1–10)
- Time-based scoring
- User progression
- Question history
- Prevention of repeated questions
- Monthly participation restriction

### Users

- Passwordless authentication
- Display name management
- Personal statistics

### Leaderboard

- Total score ranking
- Multiple attempt tracking
- Admin users excluded

### Question Management

- Create questions
- Update questions
- View questions

### Bug Reporting

- Create bug reports
- Comment on bugs
- Admin bug management

---

## Authentication

Authentication uses **Supabase**.

The frontend authenticates users and sends a JWT bearer token with each protected request.

The API validates Supabase-issued JWTs before authorising access.

---

## Database

Development uses SQLite together with Entity Framework Core.

On startup the API automatically:

- Applies pending migrations
- Creates the database if required
- Seeds the question database when empty

SQLite database files are excluded from source control and are generated automatically when the application starts.

---

## Testing

Service-layer business logic is covered using:

- xUnit
- FluentAssertions
- EF Core InMemory

Tests cover areas including:

- Quiz lifecycle
- Adaptive difficulty
- Scoring
- User restrictions
- Question management
- Bug reporting

---

## Running the API

### Prerequisites

- .NET 8 SDK

### Install dependencies

```bash
dotnet restore
```

### Configure authentication

Create an `appsettings.Development.json` file from `appsettings.Development.example.json` and populate the Supabase settings with your own project values.

Example:

```json
{
    "Supabase": {
        "Authority": "https://your-project-id.supabase.co/auth/v1",
        "Audience": "authenticated"
    }
}
```

The Authority value can be found in your Supabase project.

### Run

```bash
dotnet run
```

During development the API will automatically:

- Apply any pending Entity Framework Core migrations
- Create the SQLite database if it does not already exist
- Seed the database with sample quiz questions if it is empty
- Launch Swagger UI for testing API endpoints

## Future Improvements

Potential future enhancements include:

- Additional question types
- Category-specific analytics
- Pagination
- Rate limiting
- Structured logging
- API versioning
