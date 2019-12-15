import React, { Component } from 'react';
import ReviewHomeBox from './OverViewHomeBox'

export default class AboutUs extends Component {
    render() {
        return (
            <section class="about_history_area section_gap">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 d_flex align-items-center">
                            <div class="about_content ">
                                <h2 class="title title_color">Về chúng tôi<br />Nhiệm vụ và tầm nhìn</h2>
                                <p> Luôn đưa đến cho bạn những dịch vụ tốt nhất. Tiền của bạn là niềm vui của chúng tôi</p>
                                <a href="#" class="button_hover theme_btn_two">Xem nhiều hơn</a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <img class="img-fluid" src="image/about_bg.jpg" alt="img" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}