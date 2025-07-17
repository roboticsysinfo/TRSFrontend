'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStartupStories } from '@/redux/slices/storySlice';
import slugify from 'slugify';
import Link from 'next/link';

const StartupStories = () => {
  const dispatch = useDispatch();
  const { startupStories: stories, totalPages, loading } = useSelector(state => state.story);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getStartupStories({ page, limit: 6, search, isVerified: true }));
  }, [dispatch, page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="container py-5 my-5">
      {/* Search bar */}
      <div className="row justify-content-center mb-60">
        <div className="col-md-6">
          <form onSubmit={handleSearch} className="input-group p-3 bg-danger shadow-sm" style={{ borderRadius: 8 }}>
            <span className="input-group-text bg-white border-end-0 rounded-start-pill">
              <i className="fa fa-search text-danger"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 rounded-end-pill px-3 py-2"
              placeholder="Search startup stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ borderLeft: "none" }}
            />
          </form>
        </div>
      </div>

      {/* Stories Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger"></div>
        </div>
      ) : (
        <div className="row g-4">
          {stories.filter(story => story.isVerified).length === 0 ? (
            <p className="text-muted text-center">No stories found.</p>
          ) : (
            stories
              .filter(story => story.isVerified)
              .map(story => (
                <div className="col-md-3" key={story._id}>
                  <Link
                    href={`/story/${slugify(story.title)}/${story._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card h-100 shadow-sm border-1">
                      <img
                        src={story.storyImage || '/placeholder.jpg'}
                        className="card-img-top"
                        alt={story.title}
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <small className="text-muted d-block mb-1">
                          {new Date(story.createdAt).toLocaleDateString('en-IN')}
                        </small>
                        <h6 className="fw-bold">{story.title}</h6>
                        <div
                          className="card-text"
                          dangerouslySetInnerHTML={{
                            __html: story.description.length > 150
                              ? `${story.description.slice(0, 150)}...`
                              : story.description
                          }}
                        />
                        <span className="badge bg-light text-danger fw-semibold">
                          {story.category?.name || 'Story'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
          )}
        </div>
      )}

      {/* Pagination */}
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

export default StartupStories;
