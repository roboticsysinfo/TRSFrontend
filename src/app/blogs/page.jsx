import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import Blogs from '@/components/blog/Blogs';
import React from 'react';

export const metadata = {

    title: "Startup & Business Blogs | True Real Story India",
    description: "Explore insightful blogs on startups, business growth, companies, and entrepreneurship in India. Learn, get inspired, and stay updated with True Real Story.",
    keywords: "startup blogs, business blogs India, entrepreneurship articles, company growth tips, founder blogs, startup ecosystem, Indian business stories, True Real Story blogs, startup growth strategies, inspiring blogs India"
    
}

const Blog3Column = () => {
    return (
        <>
            <LayoutStyle7 breadCrumb="News & Blogs" title="News & Blogs">
                <Blogs />
            </LayoutStyle7>
        </>
    );
};

export default Blog3Column;