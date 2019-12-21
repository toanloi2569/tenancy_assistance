import React from 'react';
import HostHeader from './components/Header/HostHeader'
import FooterHome from './components/Footer/FooterHome';

import { List, Avatar, Icon } from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'youtube.com',
        title: `Nha cho thue ${i}`,
        address: '5 Ta Quang Buu, Phuong Bach Khoa',
        district: 'Quan Hai Ba Trung, Ha Noi',
        square: "20m2",
        price: "2000000 VND",
        description:
            'AAAAA',
        content:
            'BBBBB',
    });
}

function ItemPost() {
    return (
        <article class="row blog_item">
            <div class="col-md-9">
                <div class="blog_post">
                    <img src="image/blog/main-blog/m-blog-1.jpg" alt="" />
                    <div class="blog_details">
                        <a href="#"><h2>Astronomy Binoculars A Great Alternative</h2></a>
                        <p>MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.</p>
                        <a href="#" class="view_btn button_hover">View More</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="blog_info text-left">
                    <ul class="blog_meta list_style">
                        <li><a><i class="lnr lnr-location"></i>5 Ta Quang Buu, Phuong Bach Khoa</a></li>
                        <li><a><i class="lnr lnr-map-marker"></i>Quan Hai Ba Trung</a></li>
                        <li><a><i class="lnr lnr-diamond"></i>2000000 VND</a></li>
                        <li><a><i class="lnr lnr-crop"></i>20 m2</a></li>
                    </ul>
                </div>
            </div>
        </article>
    )
}

function NavBAr() {
    return (
        <nav class="blog-pagination justify-content-center d-flex">
            <ul class="pagination">
                <li class="page-item">
                    <a href="#" class="page-link" aria-label="Previous">
                        <span aria-hidden="true">
                            <span class="lnr lnr-chevron-left"></span>
                        </span>
                    </a>
                </li>
                <li class="page-item"><a href="#" class="page-link">01</a></li>
                <li class="page-item active"><a href="#" class="page-link">02</a></li>
                <li class="page-item"><a href="#" class="page-link">03</a></li>
                <li class="page-item"><a href="#" class="page-link">04</a></li>
                <li class="page-item"><a href="#" class="page-link">09</a></li>
                <li class="page-item">
                    <a href="#" class="page-link" aria-label="Next">
                        <span aria-hidden="true">
                            <span class="lnr lnr-chevron-right"></span>
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

class ListHouseRent extends React.Component {
    render() {
        return (
            <div>
                <HostHeader />
                <section className="banner-area">
                    <div style={{ padding: "80px" }}> <h3>Danh Sach Bai Dang</h3></div>
                </section>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="blog_left_sidebar">
                                <ItemPost />
                                <ItemPost />
                                <ItemPost />
                                <ItemPost />
                                <NavBAr />
                            </div>
                        </div>
                        <div class="col-lg-4">
                        <div class="blog_right_sidebar">
                            <aside class="single_sidebar_widget search_widget">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search Posts"/>
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" type="button"><i class="lnr lnr-magnifier"></i></button>
                                    </span>
                                </div>
                                <div class="br"></div>
                            </aside>
                            <aside class="single_sidebar_widget author_widget">
                                <img class="author_img rounded-circle" src="image/blog/author.png" alt=""/>
                                <h4 style={{padding:"8px"}}>Anh Dung</h4>
                                <h5><a><i class="lnr lnr-phone-handset"></i> 0123456789</a></h5>
                                <h5><a><i class="lnr lnr-envelope"></i> dunganhprovip@gmail.com</a></h5>
                                <div class="br"></div>
                            </aside>
                            <aside class="single_sidebar_widget ads_widget">
                                <a href="#"><img class="img-fluid" src="image/blog/add.jpg" alt=""/></a>
                                <div class="br"></div>
                            </aside>
                            <aside class="single_sidebar_widget post_category_widget">
                                <h4 class="widget_title">Hop Dong</h4>
                                <ul class="list_style cat-list">
                                    <li>
                                        <a href="#" class="d-flex justify-content-between">
                                            <p>Technology</p>
                                            <p>37</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex justify-content-between">
                                            <p>Lifestyle</p>
                                            <p>24</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex justify-content-between">
                                            <p>Fashion</p>
                                            <p>59</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex justify-content-between">
                                            <p>Art</p>
                                            <p>29</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex justify-content-between">
                                            <p>Food</p>
                                            <p>15</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex justify-content-between">
                                            <p>Architecture</p>
                                            <p>09</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex justify-content-between">
                                            <p>Adventure</p>
                                            <p>44</p>
                                        </a>
                                    </li>															
                                </ul>
                                <div class="br"></div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome />
        </div>
        )
    }
}
export default ListHouseRent;