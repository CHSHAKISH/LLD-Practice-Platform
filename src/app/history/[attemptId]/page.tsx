import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default async function AttemptResultPage({
  params,
}: {
  params: { attemptId: string };
}) {
  const { attemptId } = await params;

  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: {
      problem: true,
      submissions: {
        include: {
          evaluation: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!attempt || attempt.submissions.length === 0) {
    notFound();
  }

  const submission = attempt.submissions[0];
  const evaluation = submission.evaluation;

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Feedback: {attempt.problem.title}</h1>
          <p className={styles.date}>
            Submitted on {new Date(submission.createdAt).toLocaleString()}
          </p>
        </div>
        <Link href={`/problems/${attempt.problemId}`} className={styles.tryAgainBtn}>
          Try Again
        </Link>
      </div>

      <div className={styles.grid}>
        <div className={styles.solutionPanel}>
          <h2 className={styles.sectionTitle}>Your Design Submission</h2>
          <pre className={styles.codeBlock}>{submission.content}</pre>
        </div>

        <div className={styles.feedbackPanel}>
          <h2 className={styles.sectionTitle}>AI Evaluation Results</h2>
          
          {submission.status === "FAILED" ? (
            <div className={`${styles.feedbackCard} ${styles.errorCard}`}>
              <h3>Evaluation Failed</h3>
              <p>The submission was either too short, invalid, or the AI engine encountered an error.</p>
            </div>
          ) : !evaluation ? (
            <div className={styles.feedbackCard}>
              <p>Evaluation is still processing... Please refresh.</p>
            </div>
          ) : (
            <div className={styles.feedbackContainer}>
              <div className={styles.scoreHeader}>
                <div className={styles.scoreBox}>
                  <span className={styles.scoreValue}>{evaluation.score}</span>
                  <span className={styles.scoreLabel}>/100</span>
                </div>
                <div className={styles.confidenceTag}>
                  Confidence: {evaluation.confidence}
                </div>
              </div>

              <div className={`${styles.feedbackCard} ${styles.evidenceCard}`}>
                <h3>✅ What You Did Well</h3>
                <p>{evaluation.evidence}</p>
              </div>

              <div className={`${styles.feedbackCard} ${styles.concernCard}`}>
                <h3>⚠️ Area of Concern</h3>
                <p>{evaluation.concern}</p>
              </div>

              <div className={`${styles.feedbackCard} ${styles.suggestionCard}`}>
                <h3>💡 Suggestion for Improvement</h3>
                <p>{evaluation.suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
