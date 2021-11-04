import React from 'react'
import './navbar.css'

function NavBar() {
    return (
        <nav className="navbar">
            <a className="navbar_content" href='/post'>테마 정보</a>
            <a className="navbar_content" href='/user'>유저 정보</a>
        </nav>
    )
}

export default NavBar
