import React, { Component } from 'react';
// import {Link} from 'react-dom';
import { Badge, Icon } from 'antd';
import axios from 'axios'



export default class HostHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            count: 0,
            contract: [],
            // id_contract: '',
            viewContract: [],

            
        }
        this.viewLetter = this.viewLetter.bind(this)




    }

    viewLetter(){
        this.setState({
            count: 0
        })
    }
    componentDidMount() {
        this.interval = setInterval(() => {
         
        var self = this;
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.get(apiBaseUrl+'getContracts', { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        if(response.status === 200 ){
            console.log(response.data)
            this.setState({
                count:  response.data.no_read,
                contract: response.data.contracts,
                // id_contract: response.data.contracts._id

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
        // let element = this.state.contracts.map((cotract,index)=>{
        //     // link_to = 
        // })
        
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
                                <a className="nav-link" onChange = {this.viewLetter}>
                                    Thông Báo
                                    <Badge count={this.state.count} dot/>
                                </a>
                                <ul className="dropdown-menu">
                                    {/* <li className="nav-item"><a className="nav-link" href="blog.html">Quản lý bài đăng</a></li> */}
                                    <li className="nav-item"><a className="nav-link" href="#/hopdong" style={{lineHeight:"25px"}}>Dung88 muon thue nha Khu vuc Bach Kinh Xay cua ban</a></li>
                                    {/* <li className="nav-item"><a className="nav-link" href="#/hopdong">Cuong2112 muon thue nha Khu vuc Bach Kinh Xay cua ban</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#/hopdong">Loi123 muon thue nha Khu vuc Bach Kinh Xay cua ban</a></li> */}
                                </ul>
                            </li>
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
                            <li className="nav-item"><a className="nav-link" href="/" >Log Out</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}