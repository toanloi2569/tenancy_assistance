import React from 'react';  
import TopBar from './components/TopBar'
import Banner from './components/Banner'
import Search from './components/Search'
import ListArea from './components/ListArea'
import ListHome from './components/ListHome'
import AboutUs from './components/AboutUs'
import Footer from './components/Footer'


export default class SearchHome extends React.Component {


    render() {
        return (
            <div>
                <TopBar />
                <section class="breadcrumb_area" style={{ background: "orange" }}>
                    <div class="bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background=""></div>
                    <div class="container">
                        <div class="page-cover left-align-p">
                            <h2 class="page-cover-tittle">Danh sách nhà trọ</h2>
                        </div>
                    </div>
                </section>
                <div class="container-fluid p-0 home-content">
                    <div class="container mt-5">
                        <div class="row">
                            <div class="col-xl-2 col-lg-2 col-md-3 d-none d-md-block">
                                <form method="GET" action="" id="courseList">
                                    <span class="blue-title">Filter Results</span>
                                    <a href="" class="clear-filters"><i class="fa fa-sync"></i>&nbsp;Clear filters</a>

                                    <h6 class="mt-3 underline-heading">Diện tích (m2)</h6>
                                    <ul class="ul-no-padding">
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="ins-level-<%=i%>"
                                                    name="instruction_level_id[]" value="<%=i%>" />
                                                <label class="custom-control-label" for="ins-level-<%=i%>">10000000</label>
                                            </div>
                                        </li>
                                    </ul>

                                    <h6 class="mt-3 underline-heading">Giá (đồng)</h6>
                                    <ul class="ul-no-padding">
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="0-0"
                                                    name="price_id[]" value="0-0" />
                                                <label class="custom-control-label" for="0-0">Free</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="1-50"
                                                    name="price_id[]" value="1-50" />
                                                <label class="custom-control-label" for="1-50">Less than USD 50</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="50-99"
                                                    name="price_id[]" value="50-99" />
                                                <label class="custom-control-label" for="50-99">USD 50 - USD 99</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="100-199"
                                                    name="price_id[]" value="100-199" />
                                                <label class="custom-control-label" for="100-199">USD 100 - USD 199</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="200-299"
                                                    name="price_id[]" value="200-299" />
                                                <label class="custom-control-label" for="200-299">USD 200 - USD 299</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="300-399"
                                                    name="price_id[]" value="300-399" />
                                                <label class="custom-control-label" for="300-399">USD 300 - USD 399</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="400-499"
                                                    name="price_id[]" value="400-499" />
                                                <label class="custom-control-label" for="400-499">USD 400 - USD 499</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input filter-results" id="500"
                                                    name="price_id[]" value="500" />
                                                <label class="custom-control-label" for="500">More than USD 500</label>
                                            </div>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            <div class="col-xl-10 col-lg-10 col-md-9">
                                <div class="row px-2">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-8">
                                        <span>Hiện thị 1 của 7 trang</span>
                                    </div>
                                    <div class="col-xl-2 offset-xl-4 col-lg-2 offset-lg-4 col-md-3 offset-md-3 col-sm-3 offset-sm-3 col-4">
                                        <select class="form-control form-control-sm sort-by">
                                            <option value="">Sắp Xếp</option>
                                            <option>Thấp đến Cao</option>
                                            <option>Cao đến Thấp</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                        <div class="course-block mx-auto">
                                            <a href="index.ejs">
                                                <main>
                                                    <img src="/image/room5.jpg" width="258" height="172" alt="" />
                                                    <div class="col-md-12">
                                                        <h6 class="course-title">Home Title</h6>
                                                    </div>
                                                    <div class="instructor-clist">
                                                        <div class="col-md-12">
                                                            <i class="fa fa-chalkboard-teacher"></i>&nbsp;
                                                <span>Created by <b>Anh Dung</b></span>
                                                        </div>
                                                    </div>
                                                </main>
                                                <footer>
                                                    <div class="c-row">
                                                        <div class="col-md-6 col-sm-6 col-6">
                                                            <h5 class="course-price"> 1500000 đ </h5>
                                                        </div>
                                                        <div class="col-md-5 offset-md-1 col-sm-5 offset-sm-1 col-5 offset-1">
                                                            <star class="course-rating">
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                            </star>
                                                        </div>
                                                    </div>
                                                </footer>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row float-right mt-5">
                                    <ul class="pagination">
                                        <li class="page-item disabled"><span class="page-link">«</span></li>
                                        <li class="page-item active"><span class="page-link">1</span></li>
                                        <li class="page-item">
                                            <a class="page-link"
                                                href="https://www.ulearnpro.com/demo/coursesinstruction_level_id%5B0%5D=2&amp;page=2">2</a>
                                        </li>
                                        <li class="page-item"><a class="page-link"
                                            href="https://www.ulearnpro.com/demo/coursesinstruction_level_id%5B0%5D=2&amp;page=2"
                                            rel="next">»</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}