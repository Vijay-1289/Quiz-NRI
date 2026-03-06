import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="container nav-container">
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
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {/* First set */}
              <div className="marquee-logo-card">
                <Image src="/logos/tcs.svg" alt="TCS" width={120} height={48} style={{ objectFit: "contain" }} />
              </div>
              <div className="marquee-logo-card">
                <Image src="/logos/wipro.svg" alt="Wipro" width={110} height={48} style={{ objectFit: "contain" }} />
              </div>
              <div className="marquee-logo-card">
                <Image src="/logos/infosys.svg" alt="Infosys" width={130} height={48} style={{ objectFit: "contain" }} />
              </div>
              <div className="marquee-logo-card">
                <Image src="/logos/accenture.svg" alt="Accenture" width={140} height={48} style={{ objectFit: "contain" }} />
              </div>
              <div className="marquee-logo-card">
                <Image src="/logos/cognizant.svg" alt="Cognizant" width={140} height={48} style={{ objectFit: "contain" }} />
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="marquee-logo-card">
                <Image src="/logos/tcs.svg" alt="TCS" width={120} height={48} style={{ objectFit: "contain" }} />
              </div>
              <div className="marquee-logo-card">
                <Image src="/logos/wipro.svg" alt="Wipro" width={110} height={48} style={{ objectFit: "contain" }} />
              </div>
              <div className="marquee-logo-card">
                <Image src="/logos/infosys.svg" alt="Infosys" width={130} height={48} style={{ objectFit: "contain" }} />
              </div>
              <div className="marquee-logo-card">
                <Image src="/logos/accenture.svg" alt="Accenture" width={140} height={48} style={{ objectFit: "contain" }} />
              </div>
              <div className="marquee-logo-card">
                <Image src="/logos/cognizant.svg" alt="Cognizant" width={140} height={48} style={{ objectFit: "contain" }} />
              </div>
            </div>
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

          <div className="footer-bottom">
            <p>&copy; 2024 Skills Speak. All rights reserved.</p>
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
