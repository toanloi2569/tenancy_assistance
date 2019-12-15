import React, { Component } from 'react';

export default class OverViewAreaBox extends Component {
    render() {
        return (
            <div class="col-lg-4 col-md-6">
                <div class="single-recent-blog-post">
                    <div class="thumb">
                        <img class="img-fluid" src="image/blog/blog-1.jpg" alt="post"/>
                    </div>
                    <div class="details">
                        <div class="tags">
                            <a href="#" class="button_hover tag_btn">100 bài đăng</a>
                            <a href="#" class="button_hover tag_btn">100 lượt xem</a>
                        </div>
                        <a href="#"><h4 class="sec_h4">Low Cost Advertising</h4></a>
                        <p>Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer.</p>
                    </div>
                </div>
            </div>
        );
    }
}