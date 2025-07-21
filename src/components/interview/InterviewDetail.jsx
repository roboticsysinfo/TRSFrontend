import React from 'react';

const InterviewDetail = ({ interview }) => {

    console.log("interview", interview);


    return (
        <div className="container my-5">
            {/* Header */}
            <h2 className="fw-bold mb-2">{interview?.interviewTitle || 'N/A'}</h2>
            <p className="text-muted fs-5 mb-4">{interview?.excerpt || 'N/A'}</p>

            {/* Profile section */}
            <div className="d-flex align-items-start border-top border-bottom py-3">
                <img
                    src="https://via.placeholder.com/60"
                    alt={interview?.personName || 'N/A'}
                    className="rounded me-3"
                    width="60"
                    height="60"
                />
                <div>
                    <h6 className="mb-1 fw-semibold">{interview?.personName || 'N/A'}</h6>
                    <p className="mb-1 text-muted">{interview?.designation || 'N/A'}</p>
                    
                </div>
            </div>

            {/* Q&A 1 */}
            <div className="mt-4">
                <p className="mb-1 fw-semibold">Q: What motivated you to start coding?</p>
                <p className="mb-3">A: Growing up, I loved logic puzzles and chang—</p>
            </div>

            {/* Quote block */}
            <blockquote className="blockquote bg-light p-4 rounded border-start border-4">
                <p className="mb-0 fs-5 fw-semibold">
                    <i className="bi bi-quote fs-4 me-2"></i>
                    Every failure taught me more than any success.
                </p>
            </blockquote>

            {/* Q&A 2 */}
            <div className="mt-4">
                <p className="mb-1 fw-semibold">Q: How do you handle burnout?</p>
                <p className="mb-3">A: I disconnect. Walks, books, and no-code weekends.</p>
            </div>

            {/* Socials */}
            <div className="d-flex gap-3 align-items-center border-top pt-3 mt-4">
                <a href="#" className="text-decoration-none">
                    <i className="bi bi-whatsapp"></i> WhatsApp
                </a>
                <a href="#" className="text-decoration-none">
                    <i className="bi bi-linkedin"></i> Linddhen
                </a>
                <a href="#" className="text-decoration-none">
                    <i className="bi bi-twitter-x"></i> X
                </a>
            </div>


        </div>
    );
};

export default InterviewDetail;
