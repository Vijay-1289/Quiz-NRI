import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const firstName = session?.user?.name ? session.user.name.split(" ")[0] : "User";

    return (
        <>
            <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome, {firstName}! 👋</h1>
                <p className="dashboard-subtitle">Start learning to grow your professional English skills.</p>
            </div>

            <div className="dashboard-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                    {/* Getting Started Card */}
                    <div className="card milestone-card">
                        <div className="progress-circle" style={{ '--progress': '0%' } as React.CSSProperties}>
                            <div className="progress-inner">
                                <span className="progress-value">–</span>
                                <span className="progress-label">OVERALL</span>
                            </div>
                        </div>
                        <div className="milestone-content">
                            <h3>Get Started</h3>
                            <p>
                                You haven&apos;t started any courses yet. Pick a track below and begin your professional English journey today.
                            </p>
                            <button className="btn btn-dark">Browse Courses</button>
                        </div>
                    </div>

                    {/* Learning Tracks */}
                    <div>
                        <h3 className="section-title">
                            <div className="section-icon">
                                <i className="ph-bold ph-chart-bar"></i>
                            </div>
                            Available Learning Tracks
                        </h3>
                        <div className="tracks-grid">
                            <div className="card track-card">
                                <div className="track-icon blue">
                                    <i className="ph-fill ph-user"></i>
                                </div>
                                <h4>Self-Introduction Mastery</h4>
                                <div className="track-meta">Not started</div>
                                <div className="track-progress-bar">
                                    <div className="track-progress-fill blue" style={{ width: "0%" }}></div>
                                </div>
                                <div className="track-progress-text blue">0%</div>
                            </div>

                            <div className="card track-card">
                                <div className="track-icon purple">
                                    <i className="ph-fill ph-text-aa"></i>
                                </div>
                                <h4>Grammar Fundamentals</h4>
                                <div className="track-meta">Not started</div>
                                <div className="track-progress-bar">
                                    <div className="track-progress-fill purple" style={{ width: "0%" }}></div>
                                </div>
                                <div className="track-progress-text purple">0%</div>
                            </div>

                            <div className="card track-card">
                                <div className="track-icon green">
                                    <i className="ph-fill ph-buildings"></i>
                                </div>
                                <h4>MNC Mock Tests</h4>
                                <div className="track-meta">Not started</div>
                                <div className="track-progress-bar">
                                    <div className="track-progress-fill green" style={{ width: "0%" }}></div>
                                </div>
                                <div className="track-progress-text green">0%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Sidebar */}
                <div className="card recent-activity-card">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-details">
                                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                                    No activity yet. Complete a lesson or mock test to see your history here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
