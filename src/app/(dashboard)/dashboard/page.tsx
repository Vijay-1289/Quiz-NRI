import Link from "next/link";

export default function Dashboard() {
    return (
        <>
            <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome back, Alex! 👋</h1>
                <p className="dashboard-subtitle">You're making great progress. 12 out of 18 modules completed.</p>
            </div>

            <div className="dashboard-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                    {/* Learning Milestone Card */}
                    <div className="card milestone-card">
                        <div className="progress-circle">
                            <div className="progress-inner">
                                <span className="progress-value">65%</span>
                                <span className="progress-label">OVERALL</span>
                            </div>
                        </div>
                        <div className="milestone-content">
                            <h3>Learning Milestone</h3>
                            <p>
                                You've mastered the basics of Professional Introductions and Tenses. Next goal: "Handling
                                Behavioral Questions" in the MNC Track.
                            </p>
                            <button className="btn btn-dark">Continue Learning</button>
                        </div>
                    </div>

                    {/* Learning Tracks */}
                    <div>
                        <h3 className="section-title">
                            <div className="section-icon">
                                <i className="ph-bold ph-chart-bar"></i>
                            </div>
                            Your Learning Tracks
                        </h3>
                        <div className="tracks-grid">
                            <div className="card track-card">
                                <div className="track-icon blue">
                                    <i className="ph-fill ph-user"></i>
                                </div>
                                <h4>Self-Introduction Mastery</h4>
                                <div className="track-meta">8/10 Lessons</div>
                                <div className="track-progress-bar">
                                    <div className="track-progress-fill blue"></div>
                                </div>
                                <div className="track-progress-text blue">80%</div>
                            </div>

                            <div className="card track-card">
                                <div className="track-icon purple">
                                    <i className="ph-fill ph-text-aa"></i>
                                </div>
                                <h4>Grammar Fundamentals</h4>
                                <div className="track-meta">15/30 Lessons</div>
                                <div className="track-progress-bar">
                                    <div className="track-progress-fill purple"></div>
                                </div>
                                <div className="track-progress-text purple">50%</div>
                            </div>

                            <div className="card track-card">
                                <div className="track-icon green">
                                    <i className="ph-fill ph-buildings"></i>
                                </div>
                                <h4>MNC Mock Tests</h4>
                                <div className="track-meta">2/10 Tests</div>
                                <div className="track-progress-bar">
                                    <div className="track-progress-fill green"></div>
                                </div>
                                <div className="track-progress-text green">20%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Sidebar */}
                <div className="card recent-activity-card">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-dot"></div>
                            <div className="activity-details">
                                <h4>Completed "Mock Interview #3"</h4>
                                <div className="activity-time">2 hours ago</div>
                                <span className="activity-score">Score: 8.5/10</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-dot"></div>
                            <div className="activity-details">
                                <h4>Started "Conditionals" lesson</h4>
                                <div className="activity-time">Yesterday</div>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-dot"></div>
                            <div className="activity-details">
                                <h4>Earned "Vocabulary Master" badge</h4>
                                <div className="activity-time">3 days ago</div>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-dot"></div>
                            <div className="activity-details">
                                <h4>Unlocked "Google Mock Prep"</h4>
                                <div className="activity-time">Oct 24, 2023</div>
                            </div>
                        </div>
                    </div>
                    <Link href="#" className="view-all-link">View all history</Link>
                </div>
            </div>

            {/* Premium Banner */}
            <div className="premium-banner">
                <div className="premium-bg-pattern"></div>
                <div className="circle-bg-large"></div>
                <div className="audio-bars">
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                </div>

                <div className="premium-content">
                    <span className="premium-badge">Premium Feature</span>
                    <h2>Practice with AI Coach</h2>
                    <p>
                        Get real-time feedback on your pronunciation and body language using
                        our new AI-powered mock interview simulator.
                    </p>
                    <button className="btn btn-white btn-lg" style={{ color: "var(--primary-dark)" }}>Start Session</button>
                </div>
            </div>
        </>
    );
}
