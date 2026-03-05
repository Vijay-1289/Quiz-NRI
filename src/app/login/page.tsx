"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="auth-body">
            <header className="auth-header container">
                <Link href="/" className="logo">
                    <div className="logo-icon">
                        <i className="ph-fill ph-graduation-cap"></i>
                    </div>
                    <span>Interview Ready</span>
                </Link>
                <div className="auth-header-right">
                    Elevate your professional English
                </div>
            </header>

            <main className="auth-main">
                <div className="auth-card">
                    <h1 className="auth-title">Sign In</h1>
                    <p className="auth-subtitle">Welcome back to your English learning journey.</p>

                    <button
                        className="btn btn-outline btn-google"
                        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    >
                        <Image src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google" width={24} height={24} className="google-icon" />
                        Sign in with Google
                    </button>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <form className="auth-form" action="/dashboard">
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-icon-wrapper">
                                <i className="ph ph-envelope"></i>
                                <input type="email" placeholder="name@company.com" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="label-flex">
                                <label>Password</label>
                                <Link href="#" className="forgot-link">Forgot Password?</Link>
                            </div>
                            <div className="input-icon-wrapper">
                                <i className="ph-fill ph-lock-key"></i>
                                <input type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={`ph-fill ${showPassword ? "ph-eye-slash" : "ph-eye"}`}></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark btn-submit">Sign In</button>
                    </form>

                    <p className="auth-bottom-text">
                        New to Interview Ready? <Link href="/signup">Create an account</Link>
                    </p>
                </div>
            </main>

            <footer className="auth-footer container">
                <div className="footer-bottom-auth">
                    <p>&copy; 2024 Interview Ready English Learning Platform. All rights reserved.</p>
                    <div className="footer-links-inline">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
