import React from 'react';

const InterviewDetail = ({ interview }) => {
    if (!interview) return null;

    return (
        <div className="container my-5">
            {/* Title & Excerpt */}
            <h2 className="fw-bold mb-2">{interview?.interviewTitle || 'N/A'}</h2>
            <p className="text-muted fs-5 mb-4">{interview?.excerpt || 'N/A'}</p>

            {/* Profile Info */}
            <div className="d-flex align-items-center border-top border-bottom py-3">
                <img
                    src={interview?.profileImage || 'https://via.placeholder.com/60'}
                    alt={interview?.personName || 'N/A'}
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                    style={{ width: 60, height: 60 }}
                />
                <div>
                    <h6 className="mb-1 fw-semibold">{interview?.personName || 'N/A'}</h6>
                    <p className="mb-1 text-muted">{interview?.designation || 'N/A'}</p>
                </div>
            </div>

            {/* Interview Image */}
            {interview?.interviewImage && (
                <div className="text-center mb-4">
                    <img
                        src={interview.interviewImage}
                        alt={interview?.interviewTitle || 'Interview'}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: 400, objectFit: 'cover' }}
                    />
                </div>
            )}

            {/* Q&A Section */}
            {Array.isArray(interview.qa) && interview.qa.length > 0 && (
                <div className="mt-4">
                    {interview.qa.map((item, index) => (
                        <div key={item._id || index} className="mb-4">
                            <p className="mb-1 fw-semibold">Q: {item.question}</p>
                            <p className="mb-0">A: {item.answer}</p>
                        </div>
                    ))}
                </div>
            )}


            {/* Social Share */}
            <div className="d-flex flex-wrap gap-3 align-items-center border-top pt-3 mt-4">
                {typeof window !== 'undefined' && (
                    <>
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                `${interview?.interviewTitle}\n${window.location.href}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-dark d-flex align-items-center"
                        >
                            <i className="fi fi-brands-whatsapp me-1"></i> WhatsApp
                        </a>

                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                                window.location.href
                            )}&title=${encodeURIComponent(interview?.interviewTitle || '')}&summary=${encodeURIComponent(
                                interview?.excerpt || ''
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-dark d-flex align-items-center"
                        >
                            <i className="fi fi-brands-linkedin me-1"></i> LinkedIn
                        </a>

                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                window.location.href
                            )}&text=${encodeURIComponent(interview?.interviewTitle || '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-dark d-flex align-items-center"
                        >
                            <i className="fi fi-brands-twitter me-1"></i> Twitter
                        </a>

                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                window.location.href
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-dark d-flex align-items-center"
                        >
                            <i className="fi fi-brands-facebook me-1"></i> Facebook
                        </a>

                        <a
                            href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                                window.location.href
                            )}&description=${encodeURIComponent(interview?.interviewTitle || '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-dark d-flex align-items-center"
                        >
                            <i className="fi fi-brands-pinterest me-1"></i> Pinterest
                        </a>

                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-dark d-flex align-items-center"
                        >
                            <i className="fi fi-brands-instagram me-1"></i> Instagram
                        </a>
                    </>
                )}
            </div>

        </div>
    );
};

export default InterviewDetail;
