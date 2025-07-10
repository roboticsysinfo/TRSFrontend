import Account from '@/components/account/Account';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
    title: "Account | True Real Story"
}

const AccountPage = () => {

  // ✅ Access cookies on the server
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/signin"); // ⛔ No token → redirect to signin
  }

    return (
        <>
            <LayoutStyle7 >
                <Account />
            </LayoutStyle7>
        </>
    );
};

export default AccountPage;