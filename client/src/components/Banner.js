import React, { Component } from 'react';
export default class Banner extends Component {
    render() {
        return (
            <div className="booking_table d_flex align-items-center">
                <div className="overlay bg-parallax" data-stellar-ratio="1.0" data-stellar-vertical-offset="0" data-background=""></div>
                <div className="container">
                    <div className="banner_content text-center">
                        <h2 class="text-warning">Tìm Nhà Nhanh</h2>
                        <h4 class="text-light">Nhanh Chóng, An Toàn, Tiện Lợi, Miễn Phí</h4>
                        <h4 class="text-light">Môi giới có thể không đưa đến một căn nhà. Nhưng chúng tôi luôn tìm được cho bạn một mái ấm</h4>
                    </div>
                </div>
            </div>
                );
            }
}