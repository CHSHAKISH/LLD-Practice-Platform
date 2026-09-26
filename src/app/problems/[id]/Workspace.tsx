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
    
    // In Phase 4, we will actually call the backend API here.
    // For now, we simulate the submission delay and redirect.
    console.log("Submitting solution:", solution);
    
    // Simulate network delay for MVP Phase 3
    setTimeout(() => {
      alert("Submission successful! (Backend integration coming in Phase 4)");
      setIsSubmitting(false);
      // In Phase 4 we will redirect to the results page or history page
      // router.push(`/history`);
    }, 1000);
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
