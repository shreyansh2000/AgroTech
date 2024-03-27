import React, { useState, useEffect } from "react";
import "../header/header.css";
import { NavLink } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { doSignOut } from '../../firebase/auth'
import { useAuth } from '../../contexts/authContext'



const Header = () => {
    const { userLoggedIn } = useAuth()
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navBarVisible, setNavBarVisible] = useState(true);

function handleLogout() {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    
    // If user confirms logout, execute logout logic
    if (isConfirmed) {
        doSignOut();
    } else {
        // If user cancels, do nothing
        return;
    }
}

    
   function handleHistory()
   {
    console.log("History")

   }

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
            <span>A<NavLink to="/">groTech</NavLink></span>
        </h2>
        </div>

    <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
        <ul>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/AboutUs">About</NavLink></li>
            <li><NavLink to="/InformationHub">InformationHub</NavLink></li>
            {userLoggedIn && (
                  <>
             <li>
             <NavLink to="/history">
            <button onClick={handleHistory}>History</button>
              </NavLink>
             </li>
              <li>
              <NavLink to="/">
              <button onClick={handleLogout}>Logout</button>
               </NavLink>
              
              </li>
              </>
            )}
        </ul>
    </div>
</nav>

        </>
    );
}

export default Header;