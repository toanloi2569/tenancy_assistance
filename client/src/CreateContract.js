import React from 'react';
import Header from './components/Header';
import FooterHome from './components/Footer/FooterHome';
import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';
// import WrappedDynamicFieldSet from './components/HostComponets/Contract_new';
// import CreateFrom from './components/CreateForm';
// import ImageUploader from 'react-images-upload';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'antd/dist/antd.css';
import { Cascader } from 'antd';
import axios from 'axios';
import { Upload, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button } from 'antd';
import { DatePicker } from 'antd';
import { Mentions } from 'antd';

// import PriceInput from './components/HostComponets/PriceInput';


const vn = {
    "HANOI": {
        "name": "Hà Nội",
        "cities": {
            "QUANBADINH": "Quận Ba Đình",
            "QUANHOANKIEM": "Quận Hoàn Kiếm",
            "QUANHAIBATRUNG": "Quận Hai Bà Trưng",
            "QUANDONGDA": "Quận Đống Đa",
            "QUANTAYHO": "Quận Tây Hồ",
            "QUANCAUGIAY": "Quận Cầu Giấy",
            "QUANTHANHXUAN": "Quận Thanh Xuân",
            "QUANHOANGMAI": "Quận Hoàng Mai",
            "QUANLONGBIEN": "Quận Long Biên",
            "HUYENTULIEM": "Huyện Từ Liêm",
            "HUYENTHANHTRI": "Huyện Thanh Trì",
            "HUYENGIALAM": "Huyện Gia Lâm",
            "HUYENDONGANH": "Huyện Đông Anh",
            "HUYENSOCSON": "Huyện Sóc Sơn",
            "QUANHADONG": "Quận Hà Đông",
            "THIXASONTAY": "Thị xã Sơn Tây",
            "HUYENBAVI": "Huyện Ba Vì",
            "HUYENPHUCTHO": "Huyện Phúc Thọ",
            "HUYENTHACHTHAT": "Huyện Thạch Thất",
            "HUYENQUOCOAI": "Huyện Quốc Oai",
            "HUYENCHUONGMY": "Huyện Chương Mỹ",
            "HUYENDANPHUONG": "Huyện Đan Phượng",
            "HUYENHOAIDUC": "Huyện Hoài Đức",
            "HUYENTHANHOAI": "Huyện Thanh Oai",
            "HUYENMYDUC": "Huyện Mỹ Đức",
            "HUYENUNGHOA": "Huyện Ứng Hoà",
            "HUYENTHUONGTIN": "Huyện Thường Tín",
            "HUYENPHUXUYEN": "Huyện Phú Xuyên",
            "HUYENMELINH": "Huyện Mê Linh",
            "HANOIKHAC": "Quận/Huyện khác"
        }
    },
    "HOCHIMINH": {
        "name": "Thành phố Hồ Chí Minh",
        "cities": {
            "QUAN1": "Quận 1",
            "QUAN2": "Quận 2",
            "QUAN3": "Quận 3",
            "QUAN4": "Quận 4",
            "QUAN5": "Quận 5",
            "QUAN6": "Quận 6",
            "QUAN7": "Quận 7",
            "QUAN8": "Quận 8",
            "QUAN9": "Quận 9",
            "QUAN10": "Quận 10",
            "QUAN11": "Quận 11",
            "QUAN12": "Quận 12",
            "QUANGOVAP": "Quận Gò Vấp",
            "QUANTANBINH": "Quận Tân Bình",
            "QUANTANPHU": "Quận Tân Phú",
            "QUANBINHTHANH": "Quận Bình Thạnh",
            "QUANPHUNHUAN": "Quận Phú Nhuận",
            "QUANTHUDUC": "Quận Thủ Đức",
            "QUANBINHTAN": "Quận Bình Tân",
            "HUYENBINHCHANH": "Huyện Bình Chánh",
            "HUYENCUCHI": "Huyện Củ Chi",
            "HUYENHOCMON": "Huyện Hóc Môn",
            "HUYENNHABE": "Huyện Nhà Bè",
            "HUYENCANGIO": "Huyện Cần Giờ",
            "HOCHIMINHKHAC": "Quận/Huyện khác"
        }
    }
}
const convertCitis = obj => {
    let result = Object.keys(obj).map(function (key) {
        return { value: key, label: obj[key] };
    });
    return result;
}

