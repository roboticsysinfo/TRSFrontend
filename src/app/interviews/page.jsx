import InterviewList from '@/components/interview/InterviewList';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import React from 'react';

export const metadata = {
    title: "Inspiring Entrepreneur and People Interviews—True Real Story ",
    description: "Explore exclusive interviews with Indian startup founders and entrepreneurs. Dive into real success stories, challenges, lessons, and inspiration at True Real Story.",
    keywords: "startup stories India,entrepreneur interviews,Indian startups,founder stories,startup journey,real startup stories,True Real Story,Indian entrepreneurs,startup success,entrepreneurship India,startup insights,founder interviews"
}

const InterviewPage = () => {
    return (
        <>

            <LayoutStyle7 breadCrumb="interviews" title="Interviews">
                <InterviewList />
            </LayoutStyle7>
            
        </>

    );
};

export default InterviewPage;