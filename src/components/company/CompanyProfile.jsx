'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
    FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,
    FaGoogle,
} from 'react-icons/fa';

const CompanyProfile = ({ company }) => {



    return (
        <div className="container my-5">
            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start">

                        <div className="d-flex align-items-start">
                            
                            <div className="me-3 rounded-circle overflow-hidden" style={{ width: 60, height: 60, position: 'relative' }}>
                                <Image
                                    src={
                                        company?.logo && company.logo.trim() !== ''
                                            ? company.logo
                                            : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                                    }
                                    alt={`${company?.name || 'Company'} Logo`}
                                    fill
                                    className="object-contain"
                                />
                            </div>


                            <div>

                                <h2 className="mb-1 fw-bold">{company?.name}</h2>
                                <p className="mb-1 text-muted small">{company?.headquarter || 'Location not specified'}</p>

                                <div className="d-flex gap-2">

                                    {company?.socialMedia?.linkedin && (
                                        <Link href={company.socialMedia.linkedin} target="_blank" className="text-muted fs-5"><FaLinkedinIn /></Link>
                                    )}
                                    {company?.socialMedia?.twitter && (
                                        <Link href={company.socialMedia.twitter} target="_blank" className="text-muted fs-5"><FaTwitter /></Link>
                                    )}
                                    {company?.socialMedia?.instagram && (
                                        <Link href={company.socialMedia.instagram} target="_blank" className="text-muted fs-5"><FaInstagram /></Link>
                                    )}
                                    {company?.socialMedia?.facebook && (
                                        <Link href={company.socialMedia.facebook} target="_blank" className="text-muted fs-5"><FaFacebookF /></Link>
                                    )}
                                    {company?.socialMedia?.googleMyBusiness && (
                                        <Link href={company.socialMedia.googleMyBusiness} target="_blank" className="text-muted fs-5"><FaGoogle /></Link>
                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="d-flex gap-2">
                            <span className=' '> {company?.category?.name || '-'}</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* About + Info Section */}
            <div className="row mt-4">
                <div className="col-md-8">
                    <div className="mb-4">
                        <h6 className="fw-bold mb-2">About</h6>
                        <p className="text-muted">{company?.about}</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-3">
                        <h6 className="fw-bold">More Information</h6>
                        <ul className="list-unstyled small mb-0">
                            <li><strong>Legal Name:</strong> {company?.legalName || '-'}</li>
                            <li><strong>Business Model:</strong> {company?.businessModel || '-'}</li>
                            <li><strong>Employees:</strong> {company?.noOfEmployees || '-'}</li>
                            <li><strong>Founded:</strong> {company?.foundingDate || '-'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;
