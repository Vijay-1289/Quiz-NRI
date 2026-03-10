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
    quiz: QuizQuestion[];
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
}

// ── Dynamic Mock Course Data ──────────────────────────────────────────────────
const syllabus = [
    {
        id: 1, title: "Grammar", subject: "English Grammar",
        status: "current" as Status, lessonProgress: 0, quizScore: 0,
        topics: [
            "Subject and Verb Agreement- Rules", "Tenses", "Articles",
            "Verb Forms", "If- Conditionals", "Question Tags",
            "Prepositions & Conjunctions", "Grammar Rules", "Error Identification"
        ]
    },
    {
        id: 2, title: "Communication", subject: "Reading & Reasoning",
        status: "locked" as Status, lessonProgress: 0,
        topics: [
            "Reading Comprehension", "Passage Ordering", "Sentence Ordering",
            "Critical Reasoning", "Phrasal Verbs", "Idiomatic Expressions"
        ]
    },
    {
        id: 3, title: "Vocabulary", subject: "Words & Usage",
        status: "locked" as Status, lessonProgress: 0,
        topics: [
            "Synonyms", "Antonyms", "Prefixes-Suffixes",
            "Root words", "Analogies", "Spellings"
        ]
    },
    {
        id: 4, title: "Written", subject: "Writing Skills",
        status: "locked" as Status, lessonProgress: 0,
        topics: [
            "Essay Writing", "Letter Writing", "Memo Writing", "Resume Writing"
        ]
    }
];

