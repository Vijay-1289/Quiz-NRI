// ── Shared course content data ────────────────────────────────────────────────
// Blog articles & quiz questions for every chapter.
// Import this wherever you need course content.

export type Status = "completed" | "current" | "locked";

export interface BlogSection {
    type: "paragraph" | "conversation" | "tip" | "vocab" | "heading";
    content?: string;
    label?: string;
    lines?: { speaker: string; text: string }[];
    words?: { word: string; def: string }[];
}

export interface BlogArticle {
    id: number;
    slug: string;
    title: string;
    readTime: string;
    category: string;
    hero: string;         // image path key
    sections: BlogSection[];
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correct: number;      // 0-indexed
    explanation: string;
}

export interface ChapterData {
    id: number;
    title: string;
    subject: string;
    status: Status;
    lessonProgress: number;
    quizScore?: number;
    articles: BlogArticle[];
    quiz: QuizQuestion[];
}

// ── Chapter 1 ─────────────────────────────────────────────────────────────────
const chapter1: ChapterData = {
    id: 1, title: "The Art of Introduction", subject: "Self-Introduction Mastery",
    status: "completed", lessonProgress: 100, quizScore: 92,
    articles: [
        {
            id: 1, slug: "first-30-seconds",
            title: "Why Your First 30 Seconds Matter Most",
            readTime: "4 min", category: "First Impressions",
            hero: "intro",
            sections: [
                { type: "paragraph", content: "Research shows that people form lasting judgments within the first 7 seconds of meeting someone. In a professional setting — an interview, a networking event, or a first day at work — those seconds can define the entire relationship." },
                { type: "heading", content: "The Science of First Impressions" },
                { type: "paragraph", content: "When you walk into a room, your body language, tone of voice, and opening words all fire simultaneously in the listener's brain. This is called the 'halo effect' — a positive first impression causes people to view everything you say afterward in a more favorable light." },
                {
                    type: "conversation",
                    label: "❌ Weak Introduction",
                    lines: [
                        { speaker: "Candidate", text: "Uhh... so my name is Ravi. I studied engineering. I want to work here." },
                        { speaker: "Interviewer", text: "Okay... and why this role specifically?" },
                        { speaker: "Candidate", text: "Because... I don't know, it seemed good." },
                    ],
                },
                {
                    type: "conversation",
                    label: "✅ Strong Introduction",
                    lines: [
                        { speaker: "Candidate", text: "Good morning! I'm Ravi, a software engineer with three years of experience building scalable APIs at Infosys. I'm excited about this role because your team is solving exactly the kind of distributed systems challenges I find most energizing." },
                        { speaker: "Interviewer", text: "That's a great overview — tell me more about the API work." },
                    ],
                },
                { type: "tip", label: "💡 Pro Tip", content: "Use the P-P-F formula: your Present role, your Past achievement, and why you're excited about the Future at this company. Keep it under 45 seconds." },
                { type: "heading", content: "Your Energy Sets the Tone" },
                { type: "paragraph", content: "Even on a video call, your energy is contagious. Sit up straight, look into the camera (not at the screen), and smile before you start speaking. The interviewer will mirror your energy within seconds." },
            ],
        },
        {
            id: 2, slug: "elevator-pitch",
            title: "Crafting the Perfect Elevator Pitch",
            readTime: "6 min", category: "Communication",
            hero: "intro",
            sections: [
                { type: "paragraph", content: "An elevator pitch is a concise, compelling summary of who you are and what you offer — short enough to deliver in a 30-second elevator ride. The best pitches feel natural, not rehearsed." },
                { type: "heading", content: "The Three-Part Structure" },
                {
                    type: "vocab", words: [
                        { word: "Value proposition", def: "A clear statement of the benefit you bring to an employer." },
                        { word: "Differentiator", def: "What makes you stand out from other candidates." },
                        { word: "Call to action", def: "What you want the listener to do next (e.g., schedule an interview)." },
                    ]
                },
                {
                    type: "conversation",
                    label: "📝 Example: Networking Event",
                    lines: [
                        { speaker: "You", text: "Hi, I'm Priya! I'm a data analyst who specializes in turning messy sales data into dashboards that actually drive decisions. Last quarter I helped my team cut reporting time by 60%. I noticed your company just expanded to Southeast Asia — I'd love to chat about how data strategy might look there." },
                        { speaker: "Manager", text: "That's impressive — do you have five minutes now?" },
                    ],
                },
                { type: "tip", label: "🎯 Remember", content: "Your pitch should answer three questions: Who are you? What value do you offer? What do you want? Write it in 3 sentences, then practice until it feels like everyday speech." },
            ],
        },
    ],
    quiz: [
        { id: 1, question: "Which formula helps structure a strong self-introduction?", options: ["P-P-F (Present, Past, Future)", "S-A-R (Situation, Action, Result)", "T-E-E (Topic, Evidence, Explain)", "A-B-C (Ability, Background, Confidence)"], correct: 0, explanation: "The P-P-F formula covers your Present role, a Past achievement, and why you are excited about the Future at this company." },
        { id: 2, question: "Research shows people form lasting impressions in approximately how many seconds?", options: ["30 seconds", "7 seconds", "2 minutes", "15 seconds"], correct: 1, explanation: "Studies consistently show that first impressions form within 7 seconds — highlighting the importance of a confident, prepared opening." },
        { id: 3, question: "When introducing yourself on a video call, where should you look?", options: ["At your own image on screen", "At the interviewer's face on screen", "Into the camera lens", "At your notes"], correct: 2, explanation: "Looking into the camera lens simulates eye contact for the viewer, which creates a stronger rapport than looking at the screen." },
        { id: 4, question: "What is a 'value proposition' in the context of an elevator pitch?", options: ["The salary you expect", "A clear statement of the benefit you bring to an employer", "The list of your technical skills", "A description of your education"], correct: 1, explanation: "A value proposition communicates the specific benefit or outcome an employer gains by hiring you." },
        { id: 5, question: "Which of the following is the best opening line for a job interview introduction?", options: ["I don't really know what to say...", "I'm just looking for any job right now.", "I'm Amit, a UX designer with 4 years of experience creating apps used by millions.", "Hi, I graduated last year and need experience."], correct: 2, explanation: "This opening immediately establishes name, role, experience level, and scale of impact — giving the interviewer a clear anchor." },
    ],
};

