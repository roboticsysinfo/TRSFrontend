import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import BlogStyle1 from '@/components/blog/BlogStyle1';
import FeaturedStartupStories from '@/components/home/FeaturedStartupStories';
import StorySlider from '@/components/home/StorySlider';
import TagContent from '@/components/home/TagContent';

import React from 'react';

export const metadata = {
    title: 'True Real Story | India’s Top Real Startup Stories Platform',
    description: "India’s most inspiring real startup stories, founder journeys, and business successes. True Real Story empowers and connects entrepreneurs across India.",
    keywords: "startup stories, India startup stories, entrepreneur journeys, founder success stories, startup case studies, inspirational business stories, True Real Story, startup ecosystem India, business success India, startup founders "
}

const Home1 = () => {

    return (
        <>
            <LayoutStyle7>

                <TagContent sectionClass="home-section" />

                <FeaturedStartupStories />

                <StorySlider sectionClass="featured-stories" />


                <BlogStyle1 sectionClass="bg-gray" />
            </LayoutStyle7>
        </>
    );
    
};


export default Home1;