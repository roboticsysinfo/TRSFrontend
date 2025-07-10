"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import useStickyMenu from "../hooks/useStickyMenu";
import useSidebarMenu from "../hooks/useSidebarMenu";
import HeaderLogo from "./HeaderLogo";
import useSubMenuToggle from "../hooks/useSubMenuToggle";
import Link from "next/link";
import logo from "@/assets/img/logo.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout, logoutUser } from "@/redux/slices/authSlice";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const MainHeaderStyle7 = () => {
    const isMenuSticky = useStickyMenu();
    const toggleSubMenu = useSubMenuToggle();
    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get("user");

        console.log("user in header", user);


        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = async () => {
        await dispatch(logoutUser()); // remove server-side cookie
        dispatch(logout()); // clear client state
        router.push("/signin");
    };
    return (

        <>
            <header>
                <nav
                    className={`navbar mobile-sidenav navbar-common navbar-sticky navbar-default validnavs ${isMenuSticky ? "sticked" : "no-background"
                        } ${isOpen ? "navbar-responsive" : ""}`}
                >
                    <div className="container d-flex justify-content-between align-items-center">
                        <HeaderLogo openMenu={openMenu} />
                        <div
                            className={`collapse navbar-collapse collapse-mobile ${isOpen ? "show" : ""
                                }`}
                            id="navbar-menu"
                        >
                            <Image src={logo} alt="Logo" />
                            <button
                                type="button"
                                className="navbar-toggle"
                                onClick={closeMenu}
                            >
                                <i className="fa fa-times"></i>
                            </button>
                            <MainMenu
                                navbarPlacement="navbar-right"
                                isOpen={isOpen}
                                closeMenu={closeMenu}
                                toggleSubMenu={toggleSubMenu}
                            />
                        </div>
                        <div className="attr-right">
                            <div className="attr-nav">
                                <ul style={{ display: "flex", alignItems: 'center' }}>
                                    {!isLoggedIn ? (
                                        <li className="button">
                                            <Link href="/signin">Sign In</Link>
                                        </li>
                                    ) : (
                                        <>
                                            <li className="me-2">

                                                <Link href="/account" className="accountBtn">
                                                    <FaUser className="me-1" />
                                                    Account
                                                </Link>
                                            </li>
                                            <li>
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={handleLogout}
                                                    className="d-flex align-items-center fw-bold text-danger "
                                                >
                                                    <FaSignOutAlt className="me-1" />
                                                    Sign Out
                                                </span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`overlay-screen ${isOpen ? "opened" : ""}`}
                        onClick={closeMenu}
                    ></div>
                </nav>
            </header>
        </>

    );
};

export default MainHeaderStyle7;
