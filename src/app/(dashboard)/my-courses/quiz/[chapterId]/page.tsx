// Server component wrapper — handles notFound safely
import { notFound } from "next/navigation";
import { getChapter } from "@/lib/courseData";
import QuizClient from "./QuizClient";

export default async function QuizPage({
    params,
}: {
    params: Promise<{ chapterId: string }>;
}) {
    const { chapterId } = await params;
    const chapter = getChapter(parseInt(chapterId));

    if (!chapter) notFound();

    return <QuizClient chapter={chapter} />;
}
