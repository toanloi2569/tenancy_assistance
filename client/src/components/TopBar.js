import React, { Component } from 'react';


export default class TopBar extends Component {
    render() {
        return (
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                    <a class="navbar-brand logo_h" href="index.html"><img src="image/Logo.png" alt="" /></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul class="nav navbar-nav menu_nav ml-auto">
                            <li class="nav-item submenu dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Khu Vưc</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a class="nav-link" href="blog.html">Hà Nội</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="elements.html">Đăng Nhập</a></li>
                            <li class="nav-item"><a class="nav-link" href="contact.html">Đăng Kí</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}