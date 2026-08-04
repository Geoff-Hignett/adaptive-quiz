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

Create a `.env` file from `.env.example` and configure your Supabase credentials.

### Run

```bash
npm run dev
```

---

## Future Improvements

Potential future enhancements include:

- Improved mobile interactions
- Better loading skeletons
- Enhanced accessibility
- Expanded analytics dashboards
- Additional quiz visualisations

---

## Notes

The frontend is designed to consume the Adaptive Quiz API and should be run alongside the backend during development.
