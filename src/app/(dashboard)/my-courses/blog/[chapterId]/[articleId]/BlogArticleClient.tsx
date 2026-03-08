"use client";

import { useState } from "react";
import Link from "next/link";
import { ChapterData, BlogArticle, BlogSection } from "@/lib/courseData";

const heroImages: Record<string, string> = {
    intro: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop&q=80",
    vocab: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80",
};

function SectionBlock({ section }: { section: BlogSection }) {
    switch (section.type) {
        case "heading":
            return <h2 className="blog-section-heading">{section.content}</h2>;

        case "paragraph":
            return <p className="blog-paragraph">{section.content}</p>;

        case "conversation":
            return (
                <div className="blog-convo-block">
                    {section.label && <div className="blog-convo-label">{section.label}</div>}
                    <div className="blog-convo-lines">
                        {section.lines?.map((line, i) => {
                            const isSelf = ["You", "Candidate", "Strong"].includes(line.speaker);
                            const isWeak = ["Weak"].includes(line.speaker);
                            return (
                                <div key={i} className={`blog-convo-line ${isSelf ? "self" : isWeak ? "weak" : "other"}`}>
                                    <div className="blog-convo-speaker">{line.speaker}</div>
                                    <div className="blog-convo-bubble">{line.text}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );

        case "tip":
            return (
                <div className="blog-tip-block">
                    <div className="blog-tip-label">{section.label}</div>
                    <p className="blog-tip-text">{section.content}</p>
                </div>
            );

        case "vocab":
            return (
                <div className="blog-vocab-block">
                    <div className="blog-vocab-header">📚 Key Vocabulary</div>
                    <div className="blog-vocab-grid">
                        {section.words?.map((w, i) => (
                            <div key={i} className="blog-vocab-item">
                                <span className="blog-vocab-word">{w.word}</span>
                                <span className="blog-vocab-def">{w.def}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );

        default:
            return null;
    }
}

interface Props {
    chapter: ChapterData;
    article: BlogArticle;
}

export default function BlogArticleClient({ chapter, article }: Props) {
    const [isRead, setIsRead] = useState(false);

    const articleId = article.id;
    const chapterId = chapter.id;
    const nextArticle = chapter.articles.find(a => a.id === articleId + 1);
    const prevArticle = chapter.articles.find(a => a.id === articleId - 1);
    const heroSrc = heroImages[article.hero] ?? heroImages["intro"];
    const readPercent = isRead ? 100 : 50;

    return (
        <div className="blog-page">

            {/* Top nav */}
            <div className="blog-topbar">
                <Link href="/my-courses" className="blog-back-btn">
                    <i className="ph-bold ph-arrow-left" /> My Courses
                </Link>
                <div className="blog-topbar-center">
                    <span className="blog-chapter-crumb">{chapter.title}</span>
                    <i className="ph ph-caret-right" style={{ fontSize: 12, color: "#94a3b8" }} />
                    <span className="blog-article-crumb">{article.title}</span>
                </div>
                <span className="blog-read-badge">{article.readTime} read</span>
            </div>

            {/* Reading progress */}
            <div className="blog-read-progress">
                <div className="blog-read-progress-fill" style={{ width: `${readPercent}%` }} />
            </div>

            {/* Hero */}
            <div className="blog-hero">
                <img src={heroSrc} alt={article.title} className="blog-hero-img" />
                <div className="blog-hero-overlay">
                    <span className="blog-hero-category">{article.category}</span>
                    <h1 className="blog-hero-title">{article.title}</h1>
                    <div className="blog-hero-meta">
                        <span><i className="ph ph-clock" /> {article.readTime}</span>
                        <span><i className="ph ph-graduation-cap" /> {chapter.title}</span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="blog-body">
                <div className="blog-content">
                    {article.sections.map((section, i) => (
                        <SectionBlock key={i} section={section} />
                    ))}

                    {/* Mark as read */}
                    <div className="blog-cta-bar">
                        <button
                            className={`btn-mark-read${isRead ? " done" : ""}`}
                            onClick={() => setIsRead(true)}
                        >
                            {isRead
                                ? <><i className="ph-fill ph-check-circle" /> Article Marked as Read</>
                                : <><i className="ph ph-check-circle" /> Mark as Read</>
                            }
                        </button>
                        {isRead && nextArticle && (
                            <Link
                                href={`/my-courses/blog/${chapterId}/${nextArticle.id}`}
                                className="btn-next-article"
                            >
                                Next: {nextArticle.title} <i className="ph-bold ph-arrow-right" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <aside>
                    <div className="blog-sidebar-card">
                        <div className="bsc-label">Chapter Progress</div>
                        <div className="bsc-title">{chapter.title}</div>
                        <div className="bsc-articles">
                            {chapter.articles.map((a) => (
                                <Link key={a.id}
                                    href={`/my-courses/blog/${chapterId}/${a.id}`}
                                    className={`bsc-article-item${a.id === articleId ? " bsc-article-item--active" : ""}`}>
                                    <i className={`ph-fill ${a.id < articleId || (a.id === articleId && isRead) ? "ph-check-circle bsc-icon-done" : a.id === articleId ? "ph-circle bsc-icon-current" : "ph-circle bsc-icon-todo"}`} />
                                    {a.title}
                                </Link>
                            ))}
                        </div>
                        <Link href={`/my-courses/quiz/${chapterId}`} className="bsc-quiz-btn">
                            <i className="ph-fill ph-clipboard-text" /> Take Chapter Quiz
                        </Link>
                    </div>

                    <div className="blog-sidebar-card blog-sidebar-card--tip">
                        <div className="bsc-label">🎯 Quick Tip</div>
                        <p>For each new word you learn, try to use it in a real conversation within 24 hours. Active recall is 3× more effective than passive reading.</p>
                    </div>
                </aside>
            </div>

            {/* Nav footer */}
            <div className="blog-nav-footer">
                {prevArticle
                    ? <Link href={`/my-courses/blog/${chapterId}/${prevArticle.id}`} className="blog-nav-btn">
                        <i className="ph-bold ph-arrow-left" /> <span>{prevArticle.title}</span>
                    </Link>
                    : <div />
                }
                {nextArticle
                    ? <Link href={`/my-courses/blog/${chapterId}/${nextArticle.id}`} className="blog-nav-btn blog-nav-btn--next">
                        <span>{nextArticle.title}</span> <i className="ph-bold ph-arrow-right" />
                    </Link>
                    : <Link href={`/my-courses/quiz/${chapterId}`} className="blog-nav-btn blog-nav-btn--quiz">
                        Take Chapter Quiz <i className="ph-bold ph-arrow-right" />
                    </Link>
                }
            </div>
        </div>
    );
}
