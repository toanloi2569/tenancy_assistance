import React, { Component } from 'react';
import OverViewHomeBox from './OverViewHomeBox'

export default class ListHome extends Component {
    constructor(props){
        super(props);
        this.state = ({
            list:  [
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
                }
            ]

            
        })
    }
    render() {
        let elements = this.state.list.map((home, index) => {
            if (home.status) {
                return (
                    <OverViewHomeBox
                        key={home.id}
                        name={home.name}
                        price={home.price}
                        address = "*******************"
                        img={home.img} />
                        
                )

            }

        })
        return (
            <section class="accomodation_area section_gap bg-warning">
                <div class="container tab-content">
                    <div class="section_title text-center">
                        <h2 class="title_color">Bài đăng mới nhất</h2>
                    </div>
                    <div class="row">
                        {elements}
                    </div>
                </div>
            </section>
        );
    }
}