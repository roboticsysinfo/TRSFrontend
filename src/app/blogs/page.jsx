import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import Blogs from '@/components/blog/Blogs';
import React from 'react';

export const metadata = {

    title: "Consua - Consulting Business - Blog 3 Column"
    
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