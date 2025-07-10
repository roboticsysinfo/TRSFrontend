

import SignIn from '@/components/auth/SignIn';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

import React from 'react';

export const metadata = {
    title: "Sign In | True Real Story - Access Your Startup Account",
    description: "Sign in to True Real Story to share your startup journey, manage your profile, and connect with India’s inspiring entrepreneur community.",
    keywords: "sign in True Real Story, startup account login, entrepreneur sign in, founder account India, startup community login, share startup story, True Real Story login, business stories access"
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