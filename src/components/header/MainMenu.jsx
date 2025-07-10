import React from 'react';
import Link from 'next/link';

const MainMenu = ({ toggleSubMenu, navbarPlacement }) => {
    return (
        <>
            <ul className={`nav navbar-nav ${navbarPlacement}`} data-in="fadeInDown" data-out="fadeOutUp">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/companies">Companies</Link></li>
                <li><Link href="/stories">Stories</Link></li>
                <li><Link href="/news-blogs">News/Blogs</Link></li>

                <li className="dropdown">
                    <Link href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={toggleSubMenu}>Blog</Link>
                    <ul className="dropdown-menu">
                        <li><Link href="/blog-standard">Blog Standard</Link></li>
                        <li><Link href="/blog-with-sidebar">Blog With Sidebar</Link></li>
                        <li><Link href="/blog-2-column">Blog Grid Two Colum</Link></li>
                        <li><Link href="/blog-3-column">Blog Grid Three Colum</Link></li>
                        <li><Link href="/blog-single/1">Blog Single</Link></li>
                        <li><Link href="/blog-single-with-sidebar/1">Blog Single With Sidebar</Link></li>
                    </ul>
                </li>
                
                <li><Link href="/contact-us">contact</Link></li>

            </ul>
        </>
    );
};

export default MainMenu;