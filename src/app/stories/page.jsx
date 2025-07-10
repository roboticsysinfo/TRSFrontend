import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import AllStories from '@/components/story/AllStories';

import React from 'react';

export const metadata = {
    title: "Stories"
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