import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <div className="logo-icon">
              <i className="ph-fill ph-graduation-cap"></i>
            </div>
            <span>Interview Ready</span>
          </Link>

          <Link href="/login" className="btn btn-dark">Login</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero bg-light">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="badge">
              <i className="ph-fill ph-check-circle"></i> TAILORED FOR TECH PROFESSIONALS
            </div>
            <h1 className="hero-title">
              Bridge the Gap<br />
              Between <span className="text-blue">Technical<br />Skills</span> &<br />
              Professional<br />
              Communication
            </h1>
            <p className="hero-subtitle">
              Overcome communication barriers and ace your HR interviews with our specialized English learning platform. Master the nuances of corporate dialogue.
            </p>
            <div className="hero-actions">
              <Link href="#" className="btn btn-dark btn-lg">Get Started Free</Link>
              <Link href="#" className="btn btn-outline btn-lg"><i className="ph-fill ph-play-circle"></i> See How It Works</Link>
            </div>
            <div className="social-proof">
              <div className="avatar-group">
                <div className="avatar" style={{ backgroundColor: "#cbd5e1" }}></div>
                <div className="avatar" style={{ backgroundColor: "#94a3b8", marginLeft: "-12px" }}></div>
                <div className="avatar" style={{ backgroundColor: "#64748b", marginLeft: "-12px" }}></div>
              </div>
              <span className="social-text">Joined by 10,000+ developers</span>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <Image src="/assets/hero_image.png" alt="Typing on laptop" width={500} height={400} className="hero-img" />
            {/* Floating stat card */}
            <div className="floating-stat">
              <div className="stat-icon">
                <i className="ph-bold ph-trend-up"></i>
              </div>
              <div className="stat-content">
                <span className="stat-label">INTERVIEW SUCCESS RATE</span>
                <span className="stat-value">85% Improvement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container container-sm">
          <div className="section-header text-center">
            <h2>Master Every Aspect of the Interview</h2>
            <div className="heading-underline"></div>
            <p>We focus on the specific communication challenges technical candidates face during the selection process for global MNCs.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card bg-gray">
              <div className="feature-icon bg-dark">
                <i className="ph-fill ph-user-sound"></i>
              </div>
              <h3>Self-Introduction Mastery</h3>
              <p>Craft a compelling narrative that highlights your technical expertise while showing your personality and cultural fit.</p>
            </div>
            <div className="feature-card bg-gray">
              <div className="feature-icon bg-dark">
                <i className="ph-fill ph-notebook"></i>
              </div>
              <h3>MNC Mock Tests</h3>
              <p>Practice with industry-specific mock tests tailored for top-tier companies. Realistic environments and AI-driven feedback.</p>
            </div>
            <div className="feature-card bg-gray">
              <div className="feature-icon bg-dark">
                <i className="ph-fill ph-text-aa"></i>
              </div>
              <h3>Grammar Fundamentals</h3>
              <p>Build a solid foundation with grammar rules essential for professional clarity. Speak with confidence and grammatical accuracy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners / Logos Section */}
      <section className="partners bg-light">
        <div className="container">
          <h4 className="partners-title">FOCUSING ON SUCCESS AT TOP GLOBAL FIRMS</h4>
          <div className="partners-logos">
            <div className="partner"><div className="circle"></div> <span>TCS</span></div>
            <div className="partner"><div className="circle"></div> <span>Wipro</span></div>
            <div className="partner"><div className="circle"></div> <span>Infosys</span></div>
            <div className="partner"><div className="circle"></div> <span>Accenture</span></div>
            <div className="partner"><div className="circle"></div> <span>Cognizant</span></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-light">
        <div className="container">
          <div className="cta-banner bg-dark text-white">
            <h2>Ready to land your dream job<br />at a global MNC?</h2>
            <p>Start your journey today and bridge the gap between your technical<br />brilliance and professional communication.</p>
            <Link href="#" className="btn btn-white btn-lg">Get Started Now</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="logo">
                <div className="logo-icon">
                  <i className="ph-fill ph-graduation-cap"></i>
                </div>
                <span>Interview Ready</span>
              </Link>
              <p className="brand-desc">Empowering tech professionals with the communication skills needed to excel in global corporate environments.</p>
              <div className="social-links">
                <Link href="#" className="social-icon"><i className="ph ph-globe"></i></Link>
                <Link href="#" className="social-icon"><i className="ph ph-at"></i></Link>
                <Link href="#" className="social-icon"><i className="ph ph-share-network"></i></Link>
              </div>
            </div>


          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Interview Ready English Learning. All rights reserved.</p>
            <div className="footer-bottom-links">
              <span>English (US)</span>
              <span className="global-access"><i className="ph ph-globe"></i> Global Access</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
