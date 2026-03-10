// Server component wrapper — handles notFound safely
import { notFound } from "next/navigation";
import { getChapter, getArticle } from "@/lib/courseData";
import QuizClient from "./QuizClient";

export default async function QuizPage({
    params,
}: {
    params: Promise<{ chapterId: string, articleId: string }>;
}) {
    const { chapterId, articleId } = await params;

    const chapter = getChapter(parseInt(chapterId));
    if (!chapter) notFound();

    const article = getArticle(parseInt(chapterId), parseInt(articleId));
    if (!article) notFound();

    return <QuizClient chapter={chapter} article={article} />;
}
