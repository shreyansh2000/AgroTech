import React, { useState, useEffect } from "react";
import "../header/header.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { doSignOut } from '../../firebase/auth'
import { useAuth } from '../../contexts/authContext'
import { auth } from "../../firebase/firebase";

const Header = () => {
    const { userLoggedIn } = useAuth();
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navBarVisible, setNavBarVisible] = useState(true);
    const [emailVerification, setEmailVerification] = useState(false);


    useEffect(() => {
        auth.onAuthStateChanged((userLoggedIn) => {
            if (userLoggedIn && userLoggedIn.emailVerified === false) {
                setEmailVerification(false);      
                console.log(userLoggedIn);
            } else {
                setEmailVerification(true);
                console.log()
            }
        });
     }, [userLoggedIn]);
     

    function handleLogout() {
        const isConfirmed = window.confirm("Are you sure you want to logout?");
        if (isConfirmed) {
            doSignOut();
        } else {
            return;
        }
    }

    function handleHistory() {
        console.log("History");
    }

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            setNavBarVisible(false);
        } else {
            setNavBarVisible(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
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
                       {userLoggedIn && emailVerification && (
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
