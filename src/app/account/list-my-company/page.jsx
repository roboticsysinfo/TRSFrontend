import CreateCompany from '@/components/account/CreateCompany';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
    title: "List My Company | True Real Story"
}

const ListMyCompanyPage = () => {

  // ✅ Access cookies on the server
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/signin"); // ⛔ No token → redirect to signin
  }

    return (
        <>
            <LayoutStyle7 >
                <CreateCompany />
            </LayoutStyle7>
        </>
    );
};

export default ListMyCompanyPage;