# AI Usage & Decisions

As requested in the assignment, here are 3 meaningful decisions made with the assistance of AI during development:

1. **Architecture & Scope (Monolith vs Microservices)**
   - **AI Suggestion**: The AI suggested using Next.js App Router with Server Components and SQLite via Prisma as a single full-stack monolith, rather than splitting into a separate React frontend and Express backend.
   - **Decision**: **Accepted**. As per the assignment constraints (2 days, MVP focus), a monolith vastly reduces configuration complexity, setup time, and avoids unnecessary network/CORS overhead while still providing clear separation of concerns (API routes vs UI components).

2. **Database Choice (SQLite)**
   - **AI Suggestion**: The AI suggested defaulting to SQLite for the prototype database to avoid requiring the evaluator to install Docker or a local PostgreSQL server.
   - **Decision**: **Accepted**. SQLite perfectly models the necessary relational domain logic (User, Attempt, Submission, Evaluation) while keeping the project 100% portable for reviewers.

3. **Evaluation Engine (Deterministic + Generative AI split)**
   - **AI Suggestion**: The AI suggested splitting the evaluation into two distinct steps: a fast, deterministic check (e.g., minimum character length, empty payload checks) followed by a structured AI evaluation using a strict JSON prompt.
   - **Decision**: **Accepted**. This directly answers the design question on "which parts of evaluation should be deterministic". It prevents wasting AI API calls on empty or junk submissions, ensures immediate feedback for obvious errors, and forces the LLM to output consistent, parseable feedback.
