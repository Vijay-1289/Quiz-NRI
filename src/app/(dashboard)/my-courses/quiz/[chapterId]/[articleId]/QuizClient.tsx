"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChapterData, BlogArticle, QuizQuestion, shuffleArray } from "@/lib/courseData";

interface Props {
    chapter: ChapterData;
    article: BlogArticle;
}

export default function QuizClient({ chapter, article }: Props) {
    const total = article.quiz.length;
    const articleIndex = chapter.articles.findIndex(a => a.id === article.id);
    const nextArticle = articleIndex >= 0 && articleIndex < chapter.articles.length - 1 ? chapter.articles[articleIndex + 1] : null;
    const isLastChapter = chapter.id === 4;

    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));
    const [flagged, setFlagged] = useState<boolean[]>(Array(total).fill(false));
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(total * 90);

    useEffect(() => {
        // Shuffle questions only once on mount to avoid hydration mismatch
        setQuestions(shuffleArray(article.quiz));
    }, [article.quiz]);

    useEffect(() => {
        if (submitted) return;
        const t = setInterval(() => setTimeLeft(s => (s <= 1 ? 0 : s - 1)), 1000);
        return () => clearInterval(t);
    }, [submitted]);

    useEffect(() => {
        if (submitted) {
            const scoreVal = answers.reduce((acc: number, a, i) => (a === questions[i].correct ? acc + 1 : acc), 0);
            const pct = Math.round((scoreVal / total) * 100);
            if (pct >= 70) {
                localStorage.setItem(`quizPassed_${chapter.id}_${article.id}`, "true");
            }
        }
    }, [submitted, answers, questions, total, chapter.id, article.id]);

    const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const ss = String(timeLeft % 60).padStart(2, "0");
    const q = questions[current];
    const progress = (current / total) * 100;
    const answered = answers.filter(a => a !== null).length;
    const score: number = submitted
        ? answers.reduce((acc: number, a, i) => (a === questions[i].correct ? acc + 1 : acc), 0)
        : 0;

    function pickOption(idx: number) {
        if (submitted) return;
        setSelected(idx);
        const next = [...answers];
        next[current] = idx;
        setAnswers(next);
    }

    function goTo(idx: number) {
        setCurrent(idx);
        setSelected(answers[idx]);
    }

    function toggleFlag() {
        const f = [...flagged];
        f[current] = !f[current];
        setFlagged(f);
    }

    function reset() {
        setSubmitted(false);
        setAnswers(Array(total).fill(null));
        setSelected(null);
        setCurrent(0);
        setTimeLeft(total * 90);
        setFlagged(Array(total).fill(false));
        setQuestions(shuffleArray(article.quiz)); // re-shuffle on retake
    }

    // Wait for client-side shuffle before rendering main UI
    if (questions.length === 0) return <div style={{ padding: 40 }}>Loading quiz...</div>;

    // ── Results ───────────────────────────────────────────────────────────────
    if (submitted) {
        const pct = Math.round((score / total) * 100);
        const pass = pct >= 70;

        const medal = pct >= 90 ? "🥇" : pct >= 70 ? "🥈" : "🥉";
        const headline = pct >= 90 ? "Outstanding! " + medal
            : pct >= 70 ? "Well done! " + medal
                : "Keep practising! 💪";

        return (
            <div className="qr-page">

                {/* ── Hero banner ── */}
                <div className={`qr-hero ${pass ? "qr-hero--pass" : "qr-hero--fail"}`}>
                    {/* Decorative blobs */}
                    <div className="qr-blob qr-blob-1" />
                    <div className="qr-blob qr-blob-2" />

                    <div className="qr-hero-inner">
                        {/* Score ring */}
                        <div className="qr-ring-wrap">
                            <svg className="qr-ring-svg" viewBox="0 0 140 140">
                                <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="12" />
                                <circle cx="70" cy="70" r="58" fill="none"
                                    stroke="white"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(pct / 100) * 364.4} 364.4`}
                                    strokeDashoffset="91.1"
                                    style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
                                />
                            </svg>
                            <div className="qr-ring-center">
                                <span className="qr-ring-pct">{pct}<span className="qr-ring-sym">%</span></span>
                                <span className="qr-ring-sub">Score</span>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="qr-hero-text">
                            <p className="qr-chapter-label">{chapter.title} · {article.title}</p>
                            <h1 className="qr-headline">{headline}</h1>
                            <p className="qr-hero-sub">
                                {pass
                                    ? "Great effort — your score qualifies you to advance to the next chapter."
                                    : "Review the explanations below and retake any time — you've got this!"}
                            </p>

                            {/* Stat pills */}
                            <div className="qr-stat-row">
                                <div className="qr-stat-pill qr-stat-pill--green">
                                    <i className="ph-fill ph-check-circle" />
                                    <div>
                                        <span className="qrsp-val">{score}</span>
                                        <span className="qrsp-label">Correct</span>
                                    </div>
                                </div>
                                <div className="qr-stat-pill qr-stat-pill--red">
                                    <i className="ph-fill ph-x-circle" />
                                    <div>
                                        <span className="qrsp-val">{total - score}</span>
                                        <span className="qrsp-label">Wrong</span>
                                    </div>
                                </div>
                                <div className="qr-stat-pill qr-stat-pill--blue">
                                    <i className="ph-fill ph-timer" />
                                    <div>
                                        <span className="qrsp-val">{mm}:{ss}</span>
                                        <span className="qrsp-label">Left</span>
                                    </div>
                                </div>
                                <div className="qr-stat-pill qr-stat-pill--purple">
                                    <i className="ph-fill ph-question" />
                                    <div>
                                        <span className="qrsp-val">{total}</span>
                                        <span className="qrsp-label">Total Qs</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA buttons */}
                            <div className="qr-cta-row">
                                <button className="qr-btn-retake" onClick={reset}>
                                    <i className="ph-bold ph-arrow-clockwise" /> Retake Quiz
                                </button>
                                {nextArticle ? (
                                    <Link href={`/my-courses/blog/${chapter.id}/${nextArticle.id}`} className="qr-btn-back">
                                        Next Lesson <i className="ph-bold ph-arrow-right" />
                                    </Link>
                                ) : (
                                    <Link href={isLastChapter ? "/my-courses" : `/my-courses/blog/${chapter.id + 1}/1`} className="qr-btn-back">
                                        {isLastChapter ? "Course Complete" : "Next Chapter"} <i className="ph-bold ph-arrow-right" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Review section ── */}
                <div className="qr-review-section">
                    <div className="qr-review-header">
                        <h2 className="qr-review-title">Question Review</h2>
                        <div className="qr-review-legend">
                            <span className="qrl-dot qrl-dot--green" /> Correct
                            <span className="qrl-dot qrl-dot--red" /> Wrong
                        </div>
                    </div>

                    <div className="qr-review-list">
                        {questions.map((qn, i) => {
                            const ans = answers[i];
                            const correct = ans === qn.correct;
                            return (
                                <div key={i} className={`qri2 ${correct ? "qri2--correct" : "qri2--wrong"}`}>
                                    {/* Question header */}
                                    <div className="qri2-hd">
                                        <div className={`qri2-num ${correct ? "qri2-num--green" : "qri2-num--red"}`}>
                                            Q{i + 1}
                                        </div>
                                        <p className="qri2-question">{qn.question}</p>
                                        <div className={`qri2-badge ${correct ? "qri2-badge--correct" : "qri2-badge--wrong"}`}>
                                            {correct
                                                ? <><i className="ph-fill ph-check-circle" /> Correct</>
                                                : <><i className="ph-fill ph-x-circle" /> Wrong</>
                                            }
                                        </div>
                                    </div>

                                    {/* Answers */}
                                    <div className="qri2-body">
                                        {!correct && ans !== null && (
                                            <div className="qri2-ans qri2-ans--wrong">
                                                <span className="qri2-ans-label">Your answer</span>
                                                <span className="qri2-ans-text">
                                                    <i className="ph-fill ph-x-circle" /> {qn.options[ans]}
                                                </span>
                                            </div>
                                        )}
                                        <div className="qri2-ans qri2-ans--correct">
                                            <span className="qri2-ans-label">Correct answer</span>
                                            <span className="qri2-ans-text">
                                                <i className="ph-fill ph-check-circle" /> {qn.options[qn.correct]}
                                            </span>
                                        </div>
                                        <div className="qri2-explanation">
                                            <i className="ph-fill ph-lightbulb" />
                                            <p>{qn.explanation}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom CTAs */}
                    <div className="qr-bottom-cta">
                        <button className="qr-btn-retake" onClick={reset}>
                            <i className="ph-bold ph-arrow-clockwise" /> Retake Quiz
                        </button>
                        {nextArticle ? (
                            <Link href={`/my-courses/blog/${chapter.id}/${nextArticle.id}`} className="qr-btn-back">
                                Next Lesson <i className="ph-bold ph-arrow-right" />
                            </Link>
                        ) : (
                            <Link href={isLastChapter ? "/my-courses" : `/my-courses/blog/${chapter.id + 1}/1`} className="qr-btn-back">
                                {isLastChapter ? "Course Complete" : "Next Chapter"} <i className="ph-bold ph-arrow-right" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }


    // ── Quiz screen ───────────────────────────────────────────────────────────
    return (
        <div className="quiz-page">
            {/* Header */}
            <div className="quiz-topbar">
                <div className="qtb-left">
                    <Link href={`/my-courses/blog/${chapter.id}/${article.id}`} className="qtb-back">
                        <i className="ph-fill ph-graduation-cap" style={{ fontSize: 20 }} />
                        {article.title}
                    </Link>
                </div>
                <div className="qtb-center">
                    <div className={`qtb-timer${timeLeft < 60 ? " qtb-timer--urgent" : ""}`}>
                        <i className="ph-fill ph-timer" /> {mm}:{ss}
                    </div>
                </div>
                <div className="qtb-right">
                    <button className="qtb-settings"><i className="ph ph-gear" /></button>
                </div>
            </div>

            {/* Progress bar */}
            <div className="quiz-progress-wrap">
                <div className="quiz-progress-bar-header">
                    <span className="qpb-label">CURRENT PROGRESS</span>
                    <span className="qpb-counter">Question {current + 1} of {total}</span>
                </div>
                <div className="quiz-progress-track">
                    <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Main */}
            <div className="quiz-main">
                <div className="quiz-question-card">
                    <div className="qqc-top">
                        <h2 className="qqc-question">{q.question}</h2>
                        <button
                            className={`qqc-flag${flagged[current] ? " flagged" : ""}`}
                            onClick={toggleFlag}
                        >
                            <i className={`ph${flagged[current] ? "-fill" : ""} ph-flag`} />
                            {flagged[current] ? "Flagged" : "Flag"}
                        </button>
                    </div>

                    <div className="quiz-options">
                        {q.options.map((opt, i) => (
                            <button key={i}
                                className={`quiz-option${selected === i ? " quiz-option--selected" : ""}`}
                                onClick={() => pickOption(i)}
                            >
                                <span className={`quiz-option-radio${selected === i ? " checked" : ""}`}>
                                    {selected === i && <span className="quiz-option-radio-dot" />}
                                </span>
                                <span className="quiz-option-text">{opt}</span>
                                {selected === i && <i className="ph-fill ph-check-circle quiz-option-check" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom nav */}
                <div className="quiz-bottom-nav">
                    <button className="btn-quiz-prev" onClick={() => goTo(current - 1)} disabled={current === 0}>
                        <i className="ph-bold ph-arrow-left" /> Previous
                    </button>

                    <div className="quiz-dots">
                        {questions.map((_, i) => (
                            <button key={i}
                                className={`quiz-dot${i === current ? " active" : ""}${answers[i] !== null ? " answered" : ""}${flagged[i] ? " flagged-dot" : ""}`}
                                onClick={() => goTo(i)}
                                title={`Q${i + 1}${flagged[i] ? " (flagged)" : ""}`}
                            />
                        ))}
                    </div>

                    {current < total - 1
                        ? <button className="btn-quiz-next" onClick={() => goTo(current + 1)}>
                            Next <i className="ph-bold ph-arrow-right" />
                        </button>
                        : <button
                            className={`btn-quiz-submit${answered < total ? " partial" : ""}`}
                            onClick={() => setSubmitted(true)}
                        >
                            Submit <i className="ph-bold ph-check" />
                        </button>
                    }
                </div>

                <div className="quiz-answered-count">
                    {answered} of {total} answered
                    {answered < total && <span className="quiz-unanswered-warn"> — {total - answered} unanswered</span>}
                </div>
            </div>

            {/* Footer */}
            <div className="quiz-footer">
                <div className="quiz-footer-left">
                    <a href="#" className="quiz-footer-link"><i className="ph ph-question" /> Help Center</a>
                    <a href="#" className="quiz-footer-link"><i className="ph ph-keyboard" /> Shortcuts</a>
                </div>
                <div className="quiz-footer-right">© 2025 Skills Speak</div>
            </div>
        </div>
    );
}
