'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviews } from '@/redux/slices/interviewSlice';
import slugify from 'slugify';

const InterviewList = () => {
    
    const dispatch = useDispatch();
    const { all: interviews, pagination, loading } = useSelector(state => state.interviews);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    
    useEffect(() => {
        dispatch(fetchInterviews({ page, search }));
    }, [dispatch, page, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // reset to first page on new search
        dispatch(fetchInterviews({ page: 1, search }));
    };

    return (
        <div className="container my-5">

            <div className='row justify-content-center'>
                <div className='col-lg-8'>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mb-60">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search interviews..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </form>

                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status" />
                </div>
            ) : (
                <>
                    {/* Interview Cards */}
                    <div className="row">
                        {interviews.map((item) => (
                            <div key={item._id} className="col-md-4 col-lg-4 mb-4">
                                <div className="card h-100 shadow">
                                    {item.interviewImage && (
                                        <img
                                            src={item.interviewImage}
                                            className="card-img-top"
                                            alt={item.interviewTitle}
                                            style={{ objectFit: 'cover', height: '250px' }}
                                        />
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h4 className="card-title">{item.interviewTitle}</h4>
                                        <p className="card-text text-truncate">{item.excerpt}</p>
                                        <a href={`/interview/${slugify(item.interviewTitle, { lower: true })}/${item._id}`} className="text-danger fw-bold mt-auto" style={{ fontSize: 12 }}>
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <nav className="d-flex justify-content-center">
                        <ul className="pagination">
                            {Array.from({ length: pagination.totalPages }, (_, i) => (
                                <li
                                    key={i + 1}
                                    className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`}
                                    onClick={() => setPage(i + 1)}
                                >
                                    <button className="page-link">{i + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default InterviewList;
