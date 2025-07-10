'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import SocialShare from '../utilities/SocialShare';
import BlogPostComments from './BlogPostComments';
import BlogCommentForm from '../form/BlogCommentForm';
import SearchWidget from '../widgets/SearchWidget';
import RecentPostsWidget from '../widgets/RecentPostsWidget';
import CategoryWidget from '../widgets/CategoryWidget';
import GalleryWidget from '../widgets/GalleryWidget';
import ArchiveWidget from '../widgets/ArchiveWidget';
import FollowWidget from '../widgets/FollowWidget';
import TagsWidget from '../widgets/TagsWidget';
import team2Thumb from '@/assets/img/teams/2.jpg';
import dayjs from 'dayjs';
import axiosInstance from '@/utils/axiosInstance';

const BlogDetail = ({ blog }) => {

    if (!blog) return <p className="text-center py-10">Blog not found.</p>;


    // Client side view count increment
    useEffect(() => {

        if (!blog._id) return;

        const viewedBlogs = JSON.parse(localStorage.getItem("viewedBlogs") || "[]");

        if (!viewedBlogs.includes(blog._id)) {
            axiosInstance
                .put(`/blog/view/${blog._id}`)
                .then(() => {

                    localStorage.setItem(
                        "viewedBlogs",
                        JSON.stringify([...viewedBlogs, blog._id])
                    );
                })
                .catch((error) => {
                    console.error("View count increase failed:", error);
                });
        }
    }, [blog._id]);

    const {
        blogImage,
        blogImageAlt,
        createdAt,
        title,
        description,
        author = 'Admin',
    } = blog;

    return (
        <div className="blog-area single full-blog right-sidebar full-blog default-padding">
            <div className="container">
                <div className="blog-items">
                    <div className="row">
                        {/* Blog Content */}
                        <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
                            <div className="blog-style-two item">
                                <div className="blog-item-box">
                                    <div className="thumb">
                                        <Image
                                            src={blogImage}
                                            alt={blogImageAlt || title}
                                            width={1900}
                                            height={995}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="meta">
                                            <ul>
                                                <li>
                                                    <i className="fas fa-home"></i> {blog?.category?.name}
                                                </li>
                                                <li>
                                                    <i className="fas fa-calendar-alt"></i>{' '}
                                                    {dayjs(createdAt).format('DD/MM/YYYY')} |{' '}
                                                </li>
                                                <li>
                                                    <i className="fas fa-user"></i> {author}
                                                </li>

                                                <li>
                                                    <i className="fas fa-eye"></i> {blog.blog_views}
                                                </li>

                                            </ul>
                                        </div>

                                        <div
                                            className="blog-content-html"
                                            dangerouslySetInnerHTML={{ __html: description }}
                                        />

                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="sidebar col-xl-4 col-lg-5 col-md-12 mt-md-50 mt-xs-50">
                            <aside>

                                <CategoryWidget />
                                <RecentPostsWidget />

                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
