import React from 'react';
import StoryDetail from '@/components/story/StoryDetail';
import { getStoryById } from '@/redux/slices/storySlice';
import { wrapper } from '@/redux/store';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-story/${params.id}`, {
      next: { revalidate: 60 }, // or use: cache: 'no-store'
    });
    const data = await res.json();
    const story = data?.data;

    return {
      title: story?.metaTitle || 'story Profile',
      description: story?.metaDescription || 'story detail page',
      keywords: story?.metaKeywords || 'story detail page',
    };
  } catch {
    return {
      title: 'Stories',
      description: 'Stories Detail page',
    };
  }
}

const StoryDetailPage = async ({ params }) => {
    const { id } = params;

    // Fetch from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-story/${id}`, {
        next: { revalidate: 60 }
    });
    const result = await response.json();

    const story = result?.data || null;

    return (

        <>
            <LayoutStyle7 breadCrumb="Story" title={story?.title}>
                <StoryDetail story={story} />;
            </LayoutStyle7>
        </>


    )


};

export default StoryDetailPage;
