"use client";

import React, { useState } from "react";
import Link from "next/link";


// ── Layout constants ─────────────────────────────────────────────────────────
const SVG_W = 380;
const STEP_H = 160;
const START_Y = 90;
const NODE_X_L = 70;
const NODE_X_R = 310;
const NODE_R = 32;

// ── Types ────────────────────────────────────────────────────────────────────
type Status = "completed" | "current" | "locked";

interface Blog { id: number; title: string; readTime: string; read: boolean; quizPassed?: boolean; }
interface Chapter {
    id: number; status: Status; title: string; icon: string;
    lessons: number; minutes: number; lessonProgress: number;
    quizScore?: number; description: string; articles: Blog[];
}

// ── Chapter data ─────────────────────────────────────────────────────────────
const chapters: Chapter[] = [
    {
        id: 1, status: "current", title: "Grammar",
        icon: "ph-text-aa", lessons: 9, minutes: 120, lessonProgress: 0,
        description: "Master the fundamental rules of English grammar.",
        articles: [
            { id: 1, title: "Subject and Verb Agreement- Rules", readTime: "5 min", read: false },
            { id: 2, title: "Tenses", readTime: "8 min", read: false },
            { id: 3, title: "Articles", readTime: "4 min", read: false },
            { id: 4, title: "Verb Forms", readTime: "5 min", read: false },
            { id: 5, title: "If- Conditionals", readTime: "6 min", read: false },
            { id: 6, title: "Question Tags", readTime: "3 min", read: false },
            { id: 7, title: "Prepositions & Conjunctions", readTime: "7 min", read: false },
            { id: 8, title: "Grammar Rules", readTime: "6 min", read: false },
            { id: 9, title: "Error Identification", readTime: "8 min", read: false },
        ],
    },
    {
        id: 2, status: "locked", title: "Communication",
        icon: "ph-chat-circle-text", lessons: 6, minutes: 90, lessonProgress: 0,
        description: "Enhance your reading comprehension and analytical skills.",
        articles: [
            { id: 1, title: "Reading Comprehension", readTime: "10 min", read: false },
            { id: 2, title: "Passage Ordering", readTime: "8 min", read: false },
            { id: 3, title: "Sentence Ordering", readTime: "7 min", read: false },
            { id: 4, title: "Critical Reasoning", readTime: "9 min", read: false },
            { id: 5, title: "Phrasal Verbs", readTime: "6 min", read: false },
            { id: 6, title: "Idiomatic Expressions", readTime: "5 min", read: false },
        ],
    },
    {
        id: 3, status: "locked", title: "Vocabulary",
        icon: "ph-book-open-text", lessons: 6, minutes: 60, lessonProgress: 0,
        description: "Expand your vocabulary with essential words, prefixes, and suffixes.",
        articles: [
            { id: 1, title: "Synonyms", readTime: "5 min", read: false },
            { id: 2, title: "Antonyms", readTime: "5 min", read: false },
            { id: 3, title: "Prefixes-Suffixes", readTime: "6 min", read: false },
            { id: 4, title: "Root words", readTime: "7 min", read: false },
            { id: 5, title: "Analogies", readTime: "6 min", read: false },
            { id: 6, title: "Spellings", readTime: "4 min", read: false },
        ],
    },
    {
        id: 4, status: "locked", title: "Written",
        icon: "ph-pencil-simple-line", lessons: 4, minutes: 80, lessonProgress: 0,
        description: "Develop strong writing skills for academic and professional contexts.",
        articles: [
            { id: 1, title: "Essay Writing", readTime: "10 min", read: false },
            { id: 2, title: "Letter Writing", readTime: "8 min", read: false },
            { id: 3, title: "Memo Writing", readTime: "6 min", read: false },
            { id: 4, title: "Resume Writing", readTime: "10 min", read: false },
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
    const [selected, setSelected] = useState<number | null>(null); // default: null so no chapter is selected initially
    const [courseData, setCourseData] = useState<Chapter[]>(chapters);

    // Hydrate read progress from localStorage
    React.useEffect(() => {
        setCourseData(prev => prev.map(ch => ({
            ...ch,
            articles: ch.articles.map(a => ({
                ...a,
                read: localStorage.getItem(`read_${ch.id}_${a.id}`) === "true" || a.read,
                quizPassed: localStorage.getItem(`quizPassed_${ch.id}_${a.id}`) === "true" || a.quizPassed
            }))
        })));
    }, []);

    const completedCount = courseData.filter(c => c.status === "completed").length;
    const currentCh = courseData.find(c => c.status === "current");
    const partialFill = currentCh ? (currentCh.lessonProgress / 100) / courseData.length : 0;
    const fillPercent = (completedCount / courseData.length + partialFill) * 100;
    const overallPct = Math.round((completedCount / courseData.length) * 100);

    const lastPos = nodePos(courseData.length - 1);
    const activeCh = courseData.find(c => c.id === selected);
    const allRead = activeCh?.articles.every(b => b.read) ?? false;
    const readCount = activeCh?.articles.filter(b => b.read).length ?? 0;
    const passedCount = activeCh?.articles.filter(b => b.quizPassed).length ?? 0;

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
                        {courseData.map((ch, i) => {
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
                                        <span><i className="ph ph-article" /> {readCount}/{activeCh.articles.length} read</span>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar (current chapter) */}
                            {activeCh.status === "current" && (
                                <div className="mdp-progress-bar-wrap">
                                    <div className="mdp-progress-bar">
                                        <div className="mdp-progress-fill"
                                            style={{ width: `${((readCount + passedCount) / (activeCh.articles.length * 2)) * 100}%` }} />
                                    </div>
                                    <span className="mdp-progress-label">
                                        {readCount}/{activeCh.articles.length} read · {passedCount}/{activeCh.articles.length} quizzes passed
                                    </span>
                                </div>
                            )}

                            {/* Blog list */}
                            <div className="mdp-section-label">
                                <i className="ph-fill ph-article" /> Articles in this chapter
                            </div>
                            <div className="mdp-blog-list">
                                {activeCh.articles.map((article, bi) => (
                                    <div key={article.id} className="mdp-blog-item-wrap">
                                        <Link
                                            href={`/my-courses/blog/${activeCh.id}/${article.id}`}
                                            className="mdp-blog-item"
                                        >
                                            <div className="mdp-blog-left">
                                                <i className={article.read ? "ph-fill ph-check-circle mdp-icon-read" : "ph ph-circle mdp-icon-unread"} style={{ color: article.read ? "#22c55e" : "inherit" }} />
                                                <span className="mdp-blog-title">{article.title}</span>
                                                {article.quizPassed && <i className="ph-fill ph-seal-check" style={{ color: "#3b82f6", marginLeft: 8, fontSize: 16 }} title="Quiz Passed" />}
                                            </div>
                                            <span className="mdp-blog-time">{article.readTime} <i className="ph ph-arrow-right" style={{ fontSize: 11 }} /></span>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Locked CTA */}
                            <div className="mdp-quiz-cta">
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
