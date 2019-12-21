import React from 'react';
import axios from 'axios';
import OverViewHomeBox from './components/OverViewHomeBox';
import TenantHeader from './components/Header/TenantHeader';
import UploadScreen from './components/UploadScreen';
import FilterHome from './components/FilterHome';
import {Row, Col, Button} from 'antd';
import 'antd/dist/antd.css';
import 'react-router-dom';

class TenantScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            list : [
                {
                    _id: 1,
                    name: "Chung cư mini giá rẻ",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "3.500.000",
                    address: "128 Lương Đắng Bằng ",
                    status: true
                },
                {
                    _id: 2,
                    name: "Nhà trọ sinh viên",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "2.500.000",
                    address: "68 Hoàng Mai, Hà Nội",
                    status: true
                },
                {
                    _id: 3,
                    name: "Nhà cấp 4 đầy đủ tiện nghi",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",
                    status: true
                },
                {
                    _id: 4,
                    name: "Nhà cấp 4 đầy đủ tiện nghi",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",
                    status: true
                },
                {
                    _id: 5,
                    name: "Nhà cấp 4 đầy đủ tiện nghi",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",
                    status: true
                },
                {
                    _id: 6,
                    name: "Chung cư mini giá rẻ",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "3.500.000",
                    address: "128 Lương Đắng Bằng ",
                    status: true
                },
                {
                    _id: 7,
                    name: "Nhà trọ sinh viên",
                    img: "https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg",
                    price: "2.500.000",
                    address: "68 Hoàng Mai, Hà Nội",
                    status: true
                },

            ]
        });
        this.onSearch = this.onSearch.bind(this)

    }
    onSearch(){
        // console.log(this.state.list)
        this.setState({
            list: []
        })
        var self = this;
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.post(apiBaseUrl+'searchPost', { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        if(response.status === 200 ){
            console.log(response.data)
            self.setState({
                list: response.data
            })
        console.log(this.state.list)

        }
        else if(response.status === 204){
            console.log("");
            
        }
        else{
            console.log("");
            alert("");
        }
        })

        

    }

    componentDidMount() {
        // window.addEventListener('load', this.handleLoad);
        const {match:{params}} = this.props;
        console.log(params.id); 
        var self = this;
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.post(apiBaseUrl+'searchPost', { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        // console.log(response);
        

        if(response.status === 200 ){
            // console.log()
            // self.setState({
            //     username: response.data.name,
            //     address : response.data.address,
            //     email : response.data.email,
            //     phone: response.data.phone,
            //     img: response.data.img
            // })
        

        }
        else if(response.status === 204){
            console.log("");
            alert(response.data.success)
        }
        else{
            console.log("");
            alert("");
        }
        })
        .catch(function (error) {
        console.log(error);
        localStorage.removeItem("token")
        });       

    }


    

    render(){
        console.log(this.state.list)
        let elements = this.state.list.map((home, index) => {
            let link_to = "/infoHome/"+home.landlord_id
            // if (home.status) {
                return (
                    <OverViewHomeBox
                        key={home._id}
                        href={link_to}
                        name={home.name}
                        price={home.price}
                        address = {home.address}
                        img={home.img} />
                        
                )

            // }

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
                        <Button type="primary" icon="search" className="container" onClick = {this.onSearch}>
                            Search
                        </Button>
                    </Col>
                </Row>
                
            </div>
        )
    }
}
export default TenantScreen;