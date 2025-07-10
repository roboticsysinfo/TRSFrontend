"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify"; // ✅ import slugify
import { fetchBlogs } from "@/redux/slices/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, pagination, loading } = useSelector((state) => state.blog);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs({ page, limit: 6, search }));
  }, [dispatch, page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
    handleSmoothScroll({ preventDefault: () => {} });
  };

  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="blog-area blog-grid default-padding">
      <div className="container">
        {/* 🔍 Search */}
        <div className="row mb-4">
          <div className="col-md-6 offset-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search blogs..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="blog-item-box">
          <div className="row">
            {blogs.map((blog) => {
              const slug = slugify(blog.title, { lower: true, strict: true });
              const url = `/blog/${slug}/${blog._id}`;

              return (
                <div className="col-md-4 mb-4 single-item" key={blog._id}>
                  <div className="blog-style-one border rounded overflow-hidden shadow-sm">
                    <div className="thumb">
                      <Link href={url}>
                        <Image
                          src={blog.blogImage}
                          width={800}
                          height={600}
                          alt={blog.blogImageAlt || blog.title}
                          className="img-fluid w-100"
                        />
                      </Link>
                    </div>
                    <div className="info p-3">
                      <div className="blog-meta mb-2">
                        <ul className="list-inline text-muted small mb-0">
                          <li className="list-inline-item">
                            <i className="far fa-user"></i> Admin
                          </li>
                          <li className="list-inline-item">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </li>
                        </ul>
                      </div>
                      <h5 className="mb-2">
                        <Link href={url}>{blog.title}</Link>
                      </h5>
                      <Link href={url} className="btn-simple">
                        <i className="fas fa-arrow-right me-1"></i> Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 pagi-area text-center">
            {/* 📄 Pagination */}
            {totalPages > 1 && (
              <nav className="mt-4" aria-label="navigation">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <Link href="#" className="page-link" onClick={(e) => page > 1 && handlePageClick(page - 1)}>
                      <i className="fas fa-angle-double-left"></i>
                    </Link>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                      <Link href="#" className="page-link" onClick={() => handlePageClick(i + 1)}>
                        {i + 1}
                      </Link>
                    </li>
                  ))}
                  <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                    <Link href="#" className="page-link" onClick={(e) => page < totalPages && handlePageClick(page + 1)}>
                      <i className="fas fa-angle-double-right"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
