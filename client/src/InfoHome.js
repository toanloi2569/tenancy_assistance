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
            dieukhoan:[],
            mota: '',
            dientich: '',
            price: '',
            id_post: '',
        })

        
    }
    componentDidMount() {
        // window.addEventListener('load', this.handleLoad);
        const {match:{params}} = this.props;
        console.log(params.id)
        this.setState({
            id_post: params.id
        })

    }
    showModal = () => {

        this.setState({
          visible: true,
        });
        var self = this
        var show = []
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.post(apiBaseUrl+'', { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        if(response.status === 200 ){

        }
        else if(response.status === 204){
            console.log("");
            
        }
        else{
            console.log("");
            alert("");
        }
        })
        
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
                        {/* <DatePicker onChange={this.onChange} /> */}
                        <span>{this.state.ngaytao}</span>
                    </Form.Item>
                </Form.Item>
                
                <Form.Item {...formItemLayoutWithOutLabel} >
                <h>ĐẠI DIỆN HỢP ĐỒNG BÊN A</h>
                <Form.Item label="Họ tên chủ trọ">
                    <span>{this.state.fullnameHost}</span>.
                
                </Form.Item>

                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Số điện thoại:">
                    <span>{this.state.phoneHost}</span>
                
                </Form.Item>

                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Số chứng minh thư:">
                    <span>{this.state.cmtHost}</span>
                </Form.Item>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel} >
                <Form.Item label="Địa chỉ thường trú:">
                    <span>{this.state.addressHost}</span>
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
                   <span>{this.state.address}</span>
                    </Form.Item>
                    <Form.Item label="Đặc điểm:">
                   <span>{this.state.mota}</span>
                    </Form.Item>
                    <Form.Item label="Diện tích cho thuê:">
                    <span>{this.state.dientich}</span>
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
                    <span>{this.state.thoihan}</span>
                </Form.Item>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <h>GIÁ TIỀN CHO THUÊ:</h>
                <Form.Item label="Giá tiền thuê nhà ">
                    <span>{this.state.price}</span>
                
                </Form.Item>
                </Form.Item>


                <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">
                    Hoàn thiện hợp đồng
                </Button>
                </Form.Item>
            </Form>

            )
            self.setState({
                showcontract:show
            })
        //     self.setState({
        //         ngaytao: response.data.ngaytao,
        //         fullnameHost: response.data.fullnameHost,
        //         fullnameTenant: response.data.fullnameTenant,
        //         cmtHost: response.data.cmtHost,
        //         cmtTenant: response.data.cmtTenant,
        //         address: response.data.address,
        //         addressHost: response.data.addressHost,
        //         addressTenant: response.data.addressTenant,
        //         phoneHost: response.data.phoneHost,
        //         phoneTenant:response.data.phoneTenant,
        //         thoihan: response.data.thoihan,
        //         dieukhoan:response.data.dieukhoan,
        //         mota:  response.data.mota,
        //         dientich: response.data.dientich,
        //         price: response.data.price,
        //         showcontract: show
                
        //     })
        

        // }
        // else if(response.status === 204){
        //     console.log("Loi server");
        //     alert(response.data.success)
        // }
        // else{
        //     console.log("Loi server");
        //     alert("Loi server");
        // }
        // })




      };
    
    handleOk = () => {
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
                                                <div ><img class="img-fluid w-100" src="image/facilites_bg.jpg" alt="" style={{height:"400px"}}/></div>
                                                <div ><img class="img-fluid w-100" src="image/facilites_bg.jpg" alt="" style={{height:"400px"}}/></div>
                                                <div ><img class="img-fluid w-100" src="image/blog/feature-img1.jpg" alt="" style={{height:"400px"}}/></div>
                                                <div ><img class="img-fluid w-100" src="image/blog/feature-img1.jpg" alt="" style={{height:"400px"}}/></div>
                                            </Carousel>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 blog_details">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <h2>{this.props.name}</h2>
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
                                                    <a><i class="lnr lnr-user" style={{ paddingRight: "5px" }}></i>Anh Dung</a>
                                                </div>
                                                <div class="p-2 flex-fill bd-highlight">
                                                    <a><i class="lnr lnr-phone-handset" style={{ paddingRight: "5px" }}></i>0123456789</a>
                                                </div>
                                                <div class="p-2 flex-fill bd-highlight">
                                                    <a><i class="lnr lnr-location"></i>5 Ta Quang Buu, Phuong Bach Khoa, Quan Hai Ba Trung</a>
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
                                                        Gia Phong : 2000000 VND<br />
                                                        Dien Tich : 20 m2<br />
                                                        Dia Chi : 5 Ta Quang Buu, Phuong Bach Khoa, Quan Hai Ba Trung, Ha Noi<br />
                                                        Mo Ta Chi Tiet :<br />
                                                        <h7>
                                                            &emsp;- Co nha ve sinh rong rai <br />
                                                            &emsp;- Co nong lanh, mang wifi
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
                                                <li><a><i class="lnr lnr-location"></i>5 Ta Quang Buu, Phuong Bach Khoa</a></li>
                                                <li><a><i class="lnr lnr-map-marker"></i>Quan Hai Ba Trung</a></li>
                                                <li><a><i class="lnr lnr-diamond"></i>2000000 VND</a></li>
                                                <li><a><i class="lnr lnr-crop"></i>20 m2</a></li>
                                                <li><a><i class="lnr lnr-phone-handset"></i>0123456789</a></li>
                                                <li><a><i class="lnr lnr-user"></i>Anh Dung</a></li>
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