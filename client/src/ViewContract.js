import React from 'react';
import FooterHome from './components/Footer/FooterHome';
import Header from './components/Header';
import axios from 'axios'

function PersonalInfo() {
    return (
        <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
            <h3 class="border bg-warning">Ben A</h3>
            <h4>Anh Dung</h4>
            <h5><a><i class="lnr lnr-license"></i> So CMT : 0123456789</a></h5>
            <h5><a><i class="lnr lnr-map-marker"></i> Ha Dong, Ha Noi</a></h5>
            <h5><a><i class="lnr lnr-phone-handset"></i> 0123456789</a></h5>
            <h5><a><i class="lnr lnr-envelope"></i> dunganhprovip@gmail.com</a></h5>
            <p class="border bg-light"><a>
                -----BEGIN PUBLIC KEY----- <br />
                MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdwSw75msocxvpxPD0UNjJRrp+<br />
                GYngh+x18CtBWHlgUFlCFGjxqfyn2cdiZGQPubyprqGzVIBYNHU2XJcBJWHQOCBG<br />
                CN12br4N7AckDw8LvxmcqSdYinJytzkzVWq0Y6l0hrLHr4jCzWQ90nLaCF5xE+Up<br />
                PIs+DvA+XXyLRzXDUQIDAQAB<br />
                -----END PUBLIC KEY-----<br />
            </a></p>
            <div class="br"></div>
        </aside>
    )
}


export default class ViewConTract extends React.Component {

    constructor() {
        super();
        this.state = {
            role: 'Guest',
            showCheck1 : false,
            showCheck2 : false,
            ngaytao: '',
            fullnameHost: '',
            fullnameTenant: '',
            cmtHost: '',
            cmtTenant: '',
            address: '',
            addressHost: '',
            addressTenant: '',
            phoneHost: '',
            phoneTenant:'',
            thoihan: '',
            mota: '',
            dientich: '',
            price: '',
            id_post: '',
            id_contract: '',
            landlord_id : '',
            publickeyHost: '',
            tenantSign: '',
            data: [],
            ngay_ket_thuc: '',
            hash : '',
            landlordSign: '',
            tenantSign : '',
            contentLandlordSign: '',
            contentTenantSign: ''
        }
    }

    componentDidMount(){
        const {match:{params}} = this.props;
        this.setState({
            id_contract: params.id
        })

        // var apiBaseUrl = "http://localhost:9000/users/";
        // setTimeout(()=>{ 
        //     axios.get(apiBaseUrl+'auth', { 'headers': { 'Authorization': localStorage.token } })
        //     .then((response)=> {
        //         if(response.status === 200 ){ 
        //             this.setState({ role: response.data.data })
        //         }
        //         // console.log(this.state)
        //     })
        // },0)

        var apiBaseUrl2 = "http://localhost:9000/users/";
        setTimeout(()=>{ 
            axios.get(apiBaseUrl2+'/getContractFromBlockChain/idv_contract/'+params.id, { 'headers': { 'Authorization': localStorage.token } })
            .then((response)=> {
                // console.log(response)
                // console.log(response.data.data.id)
                console.log("asdasaasd")
                if(response.status === 200 ){ 
                    console.log(response.data.data)
                    console.log("sadsadasda")
        
                    this.setState({
                        ngaytao: response.data.data.ngay_bat_dau,
                        fullnameHost: response.data.data.noi_dung_hop_dong.landlordName,
                        fullnameTenant: response.data.data.noi_dung_hop_dong.tenantName,
                        cmtHost: response.data.data.noi_dung_hop_dong.landlordID,
                        cmtTenant: response.data.data.noi_dung_hop_dong.tenantID,
                        address: response.data.data.noi_dung_hop_dong.address,
                        addressHost:response.data.data.noi_dung_hop_dong.landlordAddress,
                        addressTenant: response.data.data.noi_dung_hop_dong.tenantAddress,
                        phoneHost: response.data.data.noi_dung_hop_dong.landlordPhone,
                        phoneTenant: response.data.data.noi_dung_hop_dong.tenantPhone,
                        thoihan: response.data.data.noi_dung_hop_dong.time,
                        ngayketthuc: response.data.data.ngay_ket_thuc,
                        dientich: response.data.data.noi_dung_hop_dong.square,
                        price: response.data.data.price,
                        mota: response.data.data.noi_dung_hop_dong.feature,
                        
                        publickeyHost: response.data.data.public_key_chu_nha,
                        publickeyTenant: response.data.data.public_key_nguoi_thue_nha,
                        hash: response.data.hashed,
                        landlordSign: response.data.data.noi_dung_hop_dong.landlordSign,
                        tenantSign: response.data.data.noi_dung_hop_dong.tenantSign
                     })
                }
                
            })
        },0)



    }

