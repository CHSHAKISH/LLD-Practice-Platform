import { prisma } from "@/lib/prisma";
import Link from "next/link";
import styles from "./page.module.css";

// This is a Server Component, meaning it fetches data securely on the server
export default async function ProblemsPage() {
  const problems = await prisma.problem.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Practice Problems</h1>
      <p className={styles.subtitle}>
        Select a real-world system design problem to begin practicing.
      </p>

      <div className={styles.grid}>
        {problems.map((problem) => (
          <Link href={`/problems/${problem.id}`} key={problem.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{problem.title}</h2>
            <p className={styles.cardDesc}>{problem.description}</p>
            <div className={styles.cardFooter}>
              <span className={styles.practiceBtn}>Practice Design &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
