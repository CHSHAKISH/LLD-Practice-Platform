import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Master <span className={styles.highlight}>Low-Level Design</span>
        </h1>
        <p className={styles.subtitle}>
          Practice designing real-world systems, submit your solutions, and get
          instant, explainable AI-powered feedback to improve your software
          architecture skills.
        </p>
        <div className={styles.actions}>
          <Link href="/problems" className={styles.primaryButton}>
            Start Practicing
          </Link>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📋</div>
            <h3 className={styles.featureTitle}>Real-World Problems</h3>
            <p className={styles.featureDesc}>
              Tackle problems like Parking Lot, Vending Machine, and Elevator
              design with clear requirements and context.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤖</div>
            <h3 className={styles.featureTitle}>AI-Powered Feedback</h3>
            <p className={styles.featureDesc}>
              Get detailed, structured feedback on your design choices, class
              responsibilities, and SOLID principles.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📈</div>
            <h3 className={styles.featureTitle}>Track Improvement</h3>
            <p className={styles.featureDesc}>
              Review your attempt history, learn from past mistakes, and see how
              your design thinking evolves over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
