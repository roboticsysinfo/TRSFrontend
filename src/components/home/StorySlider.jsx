"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStories } from "@/redux/slices/storySlice";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify"; // Ensure slugify is installed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StorySlider = ({ sectionClass }) => {
    const dispatch = useDispatch();
    const { stories } = useSelector((state) => state.story);

    useEffect(() => {
        dispatch(getAllStories({ page: 1, limit: 10 }));
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className={sectionClass || ""}>
            <div className="container py-5">
                <div className="row mb-5 d-flex justify-content-between">
                    <div className="col-lg-6">
                        <h2 className="fw-bold mb-0 text-white">Featured Stories</h2>
                    </div>
                    <div className="col-lg-6 text-end">
                        <Link href="/stories" className="fw-text text-white">
                            See All
                        </Link>
                    </div>
                </div>

                <Slider {...settings}>
                    {stories.map((story) => {
                        const slug = slugify(story.title || "story", { lower: true, strict: true });
                        const link = `/story/${slug}/${story._id}`;

                        return (
                            <div key={story._id} className="p-2">
                                <div className="card border-1 shadow-sm h-100 rounded-4 overflow-hidden">
                                    <div className="position-relative" style={{ height: "200px" }}>
                                        <Link href={link}>
                                            <Image
                                                src={story.storyImage || "/default.jpg"}
                                                alt={story.title}
                                                fill
                                                className="object-fit-cover w-100 h-100"
                                            />
                                        </Link>
                                    </div>

                                    <div className="card-body">
                                        <p className="text-uppercase text-danger fw-semibold small mb-1">
                                            {story.category?.name || "-"}
                                        </p>
                                        <Link href={link}>
                                            <h6 className="fw-semibold mb-2" style={{ minHeight: 48 }}>
                                                {story.title?.slice(0, 100)}
                                            </h6>
                                        </Link>
                                        <div className="d-flex justify-content-between text-muted small">
                                            <span>{story.user?.name || "Admin"}</span>
                                            <span>
                                                {new Date(story.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default StorySlider;
