"use client"
import Image from 'next/image';
import React, { useEffect } from 'react';
import shape7 from '@/assets/img/shape/7.png';
import shape9 from '@/assets/img/shape/9.png';
import logoLight from '@/assets/img/logo.png';
import Link from 'next/link';
import FooterNewsLetter from '../form/FooterNewsLetter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSiteDetail } from '@/redux/slices/siteDetailSlice';

const FooterStyle1 = ({ shape, shapeClass, logo, formStyle }) => {

    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.siteDetail);

    useEffect(() => {
        dispatch(fetchSiteDetail());
    }, [dispatch]);


    return (
        <>
            <footer className="bg-dark text-light">

                <div className="footer-shape">
                    <div className={`item ${shapeClass}`}>
                        {shape ? <Image src={shape} alt="Shape" /> : <Image src={shape7} alt="Shape" />}
                    </div>
                    <div className="item">
                        <Image src={shape9} alt="Shape" />
                    </div>
                </div>

                <div className="container">
                    <div className="f-items relative pt-70 pb-120 pt-xs-0 pb-xs-50">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 footer-item pr-50 pr-xs-15">
                                <div className="f-item about">
                                    <Link href="/">

                                        {logo ? <Image className="logo" src={logo} alt="Logo" /> : <Image className="logo" src={logoLight} alt="Logo" />}
                                    </Link>

                                    <div
                                        className="about-content"
                                        dangerouslySetInnerHTML={{ __html: data?.footerAbout || '' }}
                                        style={{ lineHeight: 1.8, fontSize: '16px', color: '#333' }}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 footer-item">
                                <div className="f-item link">
                                    <h4 className="widget-title">Our Company</h4>
                                    <ul>
                                        <li>
                                            <Link href="/companies">Browse Companies</Link>
                                        </li>
                                        <li>
                                            <Link href="/stories">Startup Stories</Link>
                                        </li>
                                        <li>
                                            <Link href="/about-us">About Us</Link>
                                        </li>
                                        <li>
                                            <Link href="/news-blogs">News & Blogs</Link>
                                        </li>
                                        <li>
                                            <Link href="/contact-us">Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 footer-item">
                                <div className="f-item link">
                                    <h4 className="widget-title">Our Services</h4>
                                    <ul>

                                        <li>
                                            <Link href="/account/list-my-company">List Startup</Link>
                                        </li>
                                        <li>
                                            <Link href="/account">Account</Link>
                                        </li>
                                        <li>
                                            <Link href="/interviews">Interviews</Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            
                            <div className="col-lg-4 col-md-6 footer-item">
                                <h4 className="widget-title">Newsletter</h4>
                                <p>
                                    Join our subscribers list to get the latest <br /> news and special offers.
                                </p>
                                <div className={`f-item newsletter ${formStyle}`}>
                                    <FooterNewsLetter />
                                </div>

                                <ul className="footer-social">
                                    {data?.socialMedia?.map((item) => (
                                        <li key={item._id}>
                                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                <i className={item?.icon} style={{ fontFamily: "Font Awesome 5 Brands" }}></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <p>&copy; Copyright {(new Date().getFullYear())}. All Rights Reserved by <a href="/" target='_blank'>True Real Story</a></p>
                            </div>
                            <div className="col-lg-6 text-end">
                                <ul>
                                    <li>
                                        <Link href="/terms-and-conditions">Terms</Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy">Privacy</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterStyle1;