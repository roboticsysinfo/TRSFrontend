import React from 'react';
import StoryDetail from '@/components/story/StoryDetail';
import { getStoryById } from '@/redux/slices/storySlice';
import { wrapper } from '@/redux/store';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

export const dynamic = 'force-dynamic';

// Helper to strip HTML and limit to 100 words
function sanitizeAndTrimDescription(htmlString) {
  if (!htmlString) return '';
  const plainText = htmlString.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const words = plainText.split(' ');
  return words.slice(0, 100).join(' ');
}

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-story/${params.id}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const story = data?.data;

    return {
      title: story?.metaTitle || story?.title,
      description: story?.metaDescription || sanitizeAndTrimDescription(story?.description),
      keywords: story?.metaKeywords || ' ',
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

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single-story/${id}`, {
    next: { revalidate: 60 }
  });
  const result = await response.json();

  const story = result?.data || null;

  return (
    <>
      <LayoutStyle7 breadCrumb="Story" title={story?.title}>
        <StoryDetail story={story} />
      </LayoutStyle7>
    </>
  );
};

export default StoryDetailPage;
