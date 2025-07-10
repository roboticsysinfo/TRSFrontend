'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStories } from '@/redux/slices/storySlice';
import { fetchCategories } from '@/redux/slices/categorySlice';
import slugify from 'slugify';
import Link from 'next/link';

const AllStories = () => {

  const dispatch = useDispatch();
  const { stories, totalPages, loading } = useSelector(state => state.story);
  const { categories } = useSelector(state => state.categories);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllStories({ page, limit: 6, search, categoryId: selectedCategory, isVerified: true }));
  }, [dispatch, page, search, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearch('');
    setPage(1);
  };

  return (
    <div className="container py-5 my-5">
      <div className="row">

        {/* Sidebar Filters */}
        <div className="col-md-3 mb-4">
          <h5>Filters</h5>
          <span onClick={clearFilters} className="badge bg-danger text-white me-2 mb-2 p-2 d-inline-block" style={{ cursor: "pointer" }}>Clear filters</span>

          <form onSubmit={handleSearch} className="my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <h4 className="my-4">Categories</h4>
          <div className="d-flex flex-wrap gap-2">
            {categories.map(cat => (
              <span
                key={cat._id}
                className="badge bg-light text-dark me-2 mb-2 p-2 d-inline-block"
                onClick={() => handleCategorySelect(cat._id)}
                style={{ cursor: "pointer" }}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="col-md-9">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger"></div>
            </div>
          ) : (
            <div className="row g-4">
              {stories.filter(story => story.isVerified).length === 0 ? (
                <p className="text-muted">No stories found.</p>
              ) : (
                stories
                  .filter(story => story.isVerified) // ✅ Only verified
                  .map(story => (
                    <div className="col-md-4" key={story._id}>
                      <Link
                        href={`/story/${slugify(story.title)}/${story._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="card h-100 shadow-sm border-0">
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
                            <p className="card-text">
                              {story.description.length > 100
                                ? `${story.description.slice(0, 100)}...`
                                : story.description}
                            </p>
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
      </div>
    </div>
  );
};

export default AllStories;
