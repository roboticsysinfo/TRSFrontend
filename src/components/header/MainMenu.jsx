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
                <li><Link href="/blogs">Blogs</Link></li>
                
                <li><Link href="/contact-us">contact</Link></li>

            </ul>
        </>
    );
};

export default MainMenu;