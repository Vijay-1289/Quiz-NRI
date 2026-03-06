"use client";

import { useState } from "react";

// ── Layout constants ─────────────────────────────────────────────────────────
const SVG_W = 380;
const STEP_H = 160;
const START_Y = 90;
const NODE_X_L = 70;
const NODE_X_R = 310;
const NODE_R = 32;

// ── Types ────────────────────────────────────────────────────────────────────
type Status = "completed" | "current" | "locked";

interface Blog { title: string; readTime: string; read: boolean; }
interface Chapter {
    id: number; status: Status; title: string; icon: string;
    lessons: number; minutes: number; lessonProgress: number;
    quizScore?: number; description: string; blogs: Blog[];
}

// ── Chapter data ─────────────────────────────────────────────────────────────
const chapters: Chapter[] = [
    {
        id: 1, status: "completed", title: "The Art of Introduction",
        icon: "ph-hand-waving", lessons: 5, minutes: 45, lessonProgress: 100, quizScore: 92,
        description: "Craft a compelling elevator pitch and make a lasting first impression.",
        blogs: [
            { title: "Why Your First 30 Seconds Matter Most", readTime: "4 min", read: true },
            { title: "Crafting the Perfect Elevator Pitch", readTime: "6 min", read: true },
            { title: "Non-Verbal Cues That Build Instant Trust", readTime: "5 min", read: true },
            { title: "Common Introduction Mistakes to Avoid", readTime: "3 min", read: true },
            { title: "Adapting Your Intro for Different Audiences", readTime: "5 min", read: true },
        ],
    },
    {
        id: 2, status: "current", title: "Professional Vocabulary",
        icon: "ph-book-open-text", lessons: 4, minutes: 60, lessonProgress: 25,
        description: "Expand your industry vocabulary and learn to use power words with precision.",
        blogs: [
            { title: "Top 50 Industry Buzzwords That Actually Matter", readTime: "7 min", read: true },
            { title: "Impactful Action Verbs for Every Situation", readTime: "5 min", read: false },
            { title: "Articulation & Clarity: Speak With Confidence", readTime: "6 min", read: false },
            { title: "Vocabulary That Signals Leadership", readTime: "4 min", read: false },
        ],
    },
    {
        id: 3, status: "locked", title: "Handling Tough Questions",
        icon: "ph-lightning", lessons: 6, minutes: 90, lessonProgress: 0,
        description: "Turn curveball questions into your strongest interview moments.",
        blogs: [
            { title: "The STAR Method Explained", readTime: "5 min", read: false },
            { title: "Handling 'Weakness' Questions Gracefully", readTime: "4 min", read: false },
            { title: "What To Do When You Don't Know the Answer", readTime: "3 min", read: false },
            { title: "Salary Expectations — What To Say", readTime: "4 min", read: false },
            { title: "Redirecting Hostile Follow-Up Questions", readTime: "5 min", read: false },
            { title: "Practice Drills: 10 Rapid-Fire Scenarios", readTime: "8 min", read: false },
        ],
    },
    {
        id: 4, status: "locked", title: "Salary Negotiation",
        icon: "ph-currency-dollar", lessons: 5, minutes: 75, lessonProgress: 0,
        description: "Negotiate your worth with data-driven confidence.",
        blogs: [
            { title: "Research Your Market Value", readTime: "6 min", read: false },
            { title: "Scripts That Open the Conversation", readTime: "5 min", read: false },
            { title: "Countering a Low Offer Without Burning Bridges", readTime: "4 min", read: false },
            { title: "When to Walk Away — and When Not To", readTime: "3 min", read: false },
            { title: "Beyond Salary: Negotiate Your Full Package", readTime: "5 min", read: false },
        ],
    },
    {
        id: 5, status: "locked", title: "Storytelling & STAR Method",
        icon: "ph-star", lessons: 6, minutes: 80, lessonProgress: 0,
        description: "Structure compelling answers using the proven STAR framework.",
        blogs: [
            { title: "Why Stories Beat Facts in Every Interview", readTime: "4 min", read: false },
            { title: "Building a STAR Response Step by Step", readTime: "7 min", read: false },
            { title: "Situation & Task: Setting the Scene", readTime: "4 min", read: false },
            { title: "Action: Showing Your Thinking Process", readTime: "5 min", read: false },
            { title: "Result: Quantifying Your Impact", readTime: "4 min", read: false },
            { title: "20 STAR Story Templates You Can Adapt", readTime: "10 min", read: false },
        ],
    },
    {
        id: 6, status: "locked", title: "Non-Verbal Communication",
        icon: "ph-person", lessons: 4, minutes: 55, lessonProgress: 0,
        description: "Command any room through body language and presence.",
        blogs: [
            { title: "The Power of Posture in Interviews", readTime: "4 min", read: false },
            { title: "Eye Contact Rules: Too Little vs Too Much", readTime: "3 min", read: false },
            { title: "Hand Gestures That Signal Confidence", readTime: "4 min", read: false },
            { title: "Managing Nervous Habits on Camera", readTime: "5 min", read: false },
        ],
    },
    {
        id: 7, status: "locked", title: "Email & Written English",
        icon: "ph-envelope-open", lessons: 5, minutes: 60, lessonProgress: 0,
        description: "Write clear, professional emails and documents that get results.",
        blogs: [
            { title: "Subject Lines That Get Opened", readTime: "3 min", read: false },
            { title: "The Perfect Post-Interview Follow-Up Email", readTime: "4 min", read: false },
            { title: "Formal vs Informal: Matching Your Tone", readTime: "4 min", read: false },
            { title: "Grammar Essentials for Professional Writing", readTime: "6 min", read: false },
            { title: "Templates for Every Workplace Situation", readTime: "5 min", read: false },
        ],
    },
    {
        id: 8, status: "locked", title: "Final Mock Interview",
        icon: "ph-trophy", lessons: 3, minutes: 90, lessonProgress: 0,
        description: "Put everything together in a realistic, scored simulation.",
        blogs: [
            { title: "How to Prepare the Night Before", readTime: "3 min", read: false },
            { title: "Full Mock Interview — Transcript & Analysis", readTime: "15 min", read: false },
            { title: "Post-Interview Reflection Checklist", readTime: "4 min", read: false },
        ],
    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function nodePos(i: number) {
    return { x: i % 2 === 0 ? NODE_X_L : NODE_X_R, y: START_Y + i * STEP_H };
}

function buildPath(): string {
    const pts = chapters.map((_, i) => nodePos(i));
    return pts.map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = pts[i - 1];
        const mY = (prev.y + p.y) / 2;
        return `C ${prev.x} ${mY} ${p.x} ${mY} ${p.x} ${p.y}`;
    }).join(" ");
}

