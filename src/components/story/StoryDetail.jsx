'use client';

import dayjs from 'dayjs';
import React from 'react';

const StoryDetail = ({ story }) => {
  if (!story) return <p>Story not found.</p>;

  const { title, description, storyImage, createdAt, category } = story;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow">
            
            {storyImage && (
              <img
                src={storyImage}
                className="card-img-top"
                alt={title}
                style={{ maxHeight: '450px', objectFit: 'contain' }}
              />
            )}

            <hr />

            <div className="card-body">
              <h3 className="fw-bold">{title}</h3>
              <div className="text-muted small mb-3">
                {dayjs(story.createdAt).format('DD/MM/YYYY')} |{' '}
                <span className="text-danger fw-bold">{category?.name}</span>
              </div>
              <div
                className="lead"
                dangerouslySetInnerHTML={{ __html: description }}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
