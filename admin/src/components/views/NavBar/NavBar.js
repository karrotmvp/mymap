import React from 'react'
import './navbar.css'
import '../../../index.css'

function NavBar() {
    return (
        <nav className="navbar container">
            <a className="navbar_content" href='/post'>테마 정보</a>
            <a className="navbar_content" href='/user'>유저 정보</a>
            <a className="navbar_content" href='/notification'>알림톡 보내기</a>
            <a className="navbar_content" href='/recommend'>추천 장소 관리</a>
        </nav>
    )
}

export default NavBar
