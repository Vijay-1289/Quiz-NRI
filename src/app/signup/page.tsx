import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
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
                    <span>Already have an account?</span>
                    <Link href="/login" className="btn btn-light-gray ml-3">Sign In</Link>
                </div>
            </header>

            <main className="auth-main">
                <div className="auth-card">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join Interview Ready to ace your next career move</p>

                    <button className="btn btn-outline btn-google">
                        <Image src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google" width={24} height={24} className="google-icon" />
                        Sign up with Google
                    </button>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <form className="auth-form" action="/">
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="input-icon-wrapper">
                                <i className="ph-fill ph-user"></i>
                                <input type="text" placeholder="John Doe" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-icon-wrapper">
                                <i className="ph-fill ph-envelope"></i>
                                <input type="email" placeholder="john@example.com" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-icon-wrapper">
                                <i className="ph-fill ph-lock-key"></i>
                                <input type="password" placeholder="••••••••" required />
                                <button type="button" className="eye-btn"><i className="ph-fill ph-eye"></i></button>
                            </div>
                        </div>

                        <div className="form-checkbox">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</label>
                        </div>

                        <button type="submit" className="btn btn-dark btn-submit">Create Account <i className="ph-bold ph-arrow-right" style={{ marginLeft: "4px" }}></i></button>
                    </form>
                </div>
            </main>

            <footer className="auth-footer container">
                <div className="footer-bottom-auth">
                    <p>&copy; 2024 Interview Ready Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