const convertAddress = obj => {
    let result = Object.keys(obj).map(function (key) {
        return { value: key, label: obj[key].name, children: convertCitis(obj[key].cities) };
    });
    return result;
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
let id = 0;

class CreateContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //dang tin
          textDistrict: "",
          textSquare: 0,
          textPrice: 0,
          textDesc:"",
        //   pictures : [],
          address :[],
          phone : '',
          previewVisible: false,
          previewImage: '',
          fileList: [],
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
        // dieukhoan:[],
        mota: '',
        dientich: '',
        price: '',

        };
        // ham xu ly trong hop dong
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        // this.checkPrice = this.checkPrice.bind(this)
        this.ishandleChange = this.ishandleChange.bind(this)

        //ham xu ly trong dang tin

        this.onHandleChange = this.onHandleChange.bind(this);
        this.handleAddress = this.handleAddress.bind(this);

    }
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });
    handleAddress(address) {
        this.setState({
            address: this.state.address.concat(address),

        });
    }


    // HAM XU LY DANG TIN


    onHandleChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })

    }

    // HAM XU LY CHO HOP DONG
    onChange(date, dateString) {
        // console.log(date, dateString);
        // console.log(date)
        this.setState({
            ngaytao: dateString
        })
    }

    ishandleChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })

    }



    handleSubmit = async e => {
        e.preventDefault();
        // console.log(this.state)
        var self = this;
        var img = []
        for (var i=0; i <this.state.fileList.length;i++){
            img.push(await getBase64(this.state.fileList[i].originFileObj))
            console.log(img);
        }

        var payload = {
            contractDetail : {
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
            },
            postDetail:{
                "square": this.state.textSquare,
                "price": this.state.textPrice,
                "address": this.state.textDistrict,
                "district": this.state.address,
                "img": img,
                "phone": this.state.phone,
                "content": this.state.textDesc
            }


        }
        console.log(payload)
        var apiBaseUrl = "http://localhost:9000";
        axios.post(apiBaseUrl + '/users/createPost', payload,{ 'headers': { 'Authorization': localStorage.token } })
        .then(function (response) {
            console.log(response);
            alert("Dang tin thanh cong")
            if (response.data.code === 200) {
            console.log("create contract by Host successfull");


                }
                else {
                    console.log("some error ocurred", response.data.code);
                }
            })
            .catch(function (error) {
                console.log(error);
            });



    };


    render() {
        //  Đăng tin 
        const previewVisible = this.state.previewVisible;
        const previewImage = this.state.previewImage;
        const fileList = this.state.fileList;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload CMT mặt trước và mặt sau</div>
            </div>
        );
        // Tạo hợp đồng 
        // DateTime
        const { RangePicker } = DatePicker;

        // Dieukhoan, gia tien
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
                sm: { span: 24, offset: 2 },
            },
        };


        return (
            <div>
                <Header/>
                <section className="banner-area">
                    <div style={{ paddingTop: "80px" }}></div>
                </section>
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <div className="row">
                        <div className="col-5">
                            <Card title="Đăng tin thuê nhà" bordered={false}>
                                <div className="row" style={{ marginTop: 1 + 'em' }} >
                                    <div className="col align-self-center" >
                                        <form onSubmit={this.onHandleSubmit} >
                                            <label> District:</label>
                                            <Cascader
                                                style={{ width: "80%" }}
                                                options={convertAddress(vn)}
                                                placeholder="Select Address"
                                                onChange={this.handleAddress}
                                            />
                                            <div className="form-group">
                                                <label >Address: </label>
                                                <input type="text" className="form-control" name="textDistrict"
                                                    onChange={this.onHandleChange}
                                                    value={this.state.textDistrict} />
                                            </div>
                                            <div className="form-group">
                                                <label >Square (m2):</label>
                                                <input type="number" className="form-control" name="textSquare"
                                                    onChange={this.onHandleChange}
                                                    value={this.state.textSquare} />
                                            </div>
                                            <div className="form-group">
                                                <label >Price (VNĐ):</label>
                                                <input type="number" className="form-control" name="textPrice"
                                                    onChange={this.onHandleChange}
                                                    value={this.state.textPrice} />
                                            </div>
                                            <div className="form-group">
                                                <label >Phone:</label>
                                                <input type="number" className="form-control" name="phone"
                                                    onChange={this.onHandleChange}
                                                    value={this.state.phone} />
                                            </div>
                                            <div className="form-group">
                                                <label >Content:</label>

                                                <textarea className="form-control" rows="5" name="textDesc"
                                                    onChange={this.onHandleChange}
                                                    value={this.state.textDesc}
                                                ></textarea>

                                            </div>
                                            <label> Upload Image:</label>
                                            <div className="clearfix">
                                                <Upload
                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onPreview={this.handlePreview}
                                                    onChange={this.handleChange}
                                                >
                                                    {fileList.length >= 5 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                    <img alt="example" style={{ width: '80%' }} src={previewImage} />
                                                </Modal>
                                            </div>
                                            <div className="form-group">
                                                <label >Phone number:</label>
                                                <PhoneInput
                                                    style={{ width: "80%" }}
                                                    country={'vn'}
                                                    value={this.state.phone}
                                                    onChange={phone => this.setState({ phone })}
                                                />
                                            </div>
                                            {/* <button type="submit" className="btn btn-primary "  >Đăng Tin</button> */}

                                        </form>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-7">
                            <Card title="Hợp đồng kèm theo" bordered={true}>
                                {/* <WrappedDynamicFieldSet/> */}
                                <Form onSubmit={this.handleSubmit}  >
                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                        <Form.Item label="NGÀY TẠO HỢP ĐỒNG">
                                            <DatePicker onChange={this.onChange} />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <h>ĐẠI DIỆN HỢP ĐỒNG BÊN A</h>
                                        <Form.Item label="Họ tên chủ trọ">
                                            <Input placeholder="Họ tên chủ trọ" name="fullnameHost" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }} >
                                            </Input>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <Form.Item label="Số điện thoại:">
                                            <Input placeholder="số điện thoại chủ trọ" name="phoneHost" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }}>
                                            </Input>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <Form.Item label="Số chứng minh thư:">
                                            <Input placeholder="CMND" name="cmtHost" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }}>

                                            </Input>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <Form.Item label="Địa chỉ thường trú:">
                                            <Input placeholder="Địa chỉ thường trú chủ trọ" name="addressHost" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }}>
                                            </Input>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <h>ĐẠI DIỆN HỢP ĐỒNG BÊN B</h>
                                        <Form.Item label="Họ tên người thuê trọ">
                                            {/* <Input placeholder="Họ tên người thuê trọ" name="fullnameTenant" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }} >
                                            </Input> */}
                                            <Mentions style={{ width: '80%' }} placeholder="Họ tên người thuê trọ" disabled></Mentions>
                                            
                                           
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <Form.Item label="Số điện thoại:">
                                            {/* <Input placeholder="số điện thoại người thuê trọ" name="phoneTenant" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }}>
                                            </Input> */}
                                            <Mentions style={{ width: '80%' }} placeholder="số điện thoại người thuê trọ" disabled></Mentions>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <Form.Item label="Số chứng minh thư:">
                                            {/* <Input placeholder="CMND" name="cmtTenant" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }}>
                                            </Input> */}
                                            <Mentions style={{ width: '80%' }} placeholder="Số chứng minh thư" disabled></Mentions>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <Form.Item label="Địa chỉ thường trú:">
                                            {/* <Input placeholder="Địa chỉ thường trú người thuê trọ" name="addressTenant" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }}>

                                            </Input> */}
                                            <Mentions style={{ width: '80%' }} placeholder="Địa chỉ thường trú" disabled></Mentions>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <h>NỘI DUNG HỢP ĐỒNG:  </h>
                                        <Form.Item label="BÊN A">
                                            <Form.Item label="Nơi cho thuê trọ:">
                                                <Input placeholder="Địa chỉ thuê trọ" name="address" onChange={this.ishandleChange}
                                                    style={{ width: '80%', marginRight: 8, height: 40 }}>

                                                </Input>
                                            </Form.Item>
                                            <Form.Item label="Đặc điểm:">
                                                <Input placeholder="Đặc điểm nhà" name="mota" onChange={this.ishandleChange}
                                                    style={{ width: '80%', marginRight: 8, height: 40 }}>

                                                </Input>
                                            </Form.Item>
                                            <Form.Item label="Diện tích cho thuê:">
                                                <Input placeholder="Diện tích" name="dientich" onChange={this.ishandleChange}
                                                    style={{ width: '80%', marginRight: 8, height: 40 }}>

                                                </Input>
                                            </Form.Item>
                                            <Form.Item label="Cam kết:">
                                                <span>Bên A đồng ý cho bên B thuê căn nhà này với mục đích và hiện trạng
                                                    được nêu như trên.
                                                </span>
                                            </Form.Item>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <Form.Item label="BÊN B">
                                            <Form.Item label="Cam kết:">
                                                <span>Bên B đồng ý thuê nhà bên A với toàn bộ
                                    hiện trạng và mục đích sử dụng như trên.</span>
                                            </Form.Item>

                                        </Form.Item>

                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <h>THỜI HẠN HỢP ĐỒNG</h>
                                        <Form.Item label="Thời gian thuê nhà (theo tháng): ">
                                            <Input placeholder="kể từ ngày tạo hợp đồng" name="thoihan" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }}>

                                            </Input>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                        <h>GIÁ TIỀN CHO THUÊ:</h>
                                        <Form.Item label="Giá tiền thuê nhà ">
                                            <Input placeholder="theo tháng" name="price" onChange={this.ishandleChange}
                                                style={{ width: '80%', marginRight: 8, height: 40 }} />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                        <h>ĐIỀU KHOẢN HỢP ĐỒNG:</h>
                                        <Form.Item label="Điều khoản chung">
                                            <span></span>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                        <Button type="primary" htmlType="submit">
                                            Tạo hợp đồng và đăng tin cho thuê nhà
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
                <FooterHome />
            </div >
        )
    }
}
export default CreateContract;