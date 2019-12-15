import React from 'react';
import 'antd/dist/antd.css';
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

class Search extends React.Component{
    render(){
        return(
            <div >
                <Cascader 
                    style={{ width: "100%"
                         }}
                    options={convertAddress(vn)}
                    placeholder="Select Address"
                    onChange={this.handleAddress}
                    />

            </div>

        )
    }
}
export default Search;
