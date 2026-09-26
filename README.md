# LLD Practice Platform

A focused, elegant practice experience that helps learners practice Low-Level Design (LLD), submit solutions, and receive explainable AI feedback.

## Tech Stack
- **Framework:** Next.js (App Router) with TypeScript
- **Database:** SQLite (via Prisma ORM)
- **AI Evaluation:** Google Gemini API
- **Styling:** Vanilla CSS (CSS Modules) with premium glassmorphic aesthetics.

## How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   DATABASE_URL="file:./dev.db"
   GEMINI_API_KEY="your_actual_api_key_here"
   ```

3. **Initialize Database**
   Sync the schema and run the seed script to populate the practice problems (Parking Lot, Vending Machine, Elevator, Library):
   ```bash
   npx prisma db push --force-reset
   npx tsx prisma/seed.ts
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run Basic Tests**
   ```bash
   npx tsx tests/deterministic.test.ts
   ```

## Key Design Decisions
Please refer to `AI_USAGE.md` for AI-assisted decisions, and `context/plan.md` for the original architectural phases and scope boundaries.
