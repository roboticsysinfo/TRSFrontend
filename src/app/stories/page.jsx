import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import AllStories from '@/components/story/AllStories';

import React from 'react';

export const metadata = {
    title: "Indian Real Startup Stories & Founder Journeys | True Real Story",
    description: "Read inspiring Indian startup stories and founder journeys on True Real Story. Discover challenges, growth hacks, and success stories from India.",
    keywords: "startup stories, founder stories, entrepreneur journeys, inspirational stories, business success stories, startup success India, real startup stories, True Real Story, startup inspiration, India entrepreneurs"
}

const StoriesPage = () => {
    return (
        <>
            <LayoutStyle7 >
                <AllStories />
            </LayoutStyle7>
        </>
    );
};

export default StoriesPage;