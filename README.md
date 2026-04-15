# Adaptive Quiz API

A .NET 8 Web API powering an adaptive quiz platform. The system delivers a monthly quiz experience where users answer a fixed set of questions, with difficulty dynamically adjusting based on performance. It enforces a strict quiz flow, prevents question repetition, and tracks user progression, scoring, and historical performance.

The backend is designed with a focus on real-world architecture and state management, including a controlled quiz lifecycle (start → question → answer → completion), per-question tracking, and rule-based progression logic.

## Tech Stack

- .NET 8 (ASP.NET Core Web API)
- Entity Framework Core
- SQLite (development)
- Clean separation of concerns (Controllers, Services, Domain)

Authentication will be integrated using Supabase (magic link + OAuth) to provide a frictionless user experience.