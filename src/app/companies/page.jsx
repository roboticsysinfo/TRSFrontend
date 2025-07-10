import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import Companies from '@/components/company/Companies';

import React from 'react';

export const metadata = {
    title: "Companies & Startup Profiles in India | True Real Story",
    description : "Explore inspiring startup, company, and business profiles on True Real Story. List and register your startup to inspire millions across India.",
    keywords: "startup profiles, company profiles,business profiles, list your startup, India startups, founder stories, entrepreneur journeys, startup ecosystem, startup listings, True Real Story, inspiring businesses"
}

const CompaniesPage = () => {
    return (
        <>
            <LayoutStyle7 >
                <Companies />
            </LayoutStyle7>
        </>
    );
};

export default CompaniesPage;