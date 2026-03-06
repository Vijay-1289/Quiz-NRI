"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div className="auth-body">
            <header className="auth-header container">
                <Link href="/" className="logo">
                    <div className="logo-icon logo-icon-ss">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                            <path d="M12 2C6.477 2 2 6.021 2 11c0 2.5 1.059 4.764 2.757 6.4L4 21l4.077-1.33A10.07 10.07 0 0 0 12 20c5.523 0 10-4.021 10-9S17.523 2 12 2Z" fill="white" />
                            <rect x="7" y="14" width="2" height="3" rx="1" fill="#2563eb" />
                            <rect x="11" y="11" width="2" height="6" rx="1" fill="#2563eb" />
                            <rect x="15" y="8" width="2" height="9" rx="1" fill="#2563eb" />
                        </svg>
                    </div>
                    <span>Skills Speak</span>
                </Link>
                <div className="auth-header-right">
                    Elevate your professional English
                </div>
            </header>

            <main className="auth-main">
                <div className="auth-card auth-card-centered">
                    <div className="auth-icon-ring">
                        <i className="ph-fill ph-graduation-cap"></i>
                    </div>

                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to continue your English learning journey.</p>

                    <button
                        className="btn-google-full"
                        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    >
                        <svg className="google-svg" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                        Sign in with Google
                    </button>

                    <p className="auth-bottom-text">
                        New to Skills Speak?{" "}
                        <Link href="/signup">Create an account</Link>
                    </p>
                </div>
            </main>

            <footer className="auth-footer container">
                <div className="footer-bottom-auth">
                    <p>&copy; 2024 Skills Speak. All rights reserved.</p>
                    <div className="footer-links-inline">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
