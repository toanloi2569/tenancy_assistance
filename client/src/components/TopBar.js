import React, { Component } from 'react';


export default class TopBar extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <a className="navbar-brand logo_h" href="/"><img src="image/Logo.png" alt="" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul className="nav navbar-nav menu_nav ml-auto">
                            <li className="nav-item submenu dropdown">
                                <a  className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Khu Vưc</a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item"><a className="nav-link" href="/">Hà Nội</a></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="#/login">Đăng Nhập</a></li>
                            <li className="nav-item"><a className="nav-link" href="#/register">Đăng Kí</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}