'use client';
import React, { useEffect, useState } from 'react';
import api from '@/utils/axiosInstance';
import Link from 'next/link';

const FeaturedStartupStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStartupStories = async () => {
            try {
                const res = await api.get('/startup-stories?page=1&limit=8');
                setStories(res.data?.data?.stories || []);
            } catch (error) {
                console.error("Failed to load startup stories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStartupStories();
    }, []);

    return (
        <div className="container py-5 mt-5">

            <div className="row mb-5 d-flex justify-content-center">

                <div className="col-lg-8 text-center">
                    <h2 className="fw-bold mb-0 text-danger">Featured Startup Stories</h2>
                </div>


            </div>

            <div className="row g-4">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-danger" />
                    </div>
                ) : (
                    stories.map((story) => (
                        <div className="col-md-6" key={story._id}>
                            <div className="card h-100 border-1 shadow-sm startup-card">
                                <div className="row g-0">
                                    <div className="col-md-7">
                                        <img
                                            src={story.storyImage}
                                            alt={story.title}
                                            className="img-fluid rounded-start story-img"
                                        />
                                    </div>
                                    <div className="col-md-5 d-flex flex-column justify-content-center">
                                        <div className="card-body">
                                            <p className="text-uppercase text-danger mb-1 fw-bold small" style={{fontSize: 14}}>
                                                {story.category?.name}
                                            </p>
                                            <h5 className="card-title fw-bold mb-2">
                                                {story.title.length > 80
                                                    ? story.title.slice(0, 80) + '…'
                                                    : story.title}
                                            </h5>
                                            <div className="text-muted small">
                                                {story.user?.name || 'Unknown'} &nbsp;&nbsp;•&nbsp;&nbsp;
                                                {new Date(story.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <div className="col-lg-12 text-center">
                    <Link href="/startup-stories" className="button">
                        See All
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default FeaturedStartupStories;