// ── Chapter 2 ─────────────────────────────────────────────────────────────────
const chapter2: ChapterData = {
    id: 2, title: "Professional Vocabulary", subject: "Communication Skills",
    status: "current", lessonProgress: 25,
    articles: [
        {
            id: 1, slug: "industry-buzzwords",
            title: "Top 50 Industry Buzzwords That Actually Matter",
            readTime: "7 min", category: "Vocabulary",
            hero: "vocab",
            sections: [
                { type: "paragraph", content: "Knowing the right buzzwords can make you sound like an insider — but only if you can use them naturally. The goal isn't to impress; it's to communicate precisely. These are the 10 most powerful buzzwords in MNC interviews today, with real conversation examples." },
                { type: "heading", content: "1. Leverage" },
                { type: "paragraph", content: 'Use "leverage" when describing how you used existing tools, skills, or networks to create a bigger outcome than expected.' },
                {
                    type: "conversation",
                    label: "💬 In an Interview",
                    lines: [
                        { speaker: "Interviewer", text: "How did you manage the project with such a small team?" },
                        { speaker: "You", text: "We leveraged our existing Jira workflows and automated the status reporting, which freed up about 5 hours per week per person." },
                    ],
                },
                { type: "heading", content: "2. Stakeholder" },
                { type: "paragraph", content: 'A "stakeholder" is anyone who has an interest in the outcome of a project — clients, managers, team members, even end users.' },
                {
                    type: "conversation",
                    label: "💬 In a Team Meeting",
                    lines: [
                        { speaker: "Manager", text: "Who needs to approve this design change?" },
                        { speaker: "You", text: "We should loop in all key stakeholders — the product owner, the QA lead, and the client's IT team — before we finalise anything." },
                    ],
                },
                { type: "heading", content: "3. Bandwidth" },
                { type: "paragraph", content: '"Bandwidth" in a workplace context means available time and capacity — not internet speed.' },
                {
                    type: "conversation",
                    label: "💬 Declining a Task Politely",
                    lines: [
                        { speaker: "Colleague", text: "Can you take on the client report this week?" },
                        { speaker: "You", text: "I'd love to help but I don't have the bandwidth right now — I'm finalising the Q3 deliverables. Can we revisit next week?" },
                    ],
                },
                {
                    type: "vocab",
                    words: [
                        { word: "Synergy", def: "The combined output of two groups working together is greater than each working alone." },
                        { word: "Scalable", def: "A solution that continues to work effectively as it grows in size or usage." },
                        { word: "Deep dive", def: "A detailed, thorough analysis of a specific topic or problem." },
                        { word: "Agile", def: "A project methodology that emphasises flexibility, iteration, and collaboration." },
                        { word: "KPI", def: "Key Performance Indicator — a measurable value that shows how effectively a goal is being achieved." },
                    ],
                },
                { type: "tip", label: "⚠️ Avoid Buzzword Overload", content: 'Using too many buzzwords in one sentence sounds unnatural. Say "We used our existing tools to get more done" just as often as you say "We leveraged our resources." Mix formal and plain language.' },
            ],
        },
        {
            id: 2, slug: "action-verbs",
            title: "Impactful Action Verbs for Every Situation",
            readTime: "5 min", category: "Writing & Speaking",
            hero: "vocab",
            sections: [
                { type: "paragraph", content: "Strong action verbs transform weak, vague descriptions into vivid, memorable ones. Instead of 'I was responsible for the project,' say 'I led, managed, and delivered the project on time.'" },
                { type: "heading", content: "For Leadership" },
                {
                    type: "conversation",
                    label: "💬 Resume vs. Interview — Leadership",
                    lines: [
                        { speaker: "Weak", text: "I was in charge of a team of 8 developers." },
                        { speaker: "Strong", text: "I spearheaded a cross-functional team of 8 developers, orchestrating a 6-month product launch that exceeded targets by 20%." },
                    ],
                },
                {
                    type: "vocab", words: [
                        { word: "Spearheaded", def: "Led or initiated a project or movement." },
                        { word: "Orchestrated", def: "Planned and coordinated complex activities with multiple parts." },
                        { word: "Championed", def: "Actively supported and fought for a cause or idea." },
                        { word: "Streamlined", def: "Made a process simpler, faster, or more efficient." },
                        { word: "Drove", def: "Caused or produced a result through direct effort." },
                    ]
                },
                { type: "tip", label: "💡 Rule of Thumb", content: "Start every bullet point on your resume with a past-tense action verb. Start every interview answer with a present-tense action verb for current roles." },
            ],
        },
    ],
    quiz: [
        { id: 1, question: "What does 'bandwidth' mean in a professional workplace context?", options: ["Internet connection speed", "Available time and capacity to take on work", "The size of a software project", "A measurement of team skill level"], correct: 1, explanation: "In office settings, 'bandwidth' means available capacity — time and mental energy — not internet speed." },
        { id: 2, question: "Which sentence uses 'leverage' correctly in a professional context?", options: ["We leveraged the coffee machine every morning.", "We leveraged our CRM data to identify upsell opportunities worth ₹50L.", "The lever is an example of leverage in physics.", "Can you leverage me the stapler?"], correct: 1, explanation: "'Leverage' in a professional context means using an existing asset or resource to produce a greater outcome." },
        { id: 3, question: "Which action verb best replaces 'was responsible for' on a resume?", options: ["Handled", "Managed", "Spearheaded", "Was around for"], correct: 2, explanation: "'Spearheaded' implies leadership and initiative — much stronger than the vague 'was responsible for.'" },
        { id: 4, question: "A 'stakeholder' in a project is:", options: ["Only the client who pays for it", "Anyone who has an interest in the project's outcome", "The project manager", "A shareholder of the company"], correct: 1, explanation: "Stakeholders include anyone affected by or interested in the project — clients, team members, managers, end users." },
        { id: 5, question: "What is a KPI?", options: ["Key Partnership Initiative", "Knowledge and Performance Index", "Key Performance Indicator", "Keyword Priority Integration"], correct: 2, explanation: "KPI stands for Key Performance Indicator — a measurable value showing how effectively a goal is achieved." },
    ],
};

export const allChapters: ChapterData[] = [chapter1, chapter2];

export function getChapter(id: number): ChapterData | undefined {
    return allChapters.find(c => c.id === id);
}

export function getArticle(chapterId: number, articleId: number): BlogArticle | undefined {
    return getChapter(chapterId)?.articles.find(a => a.id === articleId);
}
