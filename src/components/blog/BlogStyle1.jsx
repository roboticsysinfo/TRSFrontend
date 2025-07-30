'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/redux/slices/blogSlice';
import SingleBlog1 from './SingleBlog1';

const BlogStyle1 = ({ sectionClass }) => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs({ page: 1, limit: 8 }));
  }, [dispatch]);



  return (
    <>
      <div className={`home-blog-area default-padding bottom-less ${sectionClass || ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h2 className="title">Latest Blogs</h2>
                <div className="devider"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {loading ? (
              <div className="text-center py-5 w-100">
                <div className="spinner-border text-danger" />
              </div>
            ) : (
              blogs.slice(0, 8).map((blog, index) => (
                <SingleBlog1
                  key={blog._id}
                  blog={{
                    id: blog._id,
                    thumb: blog.blogImage || 'default.jpg',
                    date: new Date(blog.createdAt).toLocaleDateString('en-IN'),
                    animationDelay: `${0.1 * (index + 1)}s`,
                    author: blog.author || 'Admin',
                    title: blog.title,
                    category: blog.category?.name || '-',
                    btnText: 'Read More',
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogStyle1;
