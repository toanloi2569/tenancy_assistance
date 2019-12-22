import React from 'react';
import Search from './Search';
import 'antd/dist/antd.css';
import '../index.css';
import { Card } from 'antd';
import { Checkbox } from 'antd';
import { Cascader } from 'antd';

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


const CheckboxGroup = Checkbox.Group;

const priceOptions = ['<5tr', '5tr-10tr', '>10tr'];
const defaultCheckPrice = [];

const squareOptions = ['<10m2', '10m2-50m2',">50m2"];
const defaultCheckSquare = [];

class FilterHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            checkedListPrice: defaultCheckPrice,
            indeterminatePrice: true,
            checkAllPrice: false,
            checkedListSquare : defaultCheckSquare,
            indeterminateSquare: true,
            checkAllSquare: false,
        };
        this.handleAddress = this.handleAddress.bind(this)


    }
    onChangePrice = checkedListPrice => {
        this.setState({
            checkedListPrice,
            indeterminatePrice: !!checkedListPrice.length && checkedListPrice.length < priceOptions.length,
            checkAllPrice: checkedListPrice.length === priceOptions.length,
        });
        this.props.handler1({
            checkedListPrice,
            indeterminatePrice: !!checkedListPrice.length && checkedListPrice.length < priceOptions.length,
            checkAllPrice: checkedListPrice.length === priceOptions.length,
        });
    };
    onChangeSquare = checkedListSquare => {
        this.setState({
            checkedListSquare,
            indeterminateSquare: !!checkedListSquare.length && checkedListSquare.length < squareOptions.length,
            checkAllSquare: checkedListSquare.length === squareOptions.length,
        });
        this.props.handler2({
            checkedListSquare,
            indeterminateSquare: !!checkedListSquare.length && checkedListSquare.length < squareOptions.length,
            checkAllSquare: checkedListSquare.length === squareOptions.length,
        });
    };

    onCheckAllChangePrice = e => {
        this.setState({
            checkedListPrice: e.target.checked ? priceOptions : [],
            indeterminatePrice: false,
            checkAllPrice: e.target.checked,
        });
        this.props.handler1({
            checkedListPrice: e.target.checked ? priceOptions : [],
            indeterminatePrice: false,
            checkAllPrice: e.target.checked,
        });
    
    };
    onCheckAllChangeSquare = e => {
        this.setState({
            checkedListSquare: e.target.checked ? squareOptions : [],
            indeterminateSquare: false,
            checkAllSquare: e.target.checked,
        });
        this.props.handler2({
            checkedListSquare: e.target.checked ? squareOptions : [],
            indeterminateSquare: false,
            checkAllSquare: e.target.checked,
        });
    };

    handleAddress(address) {
        this.setState({
            address: address,
        });
        this.props.getaddress(address)
    }

    render() {
        return (
            <div className="container">
                <Card title="Tìm kiếm theo các hạng mục "  >
                <p> 
                    <label>Address:</label>
                    <div >
                        <Cascader 
                            style={{ width: "100%"
                                }}
                            options={convertAddress(vn)}
                            placeholder="Select Address"
                            onChange={this.handleAddress}
                            />
                    </div>
                </p>
                <p>
                    <label>Price</label>
                    <div>
                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminatePrice={this.state.indeterminatePrice}
                        onChange={this.onCheckAllChangePrice}
                        checked={this.state.checkAllPrice}
                    >
                        Check all price
                    </Checkbox>
                        </div>
                        <br />
                        <CheckboxGroup
                            options={priceOptions}
                            value={this.state.checkedListPrice}
                            onChange={this.onChangePrice}
                        />
                    </div>
                </p>
                <p>
                    <label>Square</label>
                    <div>
                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminateSquare={this.state.indeterminateSquare}
                        onChange={this.onCheckAllChangeSquare}
                        checked={this.state.checkAllSquare}
                    >
                        Check all square
                    </Checkbox>
                        </div>
                        <br />
                        <CheckboxGroup
                            options={squareOptions}
                            value={this.state.checkedListSquare}
                            onChange={this.onChangeSquare}
                        />
                    </div>
                </p> 
                </Card>

            </div>
        )
    }
}
export default FilterHome;