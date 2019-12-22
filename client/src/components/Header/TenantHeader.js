import React, { Component } from 'react';
import {Link} from 'react-dom';
import axios from 'axios'


export default class TenantHeader extends Component {
    
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        var self = this;
        var token = localStorage.token
        localStorage.removeItem('token')
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.get(apiBaseUrl+'logoutallUser', { 'headers': { 'Authorization': token } })
        .then((response)=> {
           console.log("hihi")
        })
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <a className="navbar-brand logo_h" href="/"><img src="image/logo-3.png" alt="" style={{width:"140px",height:"80px"}}/></a>
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
                                    <li className="nav-item"><a className="nav-link" href="#/tenant/thongtinthuenha">Xem thông tin thuê nhà</a></li>
                                    {/* <li className="nav-item"><a className="nav-link" href="blog.html">Tạo hợp đồng </a></li> */}
                                    <li className="nav-item"><a className="nav-link" href="#/tenant/profile">Xem thông tin cá nhân </a></li>
                                    
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="#/listhome/:id">Tìm nhà</a></li>
                            {/* <li className = "nav-item"><Link to = "/userProfile/createForm">Dang tin</Link></li> */}
                            <li className="nav-item"><a className="nav-link" href="#/home"  onClick={this.handleLogout} >Log Out</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}