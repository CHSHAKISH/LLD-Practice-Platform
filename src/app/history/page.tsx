import { prisma } from "@/lib/prisma";
import Link from "next/link";
import styles from "./page.module.css";

export default async function HistoryDashboard() {
  const attempts = await prisma.attempt.findMany({
    where: { userId: "demo_user" }, // Hardcoded for MVP
    orderBy: { createdAt: "desc" },
    include: {
      problem: true,
      submissions: {
        include: { evaluation: true },
        orderBy: { createdAt: "desc" },
        take: 1, // Get the latest submission for each attempt
      },
    },
  });

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Your Practice History</h1>
      <p className={styles.subtitle}>Review your past LLD attempts and track your progress.</p>

      {attempts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't attempted any problems yet.</p>
          <Link href="/problems" className={styles.primaryBtn}>
            Start Practicing
          </Link>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Problem</th>
                <th>Status</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => {
                const sub = attempt.submissions[0];
                return (
                  <tr key={attempt.id}>
                    <td>{new Date(attempt.createdAt).toLocaleDateString()}</td>
                    <td className={styles.problemName}>{attempt.problem.title}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[sub?.status.toLowerCase()] || ''}`}>
                        {sub?.status || "UNKNOWN"}
                      </span>
                    </td>
                    <td>
                      <span className={styles.scoreText}>
                        {sub?.evaluation?.score !== undefined ? `${sub.evaluation.score}/100` : "-"}
                      </span>
                    </td>
                    <td>
                      <Link href={`/history/${attempt.id}`} className={styles.viewLink}>
                        View Feedback &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
