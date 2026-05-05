# Adaptive Quiz Platform

A full-stack adaptive quiz application built with a modern TypeScript frontend and a .NET backend.  
The platform delivers a dynamic, performance-driven quiz experience where question difficulty adjusts in real time based on user performance.

---

## 🚀 Overview

The Adaptive Quiz Platform is designed to create an engaging, repeatable quiz experience with:

- Dynamic difficulty adjustment
- Time-based scoring
- Monthly participation cycles
- Performance analytics and leaderboard tracking

The system prioritises **low-friction access**, **non-repetitive content**, and **scalable architecture**.

---

## 🧱 Monorepo Structure

AdaptiveQuiz/
├── API/ # .NET 8 Web API 
├── CLIENT/ # React + TypeScript app
├── docs/ # Product specs, notes, and supporting documentation
└── README.md # You are here

---

## ⚙️ Tech Stack

### Frontend (FE)

- React
- TypeScript
- TanStack Query (React Query)
- Supabase (authentication)
- React Router
- Tailwind CSS

### Backend (BE)

- .NET 8 (ASP.NET Core Web API)
- Entity Framework Core
- SQLite (development)
- Clean architecture (Controllers, Services, Domain)

---

## ✨ Core Features

- 🔐 Passwordless authentication (magic link via Supabase)
- 🧠 Adaptive difficulty (question level adjusts per answer)
- ⏱️ Time-based scoring system
- 🔁 Monthly quiz restriction (for standard users)
- 🏆 Global leaderboard
- 📊 User performance analytics
- 🧪 Tester/Admin roles for unrestricted access
- 🎯 Non-repeating question system

---

## 🧠 How It Works (High-Level)

1. User logs in via magic link
2. Starts a quiz (if eligible)
3. Answers 10 questions sequentially
4. Difficulty adjusts after each answer
5. Score is calculated based on correctness + speed
6. Results are stored and surfaced via analytics and leaderboard

---
