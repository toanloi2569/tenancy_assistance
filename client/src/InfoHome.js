import React from 'react';
import TopBar from './components/TopBar';
import Banner from './components/Banner';
import FooterHome from './components/Footer/FooterHome';
import { Carousel } from 'antd';
import { Modal, Button } from 'antd';
import axios from 'axios';
import { Form, Input, Icon } from 'antd';
import { DatePicker } from 'antd';


class InfoHome extends React.Component {
    constructor(props) {
        super(props);
        this.state =({
            loading: false,
            visible: false,
            // Dung cho hop dong
            showcontract: [],
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
            // Dung cho bai post
            // tenbaidang: '',
            diachinha: '',
            image: '',
            sodienthoai: '',
            dientichnha:'',
            giatiennha: '',
            motanha:'',



        })

        this.handleChange = this.handleChange.bind(this)
        this.handleLoad = this.handleLoad.bind(this)

        
    }
    handleChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
          [name]: value
        })
    
      }
    
    componentDidMount() {
        setTimeout(()=>{
            this.handleLoad();
        },10)

        // window.addEventListener('load', this.handleLoad);
        // const {match:{params}} = this.props;
        // console.log(params.id)
    }
    componentWillUnmount(){
        
    }

    handleLoad(){
        const {match:{params}} = this.props;
        this.setState({
            id_post: params.id
        })
        // Lay gia tien, mo ta cho hop dong 
        var apiBaseUrl1 = "http://localhost:9000/users/detailPost/posts/"+this.state.id_post;
        axios.get(apiBaseUrl1, { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
            if (response.status === 200){
                // console.log(response.data)
                this.setState({
                    // bai dang
                    giatiennha: response.data.post.price,
                    diachinha: response.data.post.district,
                    image: response.data.post.image,
                    sodienthoai: response.data.post.phone,
                    motanha: response.data.post.content,
                    dientichnha: response.data.post.square,
                }) 
                // console.log(this.state)

            }
        })

        var apiBaseUrl2 = "http://localhost:9000/users/fillContract/post_id/"+this.state.id_post;
        axios.get(apiBaseUrl2, { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
            if (response.status === 200){
                console.log(response.data)
                this.setState({
                    // hop dong
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
                    id_contract:response.data._id



                }) 
                // console.log(this.state)

            }
        })



    }



    showModal = () => {

        this.setState({
          visible: true,
        });
        var self = this
        var show = []
        var apiBaseUrl = "http://localhost:9000/users/fillContract/post_id/"+this.state.id_post;
        axios.get(apiBaseUrl, { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        if(response.status === 200 ){
            // console.log(response)

            const formItemLayout = {
                labelCol: {
                  xs: { span: 24 },
                  sm: { span: 4 },
                },
                wrapperCol: {
                  xs: { span: 24 },
                  sm: { span: 20 },
                },
              };
            const formItemLayoutWithOutLabel = {    
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
            };
            show.push(
                <Form onSubmit={this.handleSubmit}>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Form.Item label= "NGÀY TẠO HỢP ĐỒNG">
                        <span>{response.data.timeStart}</span>
                    </Form.Item>
                </Form.Item>
                
                <Form.Item {...formItemLayoutWithOutLabel} >
                <h>ĐẠI DIỆN HỢP ĐỒNG BÊN A</h>
                <Form.Item label="Họ tên chủ trọ">
                    <span>{response.data.landlordName}</span>.
                
                </Form.Item>

                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Số điện thoại:">
                    <span>{response.data.landlordPhone}</span>
                
                </Form.Item>

                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Số chứng minh thư:">
                    <span>{response.data.landlordID}</span>
                </Form.Item>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Địa chỉ thường trú:">
                    <span>{response.data.landlordAddress}</span>
                </Form.Item>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <h>ĐẠI DIỆN HỢP ĐỒNG BÊN B</h>
                <Form.Item label="Họ tên người thuê trọ">
                <Input placeholder="Họ tên người thuê trọ" name = "fullnameTenant" onChange = {this.handleChange} 
                style={{ width: '80%', marginRight: 8, height: 40 }} >
                
                </Input>
                </Form.Item>

                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Số điện thoại:">
                <Input placeholder="số điện thoại người thuê trọ" name = "phoneTenant" onChange = {this.handleChange}
                style={{ width: '80%', marginRight: 8, height: 40 }}>
                
                </Input>
                </Form.Item>

                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Số chứng minh thư:">
                <Input placeholder="CMND" name = "cmtTenant" onChange = {this.handleChange}
                style={{ width: '80%', marginRight: 8, height: 40 }}>
                
                </Input>
                </Form.Item>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Địa chỉ thường trú:">
                <Input placeholder="Địa chỉ thường trú người thuê trọ" name = "addressTenant" onChange = {this.handleChange}
                style={{ width: '80%', marginRight: 8, height: 40 }}>
                
                </Input>
                </Form.Item>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <h>NỘI DUNG HỢP ĐỒNG:  </h>
                <Form.Item label = "BÊN A">
                    <Form.Item label="Nơi cho thuê trọ:">
                   <span>{response.data.address}</span>
                    </Form.Item>
                    <Form.Item label="Đặc điểm:">
                   <span>{response.data.feature}</span>
                    </Form.Item>
                    <Form.Item label="Diện tích cho thuê:">
                    <span>{response.data.square}</span>
                    </Form.Item>
                    <Form.Item label="Cam kết:">
                    <span>Bên A đồng ý cho bên B thuê căn nhà này với mục đích và hiện trạng 
                        được nêu như trên.
                    </span>
                    </Form.Item>
                    


                </Form.Item>

                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label = "BÊN B">
                    <Form.Item label="Cam kết:">
                    <span>Bên B đồng ý thuê nhà bên A với toàn bộ 
                        hiện trạng và mục đích sử dụng như trên.</span>
                    </Form.Item>

                    


                </Form.Item>

                </Form.Item>
                

                

                <Form.Item {...formItemLayoutWithOutLabel} >
                    <h>THỜI HẠN HỢP ĐỒNG</h>
                <Form.Item label="Thời gian thuê nhà (theo tháng): ">
                    <span>{response.data.time}</span>
                </Form.Item>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <h>GIÁ TIỀN CHO THUÊ:</h>
                <Form.Item label="Giá tiền thuê nhà ">
                    <span>{response.data.price}</span>
                
                </Form.Item>
                </Form.Item>

            </Form>

            )
            self.setState({
                showcontract:show,
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
                price: response.data.price
            })
                // console.log(this.state)
        }
        else if(response.status === 204){
            console.log("");
            
        }
        else{
            console.log("");
            alert("");
        }
        })
        
       


      };
    
    handleOk = e => {
        e.preventDefault();
        console.log(this.state.id_contract)
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
        }
        
        

        var baseURL2 = "http://locahost:9000/users/fillContract"
        var baseURL3 = "http://localhost:9000/users/sign/contract_id/"+this.state.id_contract;

        axios.post(baseURL2, payload,{ 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        if(response.status === 200 ){
            alert("Gửi thành công!!!")
            


        }
        else{
            console.log(response.status)
        }
    })
        // console.log(payload)
    this.setState({ loading: true });
    setTimeout(() => {
        this.setState({ loading: false, visible: false });
    }, 3000);
    };

    handleCancel = () => {
    this.setState({ visible: false });
    };

    render() {
        
        return (
            <div>
                <header className="header-area" id="top-bar">
                    <TopBar />
                </header>
                    <section className="banner-area">
                        <div style={{ padding: "30px" }}></div>
                    </section>
                <section class="blog_area single-post-area">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 posts-list">
                                <div class="single-post row">
                                    <div class="col-lg-12">
                                        <div>
                                            <Carousel autoplay >
                                                {/* <div ><img class="img-fluid w-100" src="image/facilites_bg.jpg" alt="" style={{height:"400px"}}/></div>
                                                <div ><img class="img-fluid w-100" src="image/facilites_bg.jpg" alt="" style={{height:"400px"}}/></div>
                                                
                                                <div ><img class="img-fluid w-100" src="image/blog/feature-img1.jpg" alt="" style={{height:"400px"}}/></div> */}
                                               <div> <img style={{height:"400px"}} id='base64image'                 
                                                src= {this.state.image[0]}
                                                class="img-fluid w-100" /></div>
                                                {/* <div ><img class="img-fluid w-100" src={} alt="" style={{height:"400px"}}/></div> */}
                                            </Carousel>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 blog_details">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <h2>{this.state.diachinha}</h2>
                                            </div>
                                            <div class="col-md-3 d-flex">
                                                {/* <button type="button" class="btn btn-outline-warning ml-auto align-self-center">Thue Nha</button> */}
                                                <div>
                                                    <Button type="primary" onClick={this.showModal}>
                                                    Tạo hợp đồng
                                                    </Button>
                                                    <Modal
                                                    visible={this.state.visible}
                                                    title="Title"
                                                    onOk={this.handleOk}
                                                    onCancel={this.handleCancel}
                                                    footer={[
                                                        <Button key="back" onClick={this.handleCancel}>
                                                        Return
                                                        </Button>,
                                                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                                                        Submit
                                                        </Button>,
                                                    ]}
                                                    >
                                                   {this.state.showcontract}
                                                    </Modal>
                                                </div>
                                            </div>
                                            <div class="d-flex bd-highlight">
                                                <div class="p-2 flex-fill bd-highlight">
                                                    <a><i class="lnr lnr-user" style={{ paddingRight: "5px" }}></i>{this.state.fullnameHost}</a>
                                                </div>
                                                <div class="p-2 flex-fill bd-highlight">
                                                    <a><i class="lnr lnr-phone-handset" style={{ paddingRight: "5px" }}></i>{this.state.sodienthoai}</a>
                                                </div>
                                                <div class="p-2 flex-fill bd-highlight">
                                                    <a><i class="lnr lnr-location"></i>{this.state.diachinha}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12" style={{ paddingTop: "50px" }}>
                                        <div class="row">
                                            <div class="col-10">
                                                <dir class="br"></dir>
                                                <aside>
                                                    <h3> Thong tin Phong tro</h3>
                                                    <h6 style={{ paddingLeft: "10px" }}>
                                                        Gia Phong : {this.state.giatiennha} VND<br />
                                                        Dien Tich : {this.state.dientichnha} m2<br />
                                                        Dia Chi : {this.state.diachinha}<br />
                                                        Mo Ta Chi Tiet :<br />
                                                        <h7>
                                                            &emsp;- {this.state.motanha}<br />
                                                            
                                                        </h7>
                                                    </h6>
                                                </aside>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="comments-area">
                                    <h4>05 Comments</h4>
                                    <div class="comment-list">
                                        <div class="single-comment justify-content-between d-flex">
                                            <div class="user justify-content-between d-flex">
                                                <div class="thumb">
                                                    <img src="image/blog/c1.jpg" alt="" />
                                                </div>
                                                <div class="desc">
                                                    <h5><a href="#">Emilly Blunt</a></h5>
                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                    <p class="comment">
                                                        Never say goodbye till the end comes!
                                            </p>
                                                </div>
                                            </div>
                                            <div class="reply-btn">
                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comment-list left-padding">
                                        <div class="single-comment justify-content-between d-flex">
                                            <div class="user justify-content-between d-flex">
                                                <div class="thumb">
                                                    <img src="image/blog/c2.jpg" alt="" />
                                                </div>
                                                <div class="desc">
                                                    <h5><a href="#">Elsie Cunningham</a></h5>
                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                    <p class="comment">
                                                        Never say goodbye till the end comes!
                                            </p>
                                                </div>
                                            </div>
                                            <div class="reply-btn">
                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comment-list left-padding">
                                        <div class="single-comment justify-content-between d-flex">
                                            <div class="user justify-content-between d-flex">
                                                <div class="thumb">
                                                    <img src="image/blog/c3.jpg" alt="" />
                                                </div>
                                                <div class="desc">
                                                    <h5><a href="#">Annie Stephens</a></h5>
                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                    <p class="comment">
                                                        Never say goodbye till the end comes!
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="reply-btn">
                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comment-list">
                                        <div class="single-comment justify-content-between d-flex">
                                            <div class="user justify-content-between d-flex">
                                                <div class="thumb">
                                                    <img src="image/blog/c4.jpg" alt="" />
                                                </div>
                                                <div class="desc">
                                                    <h5><a href="#">Maria Luna</a></h5>
                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                    <p class="comment">
                                                        Never say goodbye till the end comes!
                                            </p>
                                                </div>
                                            </div>
                                            <div class="reply-btn">
                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comment-list">
                                        <div class="single-comment justify-content-between d-flex">
                                            <div class="user justify-content-between d-flex">
                                                <div class="thumb">
                                                    <img src="image/blog/c5.jpg" alt="" />
                                                </div>
                                                <div class="desc">
                                                    <h5><a href="#">Ina Hayes</a></h5>
                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                    <p class="comment">
                                                        Never say goodbye till the end comes!
                                            </p>
                                                </div>
                                            </div>
                                            <div class="reply-btn">
                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="comment-form">
                                    <h4>Leave a Reply</h4>
                                    <form>
                                        <div class="form-group form-inline">
                                            <div class="form-group col-lg-6 col-md-6 name">
                                                <input type="text" class="form-control" id="name" placeholder="Enter Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Name'" />
                                            </div>
                                            <div class="form-group col-lg-6 col-md-6 email">
                                                <input type="email" class="form-control" id="email" placeholder="Enter email address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="subject" placeholder="Subject" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Subject'" />
                                        </div>
                                        <div class="form-group">
                                            <textarea class="form-control mb-10" rows="5" name="message" placeholder="Messege" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Messege'" required=""></textarea>
                                        </div>
                                        <a href="#" class="primary-btn button_hover">Post Comment</a>
                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="blog_right_sidebar" style={{ padding: "5px" }}>
                                    <h3 style={{ textAlign: "center" }}>Phong Tro Khu vuc Bach Khoa </h3>
                                    <aside class="single_sidebar_widget author_widget">
                                        <div class="blog_info text-left" style={{ paddingTop: "5px" }}>
                                            <ul class="blog_meta list_style">
                                                <li><a><i class="lnr lnr-location"></i>{this.state.diachinha}</a></li>
                                                {/* <li><a><i class="lnr lnr-map-marker"></i>Quan Hai Ba Trung</a></li> */}
                                                <li><a><i class="lnr lnr-diamond"></i>{this.state.giatiennha} VND</a></li>
                                                <li><a><i class="lnr lnr-crop"></i>{this.state.dientichnha} m2</a></li>
                                                <li><a><i class="lnr lnr-phone-handset"></i>{this.state.sodienthoai}</a></li>
                                                <li><a><i class="lnr lnr-user"></i>{this.state.fullnameHost}</a></li>
                                            </ul>
                                        </div>
                                        <div class="br"></div>
                                    </aside>
                                    <aside class="single_sidebar_widget ads_widget">
                                        <a href="#"><img class="img-fluid" src="image/blog/add.jpg" alt="" /></a>
                                        <div class="br"></div>
                                    </aside>
                                    <aside class="single_sidebar_widget post_category_widget">
                                        <h4 class="widget_title">Post Catgories</h4>
                                        <ul class="list_style cat-list">
                                            <li>
                                                <a href="#" class="d-flex justify-content-between">
                                                    <p>Technology</p>
                                                    <p>37</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="d-flex justify-content-between">
                                                    <p>Lifestyle</p>
                                                    <p>24</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="d-flex justify-content-between">
                                                    <p>Fashion</p>
                                                    <p>59</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="d-flex justify-content-between">
                                                    <p>Art</p>
                                                    <p>29</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="d-flex justify-content-between">
                                                    <p>Food</p>
                                                    <p>15</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="d-flex justify-content-between">
                                                    <p>Architecture</p>
                                                    <p>09</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="d-flex justify-content-between">
                                                    <p>Adventure</p>
                                                    <p>44</p>
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="br"></div>
                                    </aside>
                                    <aside class="single-sidebar-widget tag_cloud_widget">
                                        <h4 class="widget_title">Tag Clouds</h4>
                                        <ul class="list_style">
                                            <li><a href="#">Technology</a></li>
                                            <li><a href="#">Fashion</a></li>
                                            <li><a href="#">Architecture</a></li>
                                            <li><a href="#">Fashion</a></li>
                                            <li><a href="#">Food</a></li>
                                            <li><a href="#">Technology</a></li>
                                            <li><a href="#">Lifestyle</a></li>
                                            <li><a href="#">Art</a></li>
                                            <li><a href="#">Adventure</a></li>
                                            <li><a href="#">Food</a></li>
                                            <li><a href="#">Lifestyle</a></li>
                                            <li><a href="#">Adventure</a></li>
                                        </ul>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FooterHome />
            </div>
        )
    }
} export default InfoHome;