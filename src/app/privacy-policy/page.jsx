import React from 'react';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import PrivacyPolicyDetails from '@/components/about/PrivacyPolicyDetails';

export const metadata = {

  title: "Privacy Policy",
  description: "",
  keywords: ""
};


const page = async () => {

  let privacyContent = '';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/get-site-details`, {
      next: { revalidate: 3600 }, // optional: revalidate every hour
      cache: 'no-store',
    });

    const json = await res.json();

    if (json.success && json.data) {
      privacyContent = json.data.privacyContent;
    }
  } catch (error) {
    console.error('SSR fetch failed:', error.message);
  }

  return (
    <LayoutStyle7 breadCrumb="Privacy Policy" title="Privacy Policy">
      <PrivacyPolicyDetails privacyContent={privacyContent} />
    </LayoutStyle7>
  );
};

export default page;
