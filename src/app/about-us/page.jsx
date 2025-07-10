import React from 'react';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import AboutDetails from '@/components/about/AboutDetails';

export const metadata = {
  title: "About True Real Story | Real Startup Stories & Entrepreneur Success Journeys in India",
  description: "Discover real startup stories and founder journeys on True Real Story. Share your story and inspire India’s next generation of entrepreneurs.",
  keywords: "about true real story, real startup stories India, entrepreneur success, startup case studies"
};

const AboutUsPage = async () => {
  let aboutTitle = 'About Us';
  let aboutContent = '';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/get-site-details`, {
      next: { revalidate: 3600 }, // optional: revalidate every hour
      cache: 'no-store',
    });

    const json = await res.json();

    if (json.success && json.data) {
      aboutTitle = json.data.aboutTitle;
      aboutContent = json.data.aboutContent;
    }
  } catch (error) {
    console.error('SSR fetch failed:', error.message);
  }

  return (
    <LayoutStyle7 breadCrumb="About-us" title="About Us">
      <AboutDetails aboutTitle={aboutTitle} aboutContent={aboutContent} />
    </LayoutStyle7>
  );
};

export default AboutUsPage;
