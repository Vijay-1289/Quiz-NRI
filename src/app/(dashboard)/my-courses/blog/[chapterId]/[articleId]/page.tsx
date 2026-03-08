// Server component — handles data fetching and 404 safely
import { notFound } from "next/navigation";
import { getArticle, getChapter } from "@/lib/courseData";
import BlogArticleClient from "./BlogArticleClient";

export default async function BlogPage({
    params,
}: {
    params: Promise<{ chapterId: string; articleId: string }>;
}) {
    const { chapterId, articleId } = await params;
    const chId = parseInt(chapterId);
    const artId = parseInt(articleId);
    const chapter = getChapter(chId);
    const article = getArticle(chId, artId);

    if (!chapter || !article) notFound();

    return <BlogArticleClient chapter={chapter} article={article} />;
}
