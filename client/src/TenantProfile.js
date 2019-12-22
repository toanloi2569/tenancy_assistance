import React from 'react';
import TenantHeader from './components/Header/TenantHeader';
import Profile from './components/Profile';
import FooterHome from './components/Footer/FooterHome';
import axios from "axios"

class TenantProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            showEditInfo : false,
            user: {},
            vUser: []
        }
    }

    componentDidMount() {
        var apiBaseUrl = "http://localhost:9000/users/";
        setTimeout(()=>{
            axios.get(apiBaseUrl+'profileUser', { 'headers': { 'Authorization': localStorage.token } })
            .then((response)=> {
                console.log(response)
                this.setState({
                    user: response.data.user,
                    vUser: response.data.vUser[0]
                })
            })
        },100)
    }

    handleClick = () => {
        this.setState({
            showEditInfo : true,
        })
    }
    
    render() {

        const { showEditInfo } = this.state;
        const src1 = "https://v-chain.vn/ipfs/gateway/"+this.state.vUser.anh_cmt_mat_truoc_cid
        const src2 = "https://v-chain.vn/ipfs/gateway/"+this.state.vUser.anh_cmt_mat_sau_cid
        return (
            <div>
                <TenantHeader />
                <section className="banner-area">
                    <div style={{ paddingTop: "100px" }} class="text-center align-bottom"><h1> Thong tin ca nhan </h1></div>
                </section>
                <div class="row justify-content-around align-items-center bg-warning" style={{ padding: "20px" }}>
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                        <h5><a><i class="lnr lnr-user"></i> Ho va Ten : {this.state.user.name} </a></h5>
                        <h5><a><i class="lnr lnr-license"></i> So CMT : {this.state.user.ID} </a></h5>
                        <h5><a><i class="lnr lnr-phone-handset"></i> So DT {this.state.user.phone} </a></h5>
                        <h5><a><i class="lnr lnr-envelope"></i> Mail : {this.state.user.email} </a></h5>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-8 border bg-light" style={{ padding: "10px" }}>
                        <div class="card">
                            <img class="w-100 h-100" src={src1} alt="" />
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-8 border bg-light" style={{ padding: "10px" }}>
                        <div class="card">
                            <img class="w-100 h-100" src={src2} alt="" />
                        </div>
                    </div>
                </div>
                {showEditInfo && <Profile />}
                <FooterHome/>
            </div>
        )
    }
}
export default TenantProfile;