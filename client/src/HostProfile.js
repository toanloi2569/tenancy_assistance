import React from 'react';
import HostHeader from './components/Header/HostHeader';
import Profile from './components/Profile';
import FooterHome from './components/Footer/FooterHome';
import axios from "axios";
import {Link} from "react-router-dom";

class HostProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            showEditInfo: false,
            user: {},
            vUser: [],
            contracts:[],
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
                    vUser: response.data.vUser[0],
                    contracts: response.data.user.contracts_info
                })
                console.log(this.state.vUser.id)
            })

            
        },0)
        

        
    }


    handleClick = () => {
        // var apiBaseUrl_Vchain = "http://localhost:9000/users/getContractFromBlockChain/idv_contract/"+this.state.vUser.id;
    
        // axios.get(apiBaseUrl_Vchain,{ 'headers': { 'Authorization': localStorage.token } })
        // .then((response)=>{
        //     console.log(response)
        //     this.setState({
        //         // contracts: response.data.contracts
                
        //     })
        // })

        this.setState({
            showEditInfo: true
        })
    }

    render() {
        const { showEditInfo } = this.state;
        const src1 = "https://v-chain.vn/ipfs/gateway/"+this.state.vUser.anh_cmt_mat_truoc_cid
        const src2 = "https://v-chain.vn/ipfs/gateway/"+this.state.vUser.anh_cmt_mat_sau_cid
        let elements = this.state.contracts.map((contract, index)=>{
            let link_to = "/host/profile/"+ contract.idv_contract
            return(

                // <span>jsldasndlass</span>
                <li>

                <Link to ={link_to}   className="nav-link" style={{lineHeight:"25px"}}>
                        <span>Hợp đồng: {contract.tenant} đã thuê từ ngày {contract.timeStart}</span> 
                </Link>
                </li>

            
            )
            
        })
        console.log({elements})
        return (
            <div>
                <HostHeader />
                <section className="banner-area">
                    <div style={{ paddingTop: "100px" }} class="text-center align-bottom"><h1> Thong tin ca nhan </h1></div>
                </section>
                <div class="row justify-content-around align-items-center bg-warning" style={{ padding: "20px" }}>
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                        <h5><a><i class="lnr lnr-user"></i> Ho va Ten :   {this.state.user.name}</a></h5>
                        <h5><a><i class="lnr lnr-license"></i> So CMT : {this.state.user.ID}</a></h5>
                        <h5><a><i class="lnr lnr-phone-handset"></i> So DT: {this.state.user.phone}</a></h5>
                        <h5><a><i class="lnr lnr-envelope"></i> Mail : {this.state.user.email}</a></h5>
                        {/* <button id="btn2" type="button" class="btn btn-primary" onClick={this.handleClick}>Nhung hop dong da tao</button> */}
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
                <section className="banner-area">
                    <div style={{ paddingTop: "100px" }} class="text-center align-bottom"><h1> Nhung hop dong da duoc tao </h1></div>
                </section>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-8 border bg-light" style={{ padding: "10px" }}>
                        <div class="card">
                            {elements}
                        </div>
                    </div>
                
 
                <FooterHome />
            </div>
        )
    }
}
export default HostProfile;