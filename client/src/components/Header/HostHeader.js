import React, { Component } from 'react';
// import {Link} from 'react-dom';
import { Badge, Icon } from 'antd';
import axios from 'axios';
import ViewContract from '../../ViewContract';  
import {Link} from 'react-router-dom';
import { Modal, Button } from 'antd';



export default class HostHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            count: 0,
            contracts: [],
            viewContract: [],

            
        }
        this.viewLetter = this.viewLetter.bind(this)
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
    
    
    viewLetter(){
        this.setState({
            count: 0
        })
    }
    componentDidMount() {
        this.interval = setInterval(() => {
        
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.get(apiBaseUrl+'getContracts', { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        if(response.status === 200 ){
            this.setState({
                count:  response.data.no_read,
                contracts: response.data.contracts,
                

            })
            

    
        }
        else if(response.status === 204){
            console.log("");
            
        }
        else{
            console.log("");
            alert("");
        }
        })

        
        }, 5000);
      }
      
      componentWillUnmount() {
        clearInterval(this.interval);
      }


      
    render() {
        let elements = this.state.contracts.map((contract, index) => {
            let link_to = "/hopdong/"+contract._id
            return (
                <li className="nav-item">
                    <Link to ={link_to}   className="nav-link" style={{lineHeight:"25px"}}>
                        <span>{contract.tenantName} muốn thuê</span>
                    
                    </Link>
                </li>
            )

        })
        
        // console.log(elements)
        // console.log(this.state.contracts)
    
        
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <a className="navbar-brand logo_h" href="#/home/"><img src="image/logo-3.png" alt="" style={{width:"140px",height:"80px"}}/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul className="nav navbar-nav menu_nav ml-auto">
                            <li className="nav-item submenu dropdown">
                                <a className="nav-link" onClick = {this.viewLetter}>
                                    Thông Báo
                                    <Badge count={this.state.count}  overflowCount={99}/>
                                </a>
                                <ul className="dropdown-menu">
                                    {elements}
                                </ul>
                            </li>
                            <li className="nav-item submenu dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Quản lý</a>
                                <ul className="dropdown-menu">
                                    {/* <li className="nav-item"><a className="nav-link" href="blog.html">Quản lý bài đăng</a></li> */}
                                    <li className="nav-item"><a className="nav-link" href="#/host/taohopdong"> Đăng tin thuê nhà</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#/host/profile">Xem thông tin cá nhân </a></li>
                                    {/* <li className="nav-item"><a className="nav-link" href="#/host/quanlyhopdong/:id"> Quản lý hợp đồng </a></li> */}
                                </ul>
                            </li>
                            {/* <li className="nav-item"><a className="nav-link" href="#/host/dangtin">Đăng Tin</a></li> */}
                            <li className="nav-item"><a className="nav-link" href="/" onClick= {this.handleLogout} >Log Out</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}