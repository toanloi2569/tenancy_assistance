import React from 'react';
import ImageUploader from 'react-images-upload';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'antd/dist/antd.css';
import { Cascader } from 'antd';
// import UserHeader from './UserHeader';
import HostHeader from './Header/HostHeader';
import axios from 'axios';
// import HostScreen from '../HostScreen';
// import './index.css';
import { Upload, Icon, Modal } from 'antd';
import settings from '../config'


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
        let result = Object.keys(obj).map(function(key) {
        return {value: key,  label: obj[key]};
        });
        return result;
}
  
const convertAddress = obj => {
    let result = Object.keys(obj).map(function(key) {
      return {value: key,  label: obj[key].name , children: convertCitis(obj[key].cities)};
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

class CreateForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          textDistrict: "",
          textSquare: 0,
          textPrice: 0,
          textDesc:"",
          pictures : [],
          address :[],
          phone : '',
          previewVisible: false,
          previewImage: '',
          fileList: [
            {
              uid: '-5',
              name: 'image.png',
              status: 'error',
            }
          ],

        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.handleAddress =  this.handleAddress.bind(this);
        
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





        onHandleChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
          [name]: value
        })
    
        }
        onHandleSubmit(event){
        event.preventDefault();
        console.log(this.state);
        var apiBaseUrl = settings.apiBaseUrl;
        var self = this;

        var payload = {
          "square": this.state.textSquare,
          "price": this.state.textPrice,
          // swap adress and district
          "address": this.state.textDistrict,
          "district": this.state.address,
          "img": this.state.fileList,
          "phone": this.state.phone,
          "content": this.state.textDesc
        }
        axios.post(apiBaseUrl + '/users/createPost', payload)
        .then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            console.log("registration successfull");
          }
          else {
            console.log("some error ocurred", response.data.code);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    
        }


    render(){

      const previewVisible = this.state.previewVisible;
      const previewImage = this.state.previewImage;
      const fileList = this.state.fileList;
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload CMT mặt trước và mặt sau</div>
        </div>
      );
        return(
            <div>
              <HostHeader/>
                <div className="container ">       
                    <div className="row" style ={{marginTop: 7 + 'em'}} >
                    <div className="col align-self-start">
                      <h1>Đăng Tin Thuê Nhà</h1>
                    </div>
                      
                        <div className="col align-self-center" >
                        
                        <form onSubmit={this.onHandleSubmit} >

                            <label> District:</label>
                            <Cascader 
                                style={{ width: "100%" }}
                                options={convertAddress(vn)}
                                placeholder="Select Address"
                                onChange={this.handleAddress}
                                />
                    
                            <div className="form-group">
                            <label >Address: </label>
                            <input type="text" className="form-control" name = "textDistrict" 
                            onChange={this.onHandleChange}
                            value = {this.state.textDistrict}/> 
                            </div>
                            <div className="form-group">
                            <label >Square (m2):</label>
                            <input type="number" className="form-control" name = "textSquare" 
                            onChange={this.onHandleChange}
                            value = {this.state.textSquare}/> 
                            </div>
                            <div className="form-group">
                            <label >Price (VNĐ):</label>
                            <input type="number" className="form-control" name = "textPrice" 
                            onChange={this.onHandleChange}
                            value = {this.state.textPrice}/> 
                            </div>
                            <div className="form-group">
                            <label >Phone:</label>
                            <input type="number" className="form-control" name = "phone" 
                            onChange={this.onHandleChange}
                            value = {this.state.phone}/> 
                            </div>

                            <div className="form-group">
                            <label >Content:</label>
                            
                            <textarea className="form-control" rows="5" name = "textDesc" 
                            onChange = {this.onHandleChange}
                            value = {this.state.textDesc}
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
                              <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                          </div>
                            <div className="form-group">
                            <label >Phone number:</label>
                            <PhoneInput
                                style={{ width: "100%" }}
                                country={'vn'}
                                value={this.state.phone}
                                onChange={phone => this.setState({ phone })}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary "  >Đăng Tin</button>
                            
                        </form>
                        </div>
                    </div>
                </div>  
                
            </div>

        )
    }
}
export default CreateForm;