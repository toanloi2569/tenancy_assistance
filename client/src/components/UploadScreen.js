import React from 'react';
import ListHome from './ListHome';

class UploadScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var list = [
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
        ];

        let elements = list.map((home, index) => {
            if (home.status) {
                return (
                    <ListHome
                        key={home.id}
                        name={home.name}
                        price={home.price}
                        address = {home.address}
                        img={home.img} />
                        
                )

            }

        })

        return (
            <div className="container">
                <div className="row">
                    {/* <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"> */}
                        {elements}
                    {/* </div> */}
                </div>
            </div>
        )
    }
}
export default UploadScreen;