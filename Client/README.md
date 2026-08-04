# Adaptive Quiz Frontend

React + TypeScript frontend for the Adaptive Quiz Platform.

The frontend provides a responsive user experience for authentication, quiz participation, statistics, leaderboards, and administration by consuming the Adaptive Quiz REST API.

---

## Overview

The frontend is responsible for:

- User authentication
- Quiz experience
- Leaderboards
- User statistics
- Admin interfaces
- Bug reporting
- API communication

---

## Tech Stack

- React
- TypeScript
- React Router
- TanStack Query (React Query)
- Tailwind CSS
- Supabase Authentication
- Vite

---

## Architecture

The application follows a feature-oriented structure.

```
api/
components/
contexts/
hooks/
pages/
types/
```

### Responsibilities

**api**

Centralised API client and request handling.

**hooks**

React Query hooks for data fetching and mutations.

**pages**

Application routes and page orchestration.

**components**

Reusable UI components.

**contexts**

Shared application state.

---

## Features

### Authentication

- Passwordless Magic Link login
- Supabase session management
- Protected routes

### Quiz

- Adaptive question flow
- Timer
- Progress tracking
- Results page

### User

- Statistics dashboard
- Display name management
- Leaderboard

### Bug Reporting

- Submit bug reports
- View submitted bugs
- Comment on bugs

---

## State Management

Server state is managed using **TanStack Query**.

Benefits include:

- Automatic caching
- Background refetching
- Mutation handling
- Loading and error states

Local UI state is managed using React Context where appropriate.

---

## API Integration

The frontend communicates exclusively with the ASP.NET Core API.

Authentication tokens issued by Supabase are automatically attached to authenticated requests.

---

## Running the Frontend

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Create a Supabase project at https://supabase.com, then navigate to **Project Settings → API** and copy your Project URL and Anon Key into the `.env` file.

| Variable                     | Description                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| `VITE_SUPABASE_URL`          | Your Supabase project URL                                                          |
| `VITE_SUPABASE_ANON_KEY`     | Your Supabase anon/public key                                                      |
| `VITE_SUPABASE_REDIRECT_URL` | Redirect URL after authentication (typically `http://localhost:5173`)              |
| `VITE_API_BASE_URL`          | URL of the running Adaptive Quiz API (typically `https://localhost:7148/api/quiz`) |

### Run

```bash
npm run dev
```

---

## Notes

The frontend is designed to consume the Adaptive Quiz API and should be run alongside the backend during development.
