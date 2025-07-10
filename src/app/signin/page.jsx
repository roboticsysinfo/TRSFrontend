

import SignIn from '@/components/auth/SignIn';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

import React from 'react';

export const metadata = {
    title: "Sign In"
}


const SignInPage = () => {
    return (
        <>
            <LayoutStyle7 >
                <SignIn />
            </LayoutStyle7>
        </>
    );
};

export default SignInPage;