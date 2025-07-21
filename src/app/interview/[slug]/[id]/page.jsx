import React from 'react';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import InterviewDetail from '@/components/interview/InterviewDetail';


export async function generateMetadata({ params }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-interview/${params.id}`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });
        const data = await res.json();
        const interview = data?.data;

        return {
            title: interview?.title || 'interview Detail',
            description: interview?.metaDescription || 'interview detail page',
            keywords: interview?.metaKeywords || 'interview Keywords',
        };
    } catch (error) {
        return {
            title: 'interview Detail',
            description: 'interview detail page',
            keywords: interview?.metaKeywords || 'interview Keywords',
        };
    }
}


const InterviewPage = async ({ params }) => {
    const { id } = params;

    let interview = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-interview/${id}`, {
            next: { revalidate: 60 }, // Enables Incremental Static Regeneration
        });
        const data = await res.json();
        interview = data?.data.interviews;
    } catch (error) {
        console.error('Failed to fetch interview:', error);
    }

    return (
        <LayoutStyle7 >
            <InterviewDetail interview={interview} />
        </LayoutStyle7>
    );
};

export default InterviewPage;
