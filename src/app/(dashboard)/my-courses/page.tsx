"use client";

import { useState } from "react";

// ── Placeholder data — swap with real API data later ──────────────────────────
const journey = {
    title: "Mastering Communication",
    subtitle: "A comprehensive learning journey",
    totalChapters: 8,
    completedChapters: 0,
    progressPercent: 0,
    chapters: [
        {
            id: 1,
            status: "completed" as const,   // "completed" | "current" | "locked"
            title: "The Art of Introduction",
            icon: "ph-hand-waving",
            lessons: 5,
            minutes: 45,
            quizScore: 100,
            description: "Craft a compelling elevator pitch and master first impressions.",
        },
        {
            id: 2,
            status: "current" as const,
            title: "Professional Vocabulary",
            icon: "ph-book-open-text",
            lessons: 4,
            minutes: 60,
            description: "Expand your industry-specific vocabulary and use power words.",
        },
        {
            id: 3,
            status: "locked" as const,
            title: "Handling Tough Questions",
            icon: "ph-lightning",
            lessons: 6,
            minutes: 90,
            description: "Turn curveball interview questions into your strongest moments.",
        },
        {
            id: 4,
            status: "locked" as const,
            title: "Salary Negotiation",
            icon: "ph-currency-dollar",
            lessons: 5,
            minutes: 75,
            description: "Negotiate your worth with confidence and data-driven tactics.",
        },
        {
            id: 5,
            status: "locked" as const,
            title: "Storytelling & STAR Method",
            icon: "ph-star",
            lessons: 6,
            minutes: 80,
            description: "Structure your answers using the proven STAR framework.",
        },
        {
            id: 6,
            status: "locked" as const,
            title: "Non-Verbal Communication",
            icon: "ph-person-simple-walk",
            lessons: 4,
            minutes: 55,
            description: "Command any room through body language and eye contact.",
        },
        {
            id: 7,
            status: "locked" as const,
            title: "Email & Written English",
            icon: "ph-envelope-open",
            lessons: 5,
            minutes: 60,
            description: "Write professional emails and reports that get results.",
        },
        {
            id: 8,
            status: "locked" as const,
            title: "Final Mock Interview",
            icon: "ph-trophy",
            lessons: 3,
            minutes: 90,
            description: "Put it all together in a realistic, scored simulation.",
        },
    ],
};
// ──────────────────────────────────────────────────────────────────────────────

const statusColors = {
    completed: { bg: "#22c55e", text: "white", border: "#16a34a", glow: "rgba(34,197,94,0.35)" },
    current: { bg: "#0f172a", text: "white", border: "#0f172a", glow: "rgba(15,23,42,0.35)" },
    locked: { bg: "#f1f5f9", text: "#94a3b8", border: "#e2e8f0", glow: "transparent" },
};

