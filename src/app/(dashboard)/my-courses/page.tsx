"use client";

import { useState } from "react";

// ── Layout constants — these define the SVG grid ──────────────────────────────
const SVG_W = 700;
const STEP_H = 190;   // vertical distance between node centres
const START_Y = 100;   // Y of first node centre
const NODE_X_L = 120;   // X of left-side node centres
const NODE_X_R = 580;   // X of right-side node centres
const NODE_R = 36;    // node radius (= half of 72px diameter)

// ── Chapter data — replace with real API data later ───────────────────────────
type Status = "completed" | "current" | "locked";
interface Chapter {
    id: number; status: Status; title: string; icon: string;
    lessons: number; minutes: number; lessonProgress: number;
    quizScore?: number; description: string;
}

const chapters: Chapter[] = [
    { id: 1, status: "completed", title: "The Art of Introduction", icon: "ph-hand-waving", lessons: 5, minutes: 45, lessonProgress: 100, quizScore: 100, description: "Craft a compelling elevator pitch and master first impressions." },
    { id: 2, status: "current", title: "Professional Vocabulary", icon: "ph-book-open-text", lessons: 4, minutes: 60, lessonProgress: 25, description: "Expand your industry-specific vocabulary and use power words." },
    { id: 3, status: "locked", title: "Handling Tough Questions", icon: "ph-lightning", lessons: 6, minutes: 90, lessonProgress: 0, description: "Turn curveball interview questions into your strongest moments." },
    { id: 4, status: "locked", title: "Salary Negotiation", icon: "ph-currency-dollar", lessons: 5, minutes: 75, lessonProgress: 0, description: "Negotiate your worth with confidence and data-driven tactics." },
    { id: 5, status: "locked", title: "Storytelling & STAR Method", icon: "ph-star", lessons: 6, minutes: 80, lessonProgress: 0, description: "Structure your answers using the proven STAR framework." },
    { id: 6, status: "locked", title: "Non-Verbal Communication", icon: "ph-person", lessons: 4, minutes: 55, lessonProgress: 0, description: "Command any room through body language and eye contact." },
    { id: 7, status: "locked", title: "Email & Written English", icon: "ph-envelope-open", lessons: 5, minutes: 60, lessonProgress: 0, description: "Write clear, professional emails and reports." },
    { id: 8, status: "locked", title: "Final Mock Interview", icon: "ph-trophy", lessons: 3, minutes: 90, lessonProgress: 0, description: "Put it all together in a realistic, scored simulation." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function nodePos(i: number) {
    return { x: i % 2 === 0 ? NODE_X_L : NODE_X_R, y: START_Y + i * STEP_H };
}

/** Build one continuous cubic-bezier path through every node centre */
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

// ── Component ─────────────────────────────────────────────────────────────────
export default function MyCourses() {
    const [active, setActive] = useState<number | null>(null);

    const completedCount = chapters.filter(c => c.status === "completed").length;
    const currentCh = chapters.find(c => c.status === "current");
    const partialFill = currentCh ? (currentCh.lessonProgress / 100) / chapters.length : 0;
    const fillPercent = (completedCount / chapters.length + partialFill) * 100;
    const overallPct = Math.round((completedCount / chapters.length) * 100);

    const lastPos = nodePos(chapters.length - 1);

    return (
        <div className="map-page">

            {/* ── Header ── */}
            <div className="map-header">
                <div>
                    <h1 className="map-page-title">Mastering Communication</h1>
                    <p className="map-page-sub">A comprehensive learning journey</p>
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

            {/* ── Journey Map ── */}
            <div className="map-journey-outer" style={{ height: SVG_H + 60 }}>

                {/* One SVG, absolutely positioned, draws the full winding path */}
                <svg className="map-svg" width={SVG_W} height={SVG_H}
                    viewBox={`0 0 ${SVG_W} ${SVG_H}`} xmlns="http://www.w3.org/2000/svg">
                    {/* track — full grey dashed */}
                    <path d={PATH_D} stroke="#dde3ec" strokeWidth="6"
                        strokeDasharray="12 8" fill="none" strokeLinecap="round" />
                    {/* progress — green solid, driven by fillPercent */}
                    <path d={PATH_D} pathLength="100" stroke="#22c55e" strokeWidth="6"
                        fill="none" strokeLinecap="round"
                        strokeDasharray={`${fillPercent} 100`}
                        style={{ transition: "stroke-dasharray 1.2s ease" }} />
                </svg>

                {/* START badge — anchored to first node */}
                <div className="map-badge map-badge--start"
                    style={{ top: START_Y - NODE_R - 46, left: NODE_X_L - 28 }}>
                    ▶&nbsp;START
                </div>

                {/* FINISH badge — anchored to last node */}
                <div className="map-badge map-badge--finish"
                    style={{ top: lastPos.y + NODE_R + 10, left: lastPos.x - 40 }}>
                    🏆&nbsp;FINISH
                </div>

                {/* Chapter stops — node button + info card, precisely centred on path */}
                {chapters.map((ch, i) => {
                    const pos = nodePos(i);
                    const side = i % 2 === 0 ? "left" : "right";
                    const isOpen = active === ch.id;

                    const nodeBg = ch.status === "completed" ? "#22c55e" : ch.status === "current" ? "#0f172a" : "#f1f5f9";
                    const nodeBorder = ch.status === "completed" ? "#16a34a" : ch.status === "current" ? "#0f172a" : "#e2e8f0";
                    const nodeColor = ch.status === "locked" ? "#94a3b8" : "white";
                    const glowColor = ch.status === "completed" ? "rgba(34,197,94,0.35)" : ch.status === "current" ? "rgba(15,23,42,0.35)" : "transparent";

                    // Place the stop so the button centre == node SVG coordinate
                    const stopStyle: React.CSSProperties =
                        side === "left"
                            ? { top: pos.y - NODE_R, left: pos.x - NODE_R }
                            : { top: pos.y - NODE_R, right: SVG_W - pos.x - NODE_R };

                    return (
                        <div key={ch.id} className={`map-stop map-stop--${side}`} style={stopStyle}>

                            {/* Node button */}
                            <button
                                className={`map-node${ch.status === "locked" ? " map-node--locked" : ""}${isOpen ? " map-node--active" : ""}`}
                                style={{
                                    backgroundColor: nodeBg,
                                    borderColor: nodeBorder,
                                    color: nodeColor,
                                    boxShadow: ch.status !== "locked"
                                        ? `0 0 0 ${isOpen ? "8px" : "4px"} ${glowColor}`
                                        : "none",
                                }}
                                onClick={() => ch.status !== "locked" && setActive(p => p === ch.id ? null : ch.id)}
                                disabled={ch.status === "locked"}
                            >
                                {ch.status === "completed" && <i className="ph-bold ph-check" style={{ fontSize: 26 }} />}
                                {ch.status === "current" && <i className={`ph-fill ${ch.icon}`} style={{ fontSize: 26 }} />}
                                {ch.status === "locked" && <i className="ph-fill ph-lock" style={{ fontSize: 22 }} />}
                                {ch.status === "current" && <span className="map-node-pulse" />}
                            </button>

                            {/* Info card */}
                            <div className={`map-info-card map-info-card--${ch.status}${isOpen ? " map-info-card--open" : ""}`}>
                                <div className="map-stop-num">CHAPTER {ch.id}</div>
                                <div className="map-stop-title">{ch.title}</div>
                                {ch.status !== "locked" && (
                                    <div className="map-stop-meta">
                                        <i className="ph ph-book-open" /> {ch.lessons} lessons
                                        <span className="map-dot"> · </span>
                                        <i className="ph ph-clock" /> {ch.minutes}m
                                    </div>
                                )}
                                {isOpen && (
                                    <div className="map-stop-detail">
                                        <p>{ch.description}</p>
                                        <div className="map-stop-actions">
                                            {ch.status === "completed" && <>
                                                <button className="btn-map-secondary">Review</button>
                                                {ch.quizScore != null && <span className="map-quiz-badge">Quiz {ch.quizScore}%</span>}
                                            </>}
                                            {ch.status === "current" && (
                                                <button className="btn-map-primary">Continue →</button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
