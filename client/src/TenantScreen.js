import React from 'react';
// import axios from 'axios';
import OverViewHomeBox from './components/OverViewHomeBox';
import TenantHeader from './components/Header/TenantHeader';
import UploadScreen from './components/UploadScreen';
import FilterHome from './components/FilterHome';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';
class TenantScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            list : [
                {
                    id: 1,
                    name: "Chung cư mini giá rẻ",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "3.500.000",
                    address: "128 Lương Đắng Bằng ",
                    status: true
                },
                {
                    id: 2,
                    name: "Nhà trọ sinh viên",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "2.500.000",
                    address: "68 Hoàng Mai, Hà Nội",
                    status: true
                },
                {
                    id: 3,
                    name: "Nhà cấp 4 đầy đủ tiện nghi",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",
                    status: true
                },
                {
                    id: 4,
                    name: "Nhà cấp 4 đầy đủ tiện nghi",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",
                    status: true
                },
                {
                    id: 5,
                    name: "Nhà cấp 4 đầy đủ tiện nghi",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",
                    status: true
                },
                {
                    id: 6,
                    name: "Chung cư mini giá rẻ",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "3.500.000",
                    address: "128 Lương Đắng Bằng ",
                    status: true
                },
                {
                    id: 7,
                    name: "Nhà trọ sinh viên",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "2.500.000",
                    address: "68 Hoàng Mai, Hà Nội",
                    status: true
                },
            ]
        });

    }
    // componentDidMount() {
    //     window.addEventListener('load', this.handleLoad);
    // }
    
    // handleLoad() {
    //     var apiBaseUrl = "http://localhost:9000/users/";
    //     axios.get(apiBaseUrl+'profileUser', { 'headers': { 'Authorization': localStorage.token } })
    //     .then(function (response) {
    //     console.log(response);
    //     if(response.status === 200){
    //         console.log("Login successfull");
    //     }
    //     else if(response.status === 204){
    //         console.log("Username password do not match");
    //         alert(response.data.success)
    //     }
    //     else{
    //         console.log("Username does not exists");
    //         alert("Username does not exist");
    //     }
    //     })
    //     .catch(function (error) {
    //     console.log(error);
    //     localStorage.removeItem("token")
    //     });
    // }

    

    render(){

        let elements = this.state.list.map((home, index) => {
            if (home.status) {
                return (
                    <OverViewHomeBox
                        key={home.id}
                        name={home.name}
                        price={home.price}
                        address = {home.address}
                        img={home.img} />
                        
                )

            }

        })



        return(
            <div>
                <TenantHeader/>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <Row>
                    <Col span={18} push={6}>
                        <div className="container">
                            <div className="row">
                                {elements}
                                
                            </div>
                        </div>
                    </Col>
                    <Col span={6} pull={18}>
                        <FilterHome/>
                    </Col>
                </Row>
                
            </div>
        )
    }
}
export default TenantScreen;