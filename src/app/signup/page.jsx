

import SignUp from '@/components/auth/SignUp';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

import React from 'react';

export const metadata = {
    title: "Sign Up | True Real Story - Join Startup Community",
    description: "Sign up on True Real Story to list your company, share your startup journey and join India’s most inspiring community of entrepreneurs and founders.",
    keywords: "sign up True Real Story, join startup community, startup registration India, founder sign up, entrepreneur community, share startup story, startup profiles, True Real Story register"
}


const SignUpPage = () => {
    return (
        <>
            <LayoutStyle7 >
                <SignUp />
            </LayoutStyle7>
        </>
    );
};

export default SignUpPage;