import React from 'react';
import BlogDetail from '@/components/blog/BlogDetail';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';


export async function generateMetadata({ params }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single/blog/${params.id}`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });
        const data = await res.json();
        const blog = data?.data;

        return {
            title: blog?.title || 'Blog Detail',
            description: blog?.metaDescription || 'Blog detail page',
            keywords: blog?.metaKeywords || 'Blog Keywords',
        };
    } catch (error) {
        return {
            title: 'Blog Detail',
            description: 'Blog detail page',
            keywords: blog?.metaKeywords || 'Blog Keywords',
        };
    }
}


const BlogPage = async ({ params }) => {
    const { id } = params;

    let blog = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/single/blog/${id}`, {
            next: { revalidate: 60 }, // Enables Incremental Static Regeneration
        });
        const data = await res.json();
        blog = data?.data;
    } catch (error) {
        console.error('Failed to fetch blog:', error);
    }

    return (
        <LayoutStyle7 breadCrumb={blog?.title || 'Blog'} title={blog?.title || 'Blog'}>
            <BlogDetail blog={blog} />
        </LayoutStyle7>
    );
};

export default BlogPage;
