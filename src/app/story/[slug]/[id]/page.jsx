import React from 'react';
import StoryDetail from '@/components/story/StoryDetail';
import { getStoryById } from '@/redux/slices/storySlice';
import { wrapper } from '@/redux/store';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

export const metadata = {
    title: "Consua - Consulting Business - Team"
}

const StoryDetailPage = async ({ params }) => {
    const { id } = params;

    // Fetch from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-story/${id}`);
    const result = await response.json();

    console.log("result", result);
    

    const story = result?.data || null;

    console.log("story data", story);
    

    return (

        <>
            <LayoutStyle7 breadCrumb="Story" title={story?.title}>
                <StoryDetail story={story} />;
            </LayoutStyle7>
        </>


    )


};

export default StoryDetailPage;
