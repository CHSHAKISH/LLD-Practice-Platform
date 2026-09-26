import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLD Practice Platform",
  description: "Practice Low-Level Design with AI Feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <nav className={styles.navbar}>
          <div className={`container ${styles.navContent}`}>
            <Link href="/" className={styles.logo}>
              LLD <span>Practice</span>
            </Link>
            <div className={styles.navLinks}>
              <Link href="/problems" className={styles.navLink}>
                Problems
              </Link>
              <Link href="/history" className={styles.navLink}>
                History
              </Link>
            </div>
          </div>
        </nav>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} LLD Practice Platform.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
