import React from 'react';
import axios from 'axios';
import OverViewHomeBox from './components/OverViewHomeBox';
import TenantHeader from './components/Header/TenantHeader';
import UploadScreen from './components/UploadScreen';
import FilterHome from './components/FilterHome';
import FooterHome from './components/Footer/FooterHome';
// import { Row, Col } from 'antd';
// import 'antd/dist/antd.css';
// import 'react-router-dom';
import { Button } from 'antd';

class TenantScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            list: [
                {
                    _id: 1,
                    image: ["https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg"],
                    price: "3.500.000",
                    address: "128 Lương Đắng Bằng ",
                    
                },
                {
                    _id: 2,
                    image: ["https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg"],
                    price: "2.500.000",
                    address: "68 Hoàng Mai, Hà Nội",
                    
                },
                {
                    _id: 3,
                    image: ["https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg"],
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",
      
                },
                {
                    _id: 4,
                    image: ["https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg"],
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",
     
                },
                {
                    _id: 5,
                    image: ["https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg"],
                    price: "5.000.000",
                    address: "69 Đường Lê Duẫn",

                },
                {
                    _id: 6,
                    image: ["https://baobinhduong.org.vn/wp-content/uploads/2019/09/top-4-kieu-nha-tro-dang-tro-thanh-trend-doi-voi-nguoi-thue-1.jpg"],
                    price: "3.500.000",
                    address: "128 Lương Đắng Bằng ",
    
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
            let link_to = "/infoHome/"+home._id
            // if (home.status) {
                return (
                    <OverViewHomeBox
                        key={home._id}
                        href={link_to}
                        price={home.price}
                        address = {home.address}
                        img={home.image[0]} />
                        
                )

            // }

        })
        return (
            <div>
                <TenantHeader />
                <section className="banner-area bg-warning">
                    <div style={{ paddingTop: "110px"}} class="text-center align-bottom"><h1 class="text-light"> Tìm Phòng Trọ </h1></div>
                </section>
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 text-center">
                        <FilterHome />
                        <Button type="danger w-50" size={'large'} style={{margin:"15px"}} onClick={this.onSearch}>   
                            Tìm Kiếm
                        </Button>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12">
                        <div className="container">
                            <div className="row">
                                {elements}  
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <FooterHome/>
            </div>
        )
    }
}
export default TenantScreen;