    handleClickBtn1 = () => {
        this.setState({
            showCheck1 : true
        })
        var payload = {
            "publickey":this.state.publickeyHost,
            "sign": this.state.landlordSign
            

        }
        var baseURL = "http://localhost:9000/users"
        axios.post(baseURL+"/validContract", payload, { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=>{
            if (response.status == 200)
            {
                
            if (response.data == this.state.hash){
                alert("Hop dong ben A khong bi thay doi trong qua trinh thuc hien !!!")
            }
            else{
                alert("Khong xac thuc duoc hop dong!!")
            }

            this.setState({
                contentLandlordSign :  response.data
            })
            console.log(this.state.contentLandlordSign)
            console.log("dasdasdasdsadsa")
        }

        })
       
    }

    handleClickBtn2 = () => {
        this.setState({
            showCheck2: true
        })
        var payload = {
            "publickey":this.state.publickeyTenant,
            "sign": this.state.tenantSign
            
        }
        var baseURL = "http://localhost:9000/users"
        axios.post(baseURL+"/validContract", payload, { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=>{
            if( response.status === 200)
            {
            if (response.data.contentDecoded == this.state.hash){
                alert("Hop dong ben B khong bi thay doi trong qua trinh thuc hien !!!")
            }

            this.setState({
                contentTenantSign:  response.data.contentDecoded
            })}

        })

    }

    render() {

        const { showCheck1,showCheck2 } = this.state;

        return (
            <div>
                <Header />
                <section className="banner-area">
                    <div style={{ paddingTop: "100px" }} class="text-center align-bottom"><h1> Hop Dong Thue Nha </h1></div>
                </section>
                <h5 style={{ padding: "15px", paddingLeft: "30px" }}>
                    Ngay tao : {this.state.ngaytao}
                </h5>
                <div class="row" style={{ padding: "30px", paddingTop: "0px" }}>
                    <div class="col-12 text-center">
                        <div class="card-deck">
                        <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                            <h3 class="border bg-warning">Ben A</h3>
                            <h4>{this.state.fullnameHost}</h4>
                            <h5><a><i class="lnr lnr-license"></i> So CMT : {this.state.cmtHost}</a></h5>
                            <h5><a><i class="lnr lnr-map-marker"></i> {this.state.addressHost}</a></h5>
                            <h5><a><i class="lnr lnr-phone-handset"></i> {this.state.phoneHost}</a></h5>
                            <p class="border bg-light"><a>
                                 <br />
                                {this.state.publickeyHost}
                                <br />
                            </a></p>
                            <div class="br"></div>
                        </aside>
                        <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                            <h3 class="border bg-warning">Ben B</h3>
                            <h4>{this.state.fullnameTenant}</h4>
                            <h5><a><i class="lnr lnr-license"></i> So CMT : {this.state.cmtTenant}</a></h5>
                            <h5><a><i class="lnr lnr-map-marker"></i> {this.state.addressTenant}</a></h5>
                            <h5><a><i class="lnr lnr-phone-handset"></i> {this.state.phoneTenant}</a></h5>
                            <p class="border bg-light"><a>
                                 <br />
                                {this.state.publickeyTenant}
                               <br />
                            </a></p>
                            <div class="br"></div>
                        </aside>
                        </div>
                    </div>
                </div>
                <div class="row card-deck" style={{ padding: "30px", paddingTop: "0px" }}>
                    <div class="col-12 card">
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            1. Noi dung hop dong
                        </h3>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <div class="row align-items-center" style={{ padding: "10px" }}>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <h3 class="text-left">
                                    2. Thoi han hop dong
                                </h3>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                                <h4> Ngay bat dau :{this.state.ngaytao}</h4>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                                <h4> Thoi gian : {this.state.thoihan} (thang)</h4>
                            </div>
                        </div>
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            3. Gia thue va Phuong thuc thanh toan
                        </h3>
                        <div class="row align-items-center" style={{ paddingLeft: "18px" }}>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <h4 class="text-left">
                                    3.1 Gia thue
                                </h4>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                                <h4> {this.state.price}VND/thang</h4>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                            </div>
                        </div>
                        <h4 class="text-left" style={{ paddingLeft: "18px" }}>
                            3.2 Phuong thuc thanh toan
                        </h4>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            4. Trach nhiem cac ben
                        </h3>
                        <h4 class="text-left" style={{ paddingLeft: "18px" }}>
                            4.1 Trach nhiem cua ben A
                        </h4>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <h4 class="text-left" style={{ paddingLeft: "18px" }}>
                            4.2 Trach nhiem cua ben A
                        </h4>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            5. Dieu khoan chung
                        </h3>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            Hash Contract
                        </h3>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                               {this.state.hash}
                            </p>
                        </div>
                        <br />
                    </div>
                </div>
                <div class="card-deck text-center" style={{ padding: "30px", paddingTop: "0px" }}>
                    <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-warning"> Chu ky Ben A</h3>
                        <p class="border bg-light"><a>
                            {this.state.landlordSign}<br />
                        </a></p>
                        <button id="btn1" type="button" class="btn btn-primary" onClick={this.handleClickBtn1}>Kiem tra chu ky</button>
                        <div class="br"></div>
                    </aside>
                    <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-warning"> Chu ky Ben B</h3>
                        <p class="border bg-light"><a>
                            {this.state.tenantSign}<br />
                        </a></p>
                        <button id="btn2" type="button" class="btn btn-primary" onClick={this.handleClickBtn2}>Kiem tra chu ky</button>
                        <div class="br"></div>
                    </aside>
                </div>
                <div class="row text-center" style={{ padding: "30px", paddingTop: "0px" }}>
                    {showCheck1 && <aside class="col-6 single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-red"> Content Decode </h3>
                        <p class="border bg-light"><a>
                            {this.state.contentLandlordSign}<br />
                        </a></p>
                        <div class="br"></div>
                    </aside>}
                    {showCheck2 && <aside class="col-6 ml-auto single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-red"> Content Decode </h3>
                        <p class="border bg-light"><a>
                            {this.state.contentTenantSign}<br />
                        </a></p>
                        <div class="br"></div>
                    </aside>}
                </div >
                <FooterHome />
            </div >
        )
    }
}