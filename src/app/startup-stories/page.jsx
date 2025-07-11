import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import StartupStories from '@/components/story/StartupStories';

import React from 'react';

export const metadata = {
   title: "Indian Real Startup Stories & Founder Journeys | True Real Story",
   description: "Read inspiring Indian startup stories and founder journeys on True Real Story. Discover challenges, growth hacks, and success stories from India.",
   keywords: "startup stories, founder stories, entrepreneur journeys, inspirational stories, business success stories, startup success India, real startup stories, True Real Story, startup inspiration, India entrepreneurs"
}

const StartupStoriesPage = () => {
    return (
        <>
            <LayoutStyle7 >
                <StartupStories />
            </LayoutStyle7>
        </>
    );
};

export default StartupStoriesPage;