# Adaptive Quiz Platform — Product Specification

## 1. Overview

The Adaptive Quiz Platform is a web-based application designed to provide users with a recurring, engaging quiz experience centred around knowledge.

The system delivers a monthly quiz cycle, where users complete a fixed-length quiz and receive feedback based on performance, speed, and subject knowledge. The platform adapts question difficulty dynamically and tracks user progression over time.

---

## 2. Objectives

- Deliver a low-friction user experience using passwordless authentication
- Encourage repeat engagement through a structured monthly quiz cycle
- Provide adaptive difficulty to personalise the quiz experience
- Ensure a large, non-repeating question pool
- Offer meaningful analytics on user performance
- Enable internal management of question content via admin roles

---

## 3. User Roles

### User
- Can authenticate via magic link or social login
- Can take one quiz per calendar month
- Can view historical performance and analytics

### Tester
- Can take unlimited quizzes without monthly restriction
- Used for development and QA purposes

### Admin
- Can create, edit, and manage questions
- Can categorise questions
- Can take quizzes without restriction but not enter the leaderboard

---

## 4. Core Features

### 4.1 Authentication

- Supabase-powered authentication
- Supports:
  - Magic link (primary method)
  - OAuth providers (e.g. Google)
- No password requirement

---

### 4.2 Quiz Lifecycle

Each quiz attempt consists of:
- Exactly 10 questions
- A dynamically adjusted difficulty level
- A single-use joker feature
- Time-based scoring

#### Flow:
1. User starts quiz
2. System validates eligibility (monthly restriction)
3. Quiz begins at the user's current difficulty level
4. Questions are served sequentially
5. Difficulty adjusts after each answer:
   - Correct → increase difficulty
   - Incorrect → decrease difficulty
6. Quiz ends after 10 questions
7. Results are stored and made available to the user

---

### 4.3 Monthly Constraint

- Standard users may complete one quiz per calendar month
- Eligibility is determined using the user's last completed quiz timestamp
- Tester and Admin roles are not restricted

---

### 4.4 Question System

Questions are stored in a centralised pool and include:

- Difficulty level (1–10)
- Category (e.g. topic or subject area)
- Type (e.g. Multiple Choice, True/False, Drag & Drop)
- Structured data payload (JSON)

### 4.5 Scoring System

Each question contributes to a total score based on:

- Base points for correctness
- Time taken to answer
- Active streak multiplier

#### Streak System:
- Consecutive correct answers increase the multiplier
- Multiplier resets on incorrect answer

---

### 4.6 “On Fire” Mechanic

- Triggered after a defined number of consecutive correct answers
- Applies a scoring multiplier bonus
- Intended to reward sustained performance

---

### 4.7 Joker Mechanic

- Each quiz includes one joker usage
- Example effects:
- Remove incorrect options (50/50)
- Backend enforces single-use constraint per quiz

---

### 4.8 Analytics & Feedback

Users can view:

- Overall score history
- Performance by category
- Accuracy rate
- Progression of difficulty level over time

---

## 5. Data & Tracking Requirements

The system must persist:

- User quiz attempts
- Individual question responses
- Time taken per question
- Difficulty progression per attempt
- Question exposure history (to prevent repetition)

---

## 6. Success Criteria

- Users can complete a quiz in a single session without friction
- No repeated questions occur within normal usage
- Difficulty adapts in a way that feels responsive and fair
- System remains maintainable and extensible as features evolve