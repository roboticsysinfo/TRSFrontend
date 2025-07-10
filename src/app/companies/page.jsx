import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import Companies from '@/components/company/Companies';

import React from 'react';

export const metadata = {
    title: "Companies"
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