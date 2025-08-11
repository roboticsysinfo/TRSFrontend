import React from 'react';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import TermsDetails from '@/components/about/TermsDetails';

export const metadata = {

  title: "Terms & Conditions | True Real Story India",
  description: "Read True Real Story’s Terms & Conditions to understand how we operate, protect your rights, and build a safe platform for India’s startup community.",
  keywords: "terms and conditions, True Real Story terms, user agreement, startup platform policies, India startup terms, legal terms, community guidelines, startup story platform, founder terms, True Real Story India"

};


const page = async () => {

  let termsContent = '';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/get-site-details`, {
      next: { revalidate: 60 }
    });

    const json = await res.json();

    if (json.success && json.data) {
      termsContent = json.data.termsContent;
    }
  } catch (error) {
    console.error('SSR fetch failed:', error.message);
  }

  return (
    <LayoutStyle7 breadCrumb="Terms & Conditions" title="Terms & Conditions">
      <TermsDetails termsContent={termsContent} />
    </LayoutStyle7>
  );
};

export default page;
