import React, { useState, useEffect } from "react";
import "../header/header.css";
import { NavLink } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navBarVisible, setNavBarVisible] = useState(true);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            // if scroll down hide the navbar
            setNavBarVisible(false);
        } else {
            // if scroll up show the navbar
            setNavBarVisible(true);
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return (  
        <>
            <nav className={`main-nav ${!navBarVisible ? 'nav-hidden' : ''}`}>
                <div className="logo">
                    <h2>
                        <span>T</span>omato
                    </h2>
                </div>
  
                <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/AboutUs">About</NavLink></li>
                        <li><NavLink to="/InformationHub">InformationHub</NavLink></li>
                    </ul>
                </div>
  
                
            </nav>
        </>
    );
}

export default Header;