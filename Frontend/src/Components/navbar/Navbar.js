import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Navbar.css";


export default function Navbar() {

 

  const activePage = useLocation();

  return (
    <nav className='navbar sticky-top'>
      <div className="brandBG">
        <span className='brand'>NotifyU-Admins | library</span>
      </div>
      <div className="linksBG">
        <Link className={activePage.pathname === "/" ? ' linkActive link' : "link"} to="/">Books</Link>
        <Link className={activePage.pathname === "/Components/issuedBooks/IssuedBooks" ? 'link linkActive' : "link"} to="/Components/issuedBooks/IssuedBooks">IssuedBooks</Link>
        <Link className={activePage.pathname === "/Components/account/Account" ? 'link linkActive' : "link"} to="/Components/account/Account">Account</Link>
      </div>
    </nav>
  )
}
