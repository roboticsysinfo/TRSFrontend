import React from 'react';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import PrivacyPolicyDetails from '@/components/about/PrivacyPolicyDetails';

export const metadata = {

  title: "Privacy Policy | True Real Story – Startup Stories Platform",
  description: "Read True Real Story’s Privacy Policy to learn how we collect, use, and protect your data while sharing inspiring startup stories and founder journeys in India.",
  keywords: "privacy policy, true real story privacy, startup story platform, data protection, startup founders, entrepreneur stories, data privacy India, startup community, safe storytelling, founder journeys"
};


const page = async () => {

  let privacyContent = '';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/get-site-details`, {
      next: { revalidate: 60 }
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
