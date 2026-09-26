"use client";

import { useState } from "react";
import styles from "./workspace.module.css";
import { useRouter } from "next/navigation";

type Problem = {
  id: string;
  title: string;
  description: string;
  requirements: string;
};

export default function Workspace({ problem }: { problem: Problem }) {
  const [solution, setSolution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!solution.trim()) return alert("Please write a solution before submitting.");
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          solution: solution,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + (data.error || "Failed to evaluate"));
        setIsSubmitting(false);
        return;
      }

      // Redirect to the attempt history page so the user can see their feedback
      router.push(`/history/${data.attemptId}`);
    } catch (error) {
      alert("An error occurred during submission.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h1 className={styles.title}>{problem.title}</h1>
        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Description</h2>
          <p className={styles.text}>{problem.description}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Requirements</h2>
          <p className={styles.text}>{problem.requirements}</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.editorHeader}>
          <span className={styles.editorTitle}>Your Design (Classes, Interfaces, Reasoning)</span>
          <button 
            className={styles.submitBtn} 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Design"}
          </button>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Write your Low-Level Design solution here... Use plain text, pseudo-code, or markdown."
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
