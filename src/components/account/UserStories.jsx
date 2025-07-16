'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoriesByUserId } from '@/redux/slices/storySlice';
import Link from 'next/link';
import slugify from 'slugify';

const UserStories = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const { stories, totalPages, currentPage, loading } = useSelector((state) => state.story);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(getStoriesByUserId({ userId, page, search }));
    }
  }, [dispatch, userId, page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(getStoriesByUserId({ userId, page: 1, search }));
  };

  const createSlug = (title) => {
    return slugify(title, { lower: true, strict: true });
  };

  return (
    <div className="container py-4">
      {/* 🔹 Heading and Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark mb-0">Your Stories</h4>
        <Link href="/account/add-story" className="btn btn-danger">
          + Add Story
        </Link>
      </div>

      <hr />

      {/* 🔍 Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="row g-2">
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger w-100" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>

      {/* 🔄 Loader */}
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-danger" role="status"></div>
        </div>
      ) : stories.length === 0 ? (
        <p className="text-muted">No stories found.</p>
      ) : (
        <div className="row g-4">
          {stories.map((story) => (
            <div className="col-md-4" key={story._id}>
              <div className="card shadow-sm border-0 h-100">
                <Link
                  href={`/story/${createSlug(story.title)}/${story._id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={story.storyImage || '/placeholder.jpg'}
                    className="card-img-top"
                    alt={story.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <small className="text-muted d-block mb-1">
                      {new Date(story.createdAt).toLocaleDateString()}
                    </small>
                    <h5 className="card-title fw-bold" style={{ fontSize: '1rem' }}>
                      {story.title}
                    </h5>
                    <p className="card-text" style={{ fontSize: '0.95rem' }}>
                      {story.description.length > 100
                        ? `${story.description.slice(0, 100)}...`
                        : story.description}
                    </p>
                    <span className="badge bg-light text-danger fw-bold px-2 py-1">
                      {story.category?.name || 'NEWS'}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4 d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${i + 1 === page ? 'active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                <button className="page-link">{i + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default UserStories;
