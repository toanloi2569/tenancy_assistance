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




const defaultCheckPrice = [];
const defaultCheckSquare = [];

class TenantScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            list: [],
            address: '',
            checkedListPrice: defaultCheckPrice,
            indeterminatePrice: true,
            checkAllPrice: false,
            checkedListSquare : defaultCheckSquare,
            indeterminateSquare: true,
            checkAllSquare: false,
        });
        this.onSearch = this.onSearch.bind(this)
        this.handler1 = this.handler1.bind(this)
        this.handler2 = this.handler2.bind(this)
        this.getaddress = this.getaddress.bind(this)
    }
    onSearch(){
        var firtsPrice = this.state.checkedListPrice[0]
        var minPrice = 0
        if (firtsPrice != undefined){
        if (firtsPrice == "<5tr"){
            minPrice = 0
        }else{ 
            if (firtsPrice == ">10tr"){
                 minPrice = 10000000
            }else{
                minPrice = 5000000
            }}
        }
        var lastPrice = this.state.checkedListPrice[-1]
        var maxPrice = 1000000000
        if (lastPrice!=undefined){
            if (lastPrice == "<5tr"){
                maxPrice = 5000000
            }else{ 
                if (lastPrice == ">10tr"){
                        maxPrice = 1000000000
                }else{
                    maxPrice = 10000000
                }}
        }
        var firtsSquare = this.state.checkedListSquare[0]
        var minSquare = 0
        if (firtsSquare!=undefined){
            if (firtsSquare == "<10m2"){
                minSquare = 0
            }else{ 
                if (firtsSquare == ">50m2"){
                    minSquare = 50
                }else{
                    minSquare = 10
            }}
        }
        var lastSquare = this.state.checkedListSquare[-1]
        var maxSquare = 1000000000
        if(lastSquare!==undefined){
            if (lastSquare == "<10m2"){
                maxSquare = 10
            }else{ 
                if (lastSquare == ">50m2"){
                        maxSquare = 1000000000
                }else{
                    maxSquare = 50
            }}
        }
        var address = null
        if(this.state.address[0]!== undefined){
            var address = this.state.address[0]+', '+this.state.address[1]
        }

        var payload = {
            'minPrice' : minPrice,
            'maxPrice' : maxPrice,
            'minSquare' : minSquare,
            'maxSquare' : maxSquare,
            'district' : address
        }
        console.log(payload)
        this.setState({
            list: []
        })
        var self = this;
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.post(apiBaseUrl+'searchPost', payload, { 'headers': { 'Authorization': localStorage.token } })
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

    handler1 = function(childstate){
        this.setState({
            checkedListPrice: childstate.checkedListPrice,
            indeterminatePrice: childstate.indeterminatePrice,
            checkAllPrice: childstate.checkAllPrice,
        })
    }

    handler2 = function(childstate){
        this.setState({
            checkedListSquare : childstate.checkedListSquare,
            indeterminateSquare: childstate.indeterminateSquare,
            checkAllSquare: childstate.checkAllSquare,
        })

    }

    getaddress = function(address){
        this.setState({
            address: address,
        })
    }

    componentDidMount() {
        // window.addEventListener('load', this.handleLoad);
        const {match:{params}} = this.props;
        console.log(params.id); 
        var apiBaseUrl = "http://localhost:9000/users/";
        setTimeout(() => {axios.post(apiBaseUrl+'searchPost', { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        if(response.status === 200 ){
            // console.log()
            this.setState({
                list: response.data
            })

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
        });},0)       

    }



    render(){
        console.log(this.state.list)
        let elements = this.state.list.map((home, index) => {
            let link_to = "/infoHome/"+home._id
                return (
                    <OverViewHomeBox
                        key={home._id}
                        href={link_to}
                        price={home.price}
                        address = {home.address}
                        img={home.image[0]} />
                )


        })
        console.log(elements)
        return (
            <div>
                <TenantHeader />
                <section className="banner-area bg-warning">
                    <div style={{ paddingTop: "110px"}} class="text-center align-bottom"><h1 class="text-light"> Tìm Phòng Trọ </h1></div>
                </section>
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 text-center">
                        <FilterHome 
                            handler1 = {this.handler1}
                            handler2 = {this.handler2} 
                            getaddress = {this.getaddress}
                        />
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