const topicsWithImages = [
    { name: "Grammar", url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80" },
    { name: "Communication", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80" },
    { name: "Vocabulary", url: "https://images.unsplash.com/photo-1546410531-bdaee179975b?w=1200&auto=format&fit=crop&q=80" },
    { name: "Written", url: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=1200&auto=format&fit=crop&q=80" }
];

export function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

export const allChapters: ChapterData[] = syllabus.map(ch => ({
    id: ch.id,
    title: ch.title,
    subject: ch.subject,
    status: ch.status,
    lessonProgress: ch.lessonProgress,
    quizScore: ch.quizScore,
    articles: ch.topics.map((title, i) => {
        const isFirstGrammar = ch.id === 1 && i === 0;
        const heroUrl = topicsWithImages.find(t => t.name === ch.title)?.url ?? "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200";

        return {
            id: i + 1,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: title,
            readTime: isFirstGrammar ? "8 min" : "5 min",
            category: ch.title,
            hero: heroUrl, // Passing the full URL here now instead of a lookup key
            sections: isFirstGrammar ? [
                { type: "heading", content: "Subject" },
                { type: "paragraph", content: "About whom or what the sentence speaks is said to be the subject. The subject might be a word or phrase, and the verb should agree with the number of the subject." },
                { type: "heading", content: "Verb" },
                { type: "paragraph", content: "A word in a sentence which indicates the State of Being or State of action of a Noun or Pronoun is said to be a verb. There are five forms of Verbs:" },
                {
                    type: "vocab", words: [
                        { word: "Verb-base form", def: "write" },
                        { word: "Verb-plural form", def: "writes" },
                        { word: "Verb-present form", def: "writing" },
                        { word: "Verb-past form", def: "wrote" },
                        { word: "Verb-past participle form", def: "written" }
                    ]
                },
                { type: "tip", label: "Note", content: "In some sentences, the auxiliary acts as the main verb. e.g., she is good." },
                { type: "heading", content: "Auxiliaries" },
                { type: "paragraph", content: "The Auxiliaries are divided into two types, i.e., Primary and Modal. The auxiliaries help in the grammatical construction of sentences." },
                { type: "heading", content: "Primary Auxiliaries" },
                { type: "paragraph", content: "They help in the grammatical construction of the sentences." },
                {
                    type: "vocab", words: [
                        { word: "To Be", def: "Present: am(I), is(HE, SHE, IT), are(WE, YOU, THEY) | Past: Was(I, HE, SHE, IT), were(WE, YOU, THEY)" },
                        { word: "To Do", def: "Present: Do(I, WE, YOU, THEY), Does(HE, SHE, IT) | Past: Did-All Pronouns" },
                        { word: "To Have", def: "Present: Have(I, WE, YOU, THEY), Has(HE, SHE, IT) | Past: Had-All Pronouns" }
                    ]
                },
                { type: "heading", content: "Modal Auxiliaries" },
                { type: "paragraph", content: "They help in formal and informal communication. They are: Can-Could, Will-would, May-might, Shall-should, Need, Dare, Ought, Must, Used to" },
                { type: "heading", content: "Agreement Rules" },
                { type: "paragraph", content: "1. The verb should agree in number with the subject.\ne.g. Laptop is essential for work enhancement. (Singular)\nLaptops are essential for work enhancement. (Plural)\nShe plays football very well.\nThey play football very well." },
                { type: "tip", label: "Exception", content: "The pronoun ‘You’, either singular or plural, always requires a plural verb. You were helping a lot. Thank you." },
                { type: "paragraph", content: "2. The verb should agree with its true subject but not with the intervening object or any other.\ne.g., The hive of bees is huge." },
                { type: "paragraph", content: "3. Subjects joined by and are usually plural and take plural verbs.\ne.g., The teachers and students were participating in the contest.\nRaghu and Ram are good friends." },
                { type: "tip", label: "Exception a", content: "If the two subjects are joined by and belong to the same person, the verb remains singular. e.g., Idli and Sambar is my favorite breakfast." },
                { type: "tip", label: "Exception b", content: "If the two subjects connected by and are preceded by each, every, or many, a singular verb is used. e.g., Every girl and boy has to fill out the form immediately." },
                { type: "paragraph", content: "4. Whenever you get words like with, together with, along with, besides, as well as, including, in addition to, etc., the verb takes according to the subject. If the subject is singular, it takes a singular verb, and in case a plural verb. If one verb is plural and the other verb is singular, the verb takes according to the second subject.\ne.g., The television, along with the cabinet, is to be sold.\nMrs. Paul, with her son and daughter, is going to the theatre this evening.\nOur chief competitor, as well as ourselves, is obliged to increase prices.\nBob and George are leaving.\nNeither Bob nor George is leaving.\nNeither Bob nor his friends are leaving." },
                { type: "paragraph", content: "5. There and here are never subjects. In sentences that begin with these words, the subject is usually found later in the sentence.\nThere were five books on the shelf. (were, agrees with the subject books)\nHere is the report you wanted. (is agrees with the subject report)" },
                { type: "paragraph", content: "6. Collective nouns may be singular or plural, depending on their use in the sentence. A collective noun is a noun used to name a whole group. Following are some common examples:\nArmy, audience, class, club, committee, crowd, flock, group, herd, jury\nOrchestra, public, swarm, team, troop, United States\nThe orchestra is playing a hit song. (Orchestra is considered as one unit—singular.)\nThe orchestra were asked to give their musical backgrounds. (Orchestra is considered as separate individuals—plural)" }
            ] : [
                { type: "paragraph", content: `This is the lesson content for ${title}. You will learn all the foundational rules and applications related to this topic.` },
                { type: "heading", content: "Key Concepts" },
                { type: "paragraph", content: "More detailed explanations and examples will be provided here in the full course." }
            ],
            quiz: isFirstGrammar ? [
                { id: 1, question: "Your friend ____ too much.", options: ["talk", "talks", "talking", "is talk"], correct: 1, explanation: "Singular subject 'friend' takes singular verb 'talks'." },
                { id: 2, question: "The man with the roses ____ like your brother.", options: ["look", "looks", "looking", "is look"], correct: 1, explanation: "Singular subject 'man' takes singular verb 'looks'." },
                { id: 3, question: "The women in the pool _____ well.", options: ["swimming", "swims", "swim", "is swim"], correct: 2, explanation: "Plural subject 'women' takes plural verb 'swim'." },
                { id: 4, question: "Bill ______ a cab.", options: ["drive", "drives", "driving", "is drive"], correct: 1, explanation: "Singular subject 'Bill' takes singular verb 'drives'." },
                { id: 5, question: "The football players _____ five miles every day.", options: ["run", "runs", "running", "is run"], correct: 0, explanation: "Plural subject 'players' takes plural verb 'run'." },
                { id: 6, question: "Here into the main ring of the circus ____ the trained elephants.", options: ["come", "comes", "comming", "coming"], correct: 0, explanation: "The subject 'elephants' is plural, so it takes the plural verb 'come'." },
                { id: 7, question: "Either the workers or the boss _____ the merchandise.", options: ["delivers", "deliver", "delivering", "is deliver"], correct: 0, explanation: "When subjects are joined by 'or', the verb agrees with the closer subject ('boss' is singular)." },
                { id: 8, question: "The committee ________ hard for better schools.", options: ["work", "working", "works", "is work"], correct: 2, explanation: "The collective noun 'committee' acting as a single unit takes a singular verb 'works'." },
                { id: 9, question: "There ______ many things to do before the holidays.", options: ["is", "was", "are", "may"], correct: 2, explanation: "The subject 'things' is plural, so it takes the plural verb 'are'." },
                { id: 10, question: "The jury _____ polled for their verdicts.", options: ["was", "were", "are", "can"], correct: 1, explanation: "The collective noun 'jury' acting as individuals takes a plural verb 'were'." },
                { id: 11, question: "Each of the girls _____ good on skis.", options: ["look", "looks", "looking", "is look"], correct: 1, explanation: "The pronoun 'Each' is singular and requires a singular verb 'looks'." },
                { id: 12, question: "Everybody ____ asked to remain quiet.", options: ["will", "were", "are", "was"], correct: 3, explanation: "The pronoun 'Everybody' is singular and requires a singular verb 'was'." }
            ] : [
                { id: 1, question: `Sample quiz question for ${title}?`, options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Placeholder explanation." },
                { id: 2, question: `Another quiz question for ${title}?`, options: ["Option A", "Option B", "Option C", "Option D"], correct: 1, explanation: "Placeholder explanation." }
            ]
        };
    })
}));

export function getChapter(id: number): ChapterData | undefined {
    return allChapters.find(c => c.id === id);
}

export function getArticle(chapterId: number, articleId: number): BlogArticle | undefined {
    return getChapter(chapterId)?.articles.find(a => a.id === articleId);
}