// Curved bezier connector SVG between two alternating nodes
function Connector({ fromRight, isDone }: { fromRight: boolean; isDone: boolean }) {
    const color = isDone ? "#22c55e" : "#e2e8f0";
    // fromRight: the previous node was on the right, so curve goes left→right
    return (
        <div className="map-connector">
            <svg viewBox="0 0 200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d={fromRight
                        ? "M 170 0 C 170 80, 30 0, 30 80"
                        : "M 30 0 C 30 80, 170 0, 170 80"}
                    stroke={color}
                    strokeWidth="4"
                    strokeDasharray={isDone ? "0" : "8 6"}
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

export default function MyCourses() {
    const [activeChapter, setActiveChapter] = useState<number | null>(null);

    const toggleChapter = (id: number, status: string) => {
        if (status === "locked") return;
        setActiveChapter(prev => prev === id ? null : id);
    };

    return (
        <div className="map-page">
            {/* Top header */}
            <div className="map-header">
                <div>
                    <h1 className="map-page-title">{journey.title}</h1>
                    <p className="map-page-sub">{journey.subtitle}</p>
                </div>
                <div className="map-progress-pill">
                    <div className="map-progress-pill-inner">
                        <span className="map-progress-stat">{journey.completedChapters}<span>/{journey.totalChapters}</span></span>
                        <span className="map-progress-label">Chapters</span>
                    </div>
                    <div className="map-progress-ring" style={{ background: `conic-gradient(#22c55e ${journey.progressPercent * 3.6}deg, #e2e8f0 0)` }}>
                        <div className="map-progress-ring-inner">{journey.progressPercent}%</div>
                    </div>
                </div>
            </div>

            {/* Journey Map */}
            <div className="map-journey">
                {/* START flag */}
                <div className="map-flag map-flag--start">
                    <div className="map-flag-pole">
                        <div className="map-flag-banner">START</div>
                    </div>
                    <div className="map-flag-base"></div>
                </div>

                {/* Chapter stops */}
                {journey.chapters.map((chapter, index) => {
                    const side = index % 2 === 0 ? "left" : "right";
                    const colors = statusColors[chapter.status];
                    const isActive = activeChapter === chapter.id;
                    const prevIsDone = index > 0 && journey.chapters[index - 1].status === "completed";

                    return (
                        <div key={chapter.id} className="map-stop-wrapper">
                            {/* Curved connector from previous stop */}
                            {index > 0 && (
                                <Connector fromRight={index % 2 === 1} isDone={prevIsDone} />
                            )}

                            {/* Chapter stop row */}
                            <div className={`map-stop-row map-stop-row--${side}`}>
                                {/* Chapter node bubble */}
                                <button
                                    className={`map-node ${chapter.status === "locked" ? "map-node--locked" : ""} ${isActive ? "map-node--active" : ""}`}
                                    style={{
                                        backgroundColor: colors.bg,
                                        color: colors.text,
                                        borderColor: colors.border,
                                        boxShadow: isActive || chapter.status === "current"
                                            ? `0 0 0 6px ${colors.glow}, 0 8px 24px ${colors.glow}`
                                            : `0 4px 12px ${colors.glow}`,
                                    }}
                                    onClick={() => toggleChapter(chapter.id, chapter.status)}
                                    disabled={chapter.status === "locked"}
                                    title={chapter.status === "locked" ? "Complete previous chapter to unlock" : chapter.title}
                                >
                                    {chapter.status === "completed" && <i className="ph-bold ph-check" style={{ fontSize: "28px" }}></i>}
                                    {chapter.status === "current" && <i className={`ph-fill ${chapter.icon}`} style={{ fontSize: "28px" }}></i>}
                                    {chapter.status === "locked" && <i className="ph-fill ph-lock" style={{ fontSize: "24px" }}></i>}

                                    {/* Pulse animation for current */}
                                    {chapter.status === "current" && <span className="map-node-pulse"></span>}
                                </button>

                                {/* Info card */}
                                <div className={`map-stop-card map-stop-card--${chapter.status} ${isActive ? "map-stop-card--open" : ""}`}>
                                    <div className="map-stop-num">Chapter {chapter.id}</div>
                                    <div className="map-stop-title">{chapter.title}</div>
                                    {chapter.status !== "locked" && (
                                        <div className="map-stop-meta">
                                            <i className="ph ph-book-open"></i> {chapter.lessons} lessons
                                            <span className="map-dot">·</span>
                                            <i className="ph ph-clock"></i> {chapter.minutes}m
                                        </div>
                                    )}

                                    {/* Expanded details */}
                                    {isActive && (
                                        <div className="map-stop-detail">
                                            <p>{chapter.description}</p>
                                            {chapter.status === "completed" && (
                                                <div className="map-stop-actions">
                                                    <button className="btn-map-secondary">Review</button>
                                                    {chapter.quizScore !== undefined && (
                                                        <span className="map-quiz-badge">Quiz: {chapter.quizScore}%</span>
                                                    )}
                                                </div>
                                            )}
                                            {chapter.status === "current" && (
                                                <div className="map-stop-actions">
                                                    <button className="btn-map-primary">Continue →</button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* FINISH flag */}
                <div className="map-connector">
                    <svg viewBox="0 0 200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 170 0 C 170 80, 100 40, 100 80" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="8 6" fill="none" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="map-flag map-flag--finish">
                    <div className="map-flag-pole">
                        <div className="map-flag-banner map-flag-banner--finish">FINISH 🏆</div>
                    </div>
                    <div className="map-flag-base"></div>
                </div>
            </div>
        </div>
    );
}
