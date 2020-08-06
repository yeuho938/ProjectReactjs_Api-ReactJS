import React, { Component } from 'react';
import './Header.css';
class Header extends Component {
    render() {
        return (
        <div className="wrapper">
            <nav className="menu">
                <ul className="clearfix">
                <li><a href="#">Trang chủ</a></li>
                <li>
                    <a href="#">Phim <span className="arrow">▼</span></a>
                    <ul className="sub-menu">
                    <li><a href="#">Hành động</a></li>
                    <li><a href="#">Ngôn tình</a></li>
                    <li><a href="#">Hài hước</a></li>
                    <li><a href="#">Cổ trang</a></li>
                    </ul>
                </li>
                <li><a href="#">Ảnh</a></li>
                <li className="current-item"><a href="#">Video</a></li>
                <li><a href="#">Liên hệ</a></li>
                </ul>
            </nav>
        </div>
        );
    }
}

export default Header;