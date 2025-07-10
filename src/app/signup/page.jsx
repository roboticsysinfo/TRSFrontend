

import SignUp from '@/components/auth/SignUp';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

import React from 'react';

export const metadata = {
    title: "Sign Up | Create Account"
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