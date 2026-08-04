# Adaptive Quiz Platform

A full-stack adaptive quiz application built with **React**, **TypeScript**, and **ASP.NET Core (.NET 8)**.

The platform delivers a dynamic quiz experience where question difficulty adapts in real time based on user performance. It combines adaptive gameplay with authentication, analytics, leaderboards, and an admin management system.

---

## Overview

The Adaptive Quiz Platform was built to explore the design and implementation of a complete modern web application, covering both frontend and backend development.

Key areas include:

- Adaptive quiz engine
- Time-based scoring
- User progression tracking
- Authentication and authorisation
- REST API design
- Database modelling
- Unit testing
- Admin tooling
- Bug reporting system

---

## Repository Structure

```
AdaptiveQuiz/
├── API/                    # ASP.NET Core Web API
├── AdaptiveQuiz.Api.Tests/ # xUnit test project
├── Client/                 # React + TypeScript frontend
├── docs/                   # Product specification and supporting docs
└── README.md
```

---

## Features

### Quiz Engine

- Adaptive question difficulty
- Time-based scoring
- User progression
- Non-repeating question selection
- Monthly quiz restriction for standard users
- Unlimited quizzes for testers and administrators

### User Features

- Passwordless authentication (Magic Link)
- Quiz history
- Personal statistics
- Global leaderboard
- Bug reporting

### Administration

- Question management
- Bug report management
- Comment system for bug reports
- Role-based permissions

---

## Getting Started

This repository contains two applications:

- **API** — ASP.NET Core Web API
- **Client** — React + TypeScript frontend

Each project contains its own setup instructions:

- [API README](API/README.md)
- [Client README](Client/README.md)

## Documentation

Additional documentation can be found in the `docs` directory, including:

- Product specification
- Feature planning
- Supporting design notes

---

## Future Improvements

Planned enhancements include:

- Expanded question types
- Category-specific analytics
- Improved admin dashboard
- Additional authentication providers
- Enhanced reporting and visualisations

---
