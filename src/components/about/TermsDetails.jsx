import React from 'react';

const TermsDetails = ({ termsContent }) => {
  return (
    <div className="about-container" style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Terms & Condition
      </h1>
      <div
        className="about-content"
        dangerouslySetInnerHTML={{ __html: termsContent || '' }}
        style={{ lineHeight: 1.8, fontSize: '16px', color: '#333' }}
      />
    </div>
  );
};

export default TermsDetails;
