# AI Usage & Key Decisions

This document outlines the meaningful architectural and implementation decisions made during the development of this prototype, specifically highlighting how AI was utilized to shape the final product.

## 1. Architecture & Domain Boundaries (Monolith vs Microservices)
- **AI Suggestion**: When deciding between a decoupled React SPA + Express API or a full-stack Next.js architecture, the AI heavily suggested a **Next.js App Router Monolith** with server components.
- **Decision (Accepted)**: As per the assignment constraints (MVP focus, 2-day timeline), a monolith vastly reduces configuration complexity. More importantly, it demonstrates good judgement regarding "Scale Practicality." We avoided unnecessary microservices, Kubernetes, or distributed system complexities. The domain boundaries are cleanly separated at the module level (UI components vs API routes) rather than over the network.

## 2. Database & Data Modeling Choice
- **AI Suggestion**: The AI suggested using **SQLite via Prisma ORM** instead of PostgreSQL or MongoDB to ensure the prototype is portable and runnable by an evaluator without Docker.
- **Decision (Accepted)**: We designed a clean relational model (`Problem` -> `Attempt` -> `Submission` -> `Evaluation`). The decision to decouple `Submission` (the raw text and state) from `Evaluation` (the AI feedback) was critical. It perfectly satisfies **Change Test B** (Adding Human Review later). Because the evaluation is a separate entity, we can easily swap the AI evaluator for a human reviewer without touching the core submission flow.

## 3. Evaluation Engine: Deterministic + Generative AI Split
- **AI Suggestion**: The AI suggested splitting the evaluation into two distinct steps: a fast, rule-based deterministic check, followed by an LLM call strictly enforced to return JSON.
- **Decision (Accepted)**: This directly answers the design question: *"Which parts of evaluation should be deterministic?"* We implemented a deterministic filter that instantly fails empty or suspiciously short submissions. This prevents wasting expensive AI API calls. For the generative part, we used a highly structured rubric prompt (evaluating Encapsulation, Single Responsibility, etc.) instead of a generic "AI Score," satisfying the requirement for a **useful feedback model**.

## 4. Graceful Degradation & State Management
- **AI Suggestion**: The AI helped design a fallback mechanism in the event of an external API failure (e.g., `503 Service Unavailable` from Gemini).
- **Decision (Accepted)**: This satisfies the constraint: *"What should happen if evaluation takes time or fails?"* Instead of dropping the request or crashing the UI, the system catches the failure, updates the Submission state to `FAILED` (or generates a safe fallback mock), and redirects the user gracefully to the feedback UI. This ensures the platform works end-to-end reliably.
