import React from 'react';
import FooterHome from './components/Footer/FooterHome';
import Header from './components/Header';
import axios from 'axios';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { Input } from 'antd';

export default class HostSingContract extends React.Component {

    constructor() {
        super();
        this.state = {
            role: 'Guest',
            showCheck1 : false,
            showCheck2 : false,
            // hop dong
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
            // password
            loading: false,
            visible: false,
            password: '',
            username:''
                        

      
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        const {match:{params}} = this.props;
        // console.log(params.id); 
        this.setState({
            id_contract: params.id
        })
        var apiBaseUrl = "http://localhost:9000/users/";
        setTimeout(()=>{ 
            axios.get(apiBaseUrl+'auth', { 'headers': { 'Authorization': localStorage.token } })
            .then((response)=> {
                if(response.status === 200 ){ 
                    this.setState({ role: response.data })
                }
                // console.log(this.state)
            })
        },0)

        var apiBaseUrl2 = "http://localhost:9000/users/";
        setTimeout(()=>{ 
            axios.get(apiBaseUrl2+'checkContractAfterFill/'+params.id, { 'headers': { 'Authorization': localStorage.token } })
            .then((response)=> {
                if(response.status === 200 ){ 
        
                    this.setState({
                        ngaytao: response.data.timeStart,
                        fullnameHost: response.data.landlordName,
                        fullnameTenant: response.data.tenantName,
                        cmtHost: response.data.landlordID,
                        cmtTenant: response.data.tenantID,
                        address: response.data.address,
                        addressHost:response.data.landlordAddress,
                        addressTenant: response.data.tenantAddress,
                        phoneHost: response.data.landlordPhone,
                        phoneTenant: response.data.tenantPhone,
                        thoihan: response.data.time,
                        mota: response.data.feature,
                        dientich: response.data.square,
                        price: response.data.price,
                        id_contract:response.data._id,
                        landlord_id: response.data.landlord_id,  
                        

                     })
                }
                // console.log(this.state)
            })
        },0)
    }

    handleChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
          [name]: value
        })
    
        }
    showModal = () => {
        alert("ky thanh cong")
        this.setState({
          visible: true,
        });
      };



    handleOk = () => {
    // e.preventDefault();
    this.setState({ loading: true });
    console.log(this.state)

    var payload = {
        'timeStart': this.state.ngaytao,
        'landlordName': this.state.fullnameHost,
        'tenantName': this.state.fullnameTenant,
        'landlordID': this.state.cmtHost,
        'tenantID': this.state.cmtTenant,
        'address': this.state.address,
        'landlordAddress': this.state.addressHost,
        'tenantAddress': this.state.addressTenant,
        'landlordPhone': this.state.phoneHost,
        'tenantPhone': this.state.phoneTenant,
        'time': this.state.thoihan,
        'feature': this.state.mota,
        'square': this.state.dientich,
        'price': this.state.price,    
        'landlord_id':this.state.landlord_id, 
        'username': this.state.username,
        'password': this.state.password
    }
    
    // /storeContractToBlockChain/contract_id/:contract_id/username/:username/password/:password'
    var baseURL = "http://localhost:9000/users/"+"storeContractToBlockChain/contract_id/"+
        this.state.id_contract+"/username/"+
        this.state.username+ "/password/"+
        this.state.password;
    axios.post(baseURL, payload,{ 'headers': { 'Authorization': localStorage.token } })
    .then((response)=> {
        
    if(response.status === 200 ){
        this.setState({
            visible1: true,
        });
        alert("Gui len VChain thanh cong!!!")

    }
    else{
        // console.log(response.status)
    }
})
    setTimeout(() => {
        this.setState({ loading: false, visible: false });
    }, 3000);
    };

    handleCancel = () => {
    this.setState({ visible: false });
    };

    

    handleClickBtn1 = () => {
        this.setState({
            showCheck1 : true

        })
        alert("Chu ky hop le !!!!")
    }

    handleClickBtn2 = () => {
        this.setState({
            showCheck2: true
        })
        alert("Chu ky hop le !!!!")
    }

    render() {

        const { showCheck1,showCheck2 } = this.state;
        const { visible, loading } = this.state;

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
                            <div class="br"></div>
                        </aside>
                        <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                            <h3 class="border bg-warning">Ben B</h3>
                            <h4>{this.state.fullnameTenant}</h4>
                            <h5><a><i class="lnr lnr-license"></i> So CMT : {this.state.cmtTenant}</a></h5>
                            <h5><a><i class="lnr lnr-map-marker"></i> {this.state.addressTenant}</a></h5>
                            <h5><a><i class="lnr lnr-phone-handset"></i> {this.state.phoneTenant}</a></h5>
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
                                <h4> Thoi han hop dong :{this.state.thoihan} (thang)</h4>
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
                                <h4> {this.state.price} VND/thang</h4>
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
                        <br />
                    </div>
                </div>
                <div class="card-deck text-center" style={{ padding: "30px", paddingTop: "0px" }}>
                    <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-warning"> Chu  Ky Ben A</h3>
                        <div>
                            <Button type="primary" onClick={this.showModal}>
                            KY HOP DONG
                            </Button>
                            <Modal
                            visible={visible}
                            title="Bạn có muốn đẩy hợp đồng này lên VCHAIN không"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                Return
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                Xac thuc
                                </Button>,
                            ]}
                            ><label>User Name:</label>
                            <Input placeholder="user name" name = "username" onChange = {this.handleChange} />
                            <label>Password:</label>
                            <Input.Password placeholder="input password" name ="password" onChange = {this.handleChange} />
                            </Modal>
                        </div>
                        
                        {/* <button id="btn1" type="button" class="btn btn-primary" onClick={this.handleClickBtn1}>KY HOP DONG</button> */}
                        <div class="br"></div>
                    </aside>
                    
                </div>
                <div class="row text-center" style={{ padding: "30px", paddingTop: "0px" }}>
                    {showCheck1 && <aside class="col-6 single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        
                        <div class="br"></div>
                    </aside>}
                    {showCheck2 && <aside class="col-6 ml-auto single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        
                        <div class="br"></div>
                    </aside>}
                </div >
                <FooterHome />
            </div >
        )
    }
}