'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviews } from '@/redux/slices/interviewSlice';
import slugify from 'slugify';
import Link from 'next/link';

const HomeInterview = () => {
    const dispatch = useDispatch();
    const { all: interviews, loading } = useSelector(state => state.interviews);

    useEffect(() => {
        dispatch(fetchInterviews({ page: 1 }));
    }, [dispatch]);

    const latestInterviews = interviews.slice(0, 6);

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-60">
                <h2 className="mb-0 text-danger">Latest Interviews</h2>
                <Link href="/interviews" className="text-danger text-decoration-underline">See All</Link>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status" />
                </div>
            ) : (
                <div className="row">
                    {latestInterviews.map(item => (
                        <div key={item._id} className="col-md-4 mb-4">
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
                                    <Link href={`/interview/${slugify(item.interviewTitle, { lower: true })}/${item._id}`}>
                                        <h5 className="card-title">{item.interviewTitle}</h5>
                                    </Link>
                                    <p className="card-text text-truncate">{item.excerpt}</p>
                                    <Link
                                        href={`/interview/${slugify(item.interviewTitle, { lower: true })}/${item._id}`}
                                        className="text-danger fw-bold mt-auto"
                                        style={{ fontSize: 13 }}
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeInterview;
