import React, { Component } from 'react';
import OverViewHomeBox from './OverViewHomeBox'
import axios from 'axios'

export default class ListHome extends Component {
    constructor(props){
        super(props);
        this.state = ({
            list:  []
        })
    }
    componentDidMount(){
        var apiBaseUrl = "http://localhost:9000/users/";
        setTimeout(() => {axios.post(apiBaseUrl+'searchPost')
        .then((response)=> {
        if(response.status === 200 ){
            this.setState({
                list: response.data
            })
        }})
        },10)
    }

    render() {
        let elements = this.state.list.map((home, index) => {
            if (home.status) {
                return (
                    <OverViewHomeBox
                        key={home._id}
                        // name={home.name}
                        price={home.price}
                        address = "*******************"
                        img={home.image[0]} />
                        
                )

            }

        })
        return (
            <section class="accomodation_area section_gap bg-warning">
                <div class="container tab-content">
                    <div class="section_title text-center">
                        <h2 class="title_color">Bài đăng mới nhất</h2>
                    </div>
                    <div class="row justify-content-center">
                        {elements}
                    </div>
                </div>
            </section>
        );
    }
}