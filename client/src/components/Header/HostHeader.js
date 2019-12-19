import React, { Component } from 'react';
// import {Link} from 'react-dom';


export default class HostHeader extends Component {
    

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <a className="navbar-brand logo_h" href="index.html"><img src="image/Logo.png" alt="" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul className="nav navbar-nav menu_nav ml-auto">
                            <li className="nav-item submenu dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Quản lý</a>
                                <ul className="dropdown-menu">
                                    {/* <li className="nav-item"><a className="nav-link" href="blog.html">Quản lý bài đăng</a></li> */}
                                    <li className="nav-item"><a className="nav-link" href="#/host/taohopdong">Tạo hợp đồng </a></li>
                                    <li className="nav-item"><a className="nav-link" href="#/host/profile">Xem thông tin cá nhân </a></li>
                                    <li className="nav-item"><a className="nav-link" href="#/host/danhsachnhachothue">Danh sách nhà cho thuê </a></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="#/host/dangtin">Đăng Tin</a></li>
                            <li className="nav-item"><a className="nav-link" href="#/host">Trang chủ</a></li>
                            <li className="nav-item"><a className="nav-link"  href ="/" >Log Out</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}