const SVG_H = START_Y + (chapters.length - 1) * STEP_H + START_Y;
const PATH_D = buildPath();

const statusColors = {
    completed: { bg: "#22c55e", border: "#16a34a", glow: "rgba(34,197,94,0.3)", text: "white" },
    current: { bg: "#0f172a", border: "#0f172a", glow: "rgba(15,23,42,0.3)", text: "white" },
    locked: { bg: "#f1f5f9", border: "#e2e8f0", glow: "transparent", text: "#94a3b8" },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function MyCourses() {
    const [selected, setSelected] = useState<number>(2); // default: open current chapter

    const completedCount = chapters.filter(c => c.status === "completed").length;
    const currentCh = chapters.find(c => c.status === "current");
    const partialFill = currentCh ? (currentCh.lessonProgress / 100) / chapters.length : 0;
    const fillPercent = (completedCount / chapters.length + partialFill) * 100;
    const overallPct = Math.round((completedCount / chapters.length) * 100);

    const lastPos = nodePos(chapters.length - 1);
    const activeCh = chapters.find(c => c.id === selected);
    const allRead = activeCh?.blogs.every(b => b.read) ?? false;
    const readCount = activeCh?.blogs.filter(b => b.read).length ?? 0;

    return (
        <div className="map-page">

            {/* ── Top header ─────────────────────────────────── */}
            <div className="map-header">
                <div>
                    <h1 className="map-page-title">Mastering Communication</h1>
                    <p className="map-page-sub">Read every article, then take the chapter quiz to unlock the next stop.</p>
                </div>
                <div className="map-progress-pill">
                    <div className="map-progress-pill-inner">
                        <span className="map-progress-stat">
                            {completedCount}<span>/{chapters.length}</span>
                        </span>
                        <span className="map-progress-label">Chapters Done</span>
                    </div>
                    <div className="map-progress-ring"
                        style={{ background: `conic-gradient(#22c55e ${overallPct * 3.6}deg, #e2e8f0 0)` }}>
                        <div className="map-progress-ring-inner">{overallPct}%</div>
                    </div>
                </div>
            </div>

            {/* ── Two-column layout ──────────────────────────── */}
            <div className="map-layout">

                {/* LEFT: Winding path map */}
                <div className="map-col">
                    <div className="map-journey-outer" style={{ height: SVG_H + 60 }}>

                        {/* SVG path */}
                        <svg className="map-svg" width={SVG_W} height={SVG_H}
                            viewBox={`0 0 ${SVG_W} ${SVG_H}`} xmlns="http://www.w3.org/2000/svg">
                            {/* track */}
                            <path d={PATH_D} stroke="#e2e8f0" strokeWidth="4"
                                strokeDasharray="10 7" fill="none" strokeLinecap="round" />
                            {/* progress fill */}
                            <path d={PATH_D} pathLength="100" stroke="#22c55e" strokeWidth="4"
                                fill="none" strokeLinecap="round"
                                strokeDasharray={`${fillPercent} 100`}
                                style={{ transition: "stroke-dasharray 1.2s ease" }} />
                        </svg>

                        {/* START badge */}
                        <div className="map-badge map-badge--start"
                            style={{ top: START_Y - NODE_R - 38, left: NODE_X_L - 24 }}>
                            ▶ START
                        </div>

                        {/* FINISH badge */}
                        <div className="map-badge map-badge--finish"
                            style={{ top: lastPos.y + NODE_R + 10, left: lastPos.x - 34 }}>
                            🏆 FINISH
                        </div>

                        {/* Chapter nodes — clean bubbles, no inline cards */}
                        {chapters.map((ch, i) => {
                            const pos = nodePos(i);
                            const side = i % 2 === 0 ? "left" : "right";
                            const colors = statusColors[ch.status];
                            const isActive = selected === ch.id;

                            // small label on the opposite side of the path curve
                            const labelSide = side === "left" ? "right" : "left";

                            return (
                                <div key={ch.id} className="map-node-wrapper"
                                    style={{
                                        top: pos.y - NODE_R,
                                        left: pos.x - NODE_R,
                                    }}>

                                    {/* Node bubble */}
                                    <button
                                        className={`map-node-v2${ch.status === "locked" ? " locked" : ""}${isActive ? " active" : ""}`}
                                        style={{
                                            backgroundColor: colors.bg,
                                            borderColor: colors.border,
                                            color: colors.text,
                                            boxShadow: isActive
                                                ? `0 0 0 5px ${colors.glow}, 0 6px 20px ${colors.glow}`
                                                : ch.status !== "locked" ? `0 2px 10px ${colors.glow}` : "none",
                                        }}
                                        onClick={() => ch.status !== "locked" && setSelected(ch.id)}
                                        disabled={ch.status === "locked"}
                                    >
                                        {ch.status === "completed" && <i className="ph-bold ph-check" />}
                                        {ch.status === "current" && <i className={`ph-fill ${ch.icon}`} />}
                                        {ch.status === "locked" && <i className="ph-fill ph-lock" style={{ fontSize: 18 }} />}
                                        {ch.status === "current" && <span className="map-node-pulse" />}
                                    </button>

                                    {/* Compact label tag */}
                                    <div className={`map-node-label map-node-label--${labelSide}${isActive ? " map-node-label--active" : ""}${ch.status === "locked" ? " map-node-label--locked" : ""}`}>
                                        <span className="map-node-label-num">Ch {ch.id}</span>
                                        <span className="map-node-label-title">{ch.title}</span>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT: Chapter detail panel */}
                <div className="map-detail-panel">
                    {activeCh ? (
                        <div className="map-detail-inner">

                            {/* Chapter header */}
                            <div className="mdp-header">
                                <div className={`mdp-status-badge mdp-status-badge--${activeCh.status}`}>
                                    {activeCh.status === "completed" ? "✓ Completed" : activeCh.status === "current" ? "▶ In Progress" : "🔒 Locked"}
                                </div>
                                <div className="mdp-chapter-num">Chapter {activeCh.id}</div>
                                <h2 className="mdp-title">{activeCh.title}</h2>
                                <p className="mdp-desc">{activeCh.description}</p>
                                <div className="mdp-meta">
                                    <span><i className="ph ph-book-open" /> {activeCh.lessons} lessons</span>
                                    <span><i className="ph ph-clock" /> {activeCh.minutes} min</span>
                                    {activeCh.status === "current" && (
                                        <span><i className="ph ph-article" /> {readCount}/{activeCh.blogs.length} read</span>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar (current chapter) */}
                            {activeCh.status === "current" && (
                                <div className="mdp-progress-bar-wrap">
                                    <div className="mdp-progress-bar">
                                        <div className="mdp-progress-fill"
                                            style={{ width: `${(readCount / activeCh.blogs.length) * 100}%` }} />
                                    </div>
                                    <span className="mdp-progress-label">
                                        {Math.round((readCount / activeCh.blogs.length) * 100)}% articles read
                                    </span>
                                </div>
                            )}

                            {/* Blog list */}
                            <div className="mdp-section-label">
                                <i className="ph-fill ph-article" /> Articles in this chapter
                            </div>
                            <div className="mdp-blog-list">
                                {activeCh.blogs.map((blog, bi) => (
                                    <div key={bi} className={`mdp-blog-item${blog.read ? " mdp-blog-item--read" : ""}`}>
                                        <div className="mdp-blog-left">
                                            {blog.read
                                                ? <i className="ph-fill ph-check-circle mdp-icon-done" />
                                                : <i className="ph ph-circle mdp-icon-unread" />
                                            }
                                            <span className="mdp-blog-title">{blog.title}</span>
                                        </div>
                                        <span className="mdp-blog-time">{blog.readTime}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quiz CTA */}
                            <div className="mdp-quiz-cta">
                                {activeCh.status === "completed" && (
                                    <div className="mdp-quiz-row">
                                        <div className="mdp-quiz-score">
                                            <i className="ph-fill ph-trophy" style={{ color: "#f59e0b" }} />
                                            Quiz Score: <strong>{activeCh.quizScore}%</strong>
                                        </div>
                                        <button className="btn-mdp-primary">Retake Quiz</button>
                                    </div>
                                )}
                                {activeCh.status === "current" && (
                                    <button
                                        className={`btn-mdp-quiz-full${!allRead ? " btn-mdp-quiz-locked" : ""}`}
                                        disabled={!allRead}
                                    >
                                        {allRead
                                            ? <><i className="ph-fill ph-clipboard-text" /> Start Chapter Quiz</>
                                            : <><i className="ph-fill ph-lock" /> Read all articles to unlock quiz</>
                                        }
                                    </button>
                                )}
                                {activeCh.status === "locked" && (
                                    <div className="mdp-locked-msg">
                                        <i className="ph-fill ph-lock" />
                                        Complete the previous chapter to unlock this content.
                                    </div>
                                )}
                            </div>

                        </div>
                    ) : (
                        <div className="mdp-empty">
                            <i className="ph-fill ph-map-pin" style={{ fontSize: 40, color: "#cbd5e1" }} />
                            <p>Select a chapter on the map to see its details.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
