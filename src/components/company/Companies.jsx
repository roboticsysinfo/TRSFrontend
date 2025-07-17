"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categorySlice';
import { fetchCompanies } from '../../redux/slices/companySlice';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import slugify from 'slugify';

export default function Companies() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { companies } = useSelector((state) => state.companies);

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCompanies());
  }, [dispatch]);

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 50);

  const filteredCompanies = companies
    .filter(company => company.isVerified)
    .filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(company =>
      selectedCategoryId ? company.category?._id === selectedCategoryId : true
    );

  return (
    <>
      <div className="bg-dark" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
            <h2 className="mb-3 mb-md-0 text-white fw-bold">Explore Companies</h2>
            <div className="input-group" style={{ maxWidth: '400px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 py-5">
        <div className="row">
          {/* Left Sidebar - Categories */}
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">Categories</h5>

            {/* "All" Category */}
            <span
              className={`badge me-2 mb-2 p-2 d-inline-block ${!selectedCategoryId ? 'bg-danger text-white' : 'bg-light text-dark'}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCategoryId(null)}
            >
              All
            </span>

            {/* Dynamic Categories */}
            {visibleCategories.map((cat, i) => (
              <span
                key={i}
                className={`badge me-2 mb-2 p-2 d-inline-block ${selectedCategoryId === cat._id ? 'bg-danger text-white' : 'bg-light text-dark'}`}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setSelectedCategoryId(selectedCategoryId === cat._id ? null : cat._id)
                }
              >
                {cat.name}
              </span>
            ))}

            {categories.length > 50 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="btn btn-sm btn-outline-secondary mt-2"
              >
                {showAllCategories ? 'Show Less' : 'See More'}
              </button>
            )}
          </div>

          {/* Right Column - Companies */}
          <div className="col-md-10">
            <div className="row">
              {filteredCompanies.map((company, i) => (
                <div className="col-md-4 mb-4" key={i}>
                  <div className="card company-card shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <Link
                            href={`/company/${slugify(company.name, { lower: true })}/${company._id}`}
                            // style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <img
                              src={company.logo || '/placeholder.png'}
                              alt={company.name}
                              style={{ width: 80, height: 80, objectFit: 'contain', borderWidth: 1, borderColor: "#ddd" }}
                              className="me-2"
                            />
                            <h5 className="mb-0">{company.name}</h5>
                          </Link>
                        </div>
                        <span className="badge bg-secondary" style={{ letterSpacing: 0.9 }}>
                          {company.businessModel}
                        </span>
                      </div>
                      <p className="text-muted small mb-2 about-text">
                        {company.about?.split(' ').slice(0, 50).join(' ')}
                      </p>
                      <div className="mb-2">
                        {company.category?.name && (
                          <span className="badge bg-light text-dark me-2 mb-2 d-inline-block">
                            {company.category.name}
                          </span>
                        )}
                      </div>
                      <div className="d-flex align-items-center text-muted small">
                        <i className="bi bi-geo-alt me-1"></i>
                        {company.headquarter || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCompanies.length === 0 && (
                <p className="text-muted text-center">No companies found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
