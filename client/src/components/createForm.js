import React from 'react';
import ImageUploader from 'react-images-upload';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'antd/dist/antd.css';
import { Cascader } from 'antd';
import axios from 'axios'
import settings from '../setting'
// import Address from './address';

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

const convertDistrict = obj => {
  let result = Object.keys(obj).map(function (key) {
    return { value: key, label: obj[key].name, children: convertCitis(obj[key].cities) };
  });
  return result;
};

class CreateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //   textAddress: "",
      textAddress: "",
      textSquare: 0,
      textPrice: 0,
      textDesc: "",
      pictures: [],
      district: []

    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleDistrict = this.handleDistrict.bind(this);

  }
  handleDistrict(district) {
    this.setState({
      district: this.state.district.concat(district),

    });
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  onHandleChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })

  }
  onHandleSubmit(event) {
    event.preventDefault();
    axios.post('/users/createPost', {
      square: this.state.textSquare,
      price: this.state.textPrice,
      district: this.state.district[0] + " " + this.state.district[1],
      address: this.state.textAddress,
      phone: this.state.phone,
      content: this.state.textDesc,
      image: this.state.pictures
    }).then(res =>{
      console.log(res);
    })
  }
  render() {
    return (
      <div>
        <div className="container">

          <div className="row">
            <div className="col-md-4 col-md-offset-4">

              <form onSubmit={this.onHandleSubmit} >
                {/* <Address /> */}
                <label>District:</label>
                <Cascader
                  style={{ width: "100%" }}
                  options={convertDistrict(vn)}
                  placeholder="Select District"
                  onChange={this.handleDistrict}
                />

                <div className="form-group">
                  <label >Address: </label>
                  <input type="text" className="form-control" name="textAddress"
                    onChange={this.onHandleChange}
                    value={this.state.textAddress} />
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
                  <label >Content:</label>

                  <textarea className="form-control" rows="5" name="textDesc"
                    onChange={this.onHandleChange}
                    value={this.state.textDesc}
                  ></textarea>

                </div>
                <label> Upload Image:</label>

                <ImageUploader
                  withIcon={false}
                  buttonText='Choose images'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                />

                <div className="form-group">
                  <label >Phone number:</label>
                  <PhoneInput
                    style={{ width: "100%" }}
                    country={'vn'}
                    value={this.state.phone}
                    onChange={phone => this.setState({ phone })}
                  />
                </div>

                <button type="submit" className="btn btn-primary "  >Submit</button>

              </form>
            </div>
          </div>
        </div>

      </div>

    )
  }
}
export default CreateForm;