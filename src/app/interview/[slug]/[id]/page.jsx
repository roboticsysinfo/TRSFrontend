import React from 'react';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import InterviewDetail from '@/components/interview/InterviewDetail';

export async function generateMetadata({ params }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-interview/${params.id}`, {
            next: { revalidate: 60 },
        });
        const data = await res.json();
        const interview = data?.data;

        return {
            title: interview?.metaTitle || interview?.interviewTitle || 'Interview Detail',
            description: interview?.metaDescription || interview?.excerpt?.slice(0, 160) || 'Interview detail page',
            keywords: interview?.metaKeywords || 'interview, questions, answers',
        };
    } catch (error) {
        console.error('Metadata fetch failed:', error);
        return {
            title: 'Interview Detail',
            description: 'Interview detail page',
            keywords: 'interview, questions, answers',
        };
    }
}

const InterviewPage = async ({ params }) => {
    const { id } = params;

    let interview = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-interview/${id}`, {
            next: { revalidate: 60 },
        });
        const data = await res.json();
        interview = data?.data;
    } catch (error) {
        console.error('Failed to fetch interview:', error);
    }

    return (
        <LayoutStyle7>
            <InterviewDetail interview={interview} />
        </LayoutStyle7>
    );
};

export default InterviewPage;
