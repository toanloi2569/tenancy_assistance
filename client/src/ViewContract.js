import React from 'react';
import FooterHome from './components/Footer/FooterHome';
import Header from './components/Header';

function PersonalInfo() {
    return (
        <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
            <h3 class="border bg-warning">Ben A</h3>
            <h4>Anh Dung</h4>
            <h5><a><i class="lnr lnr-license"></i> So CMT : 0123456789</a></h5>
            <h5><a><i class="lnr lnr-map-marker"></i> Ha Dong, Ha Noi</a></h5>
            <h5><a><i class="lnr lnr-phone-handset"></i> 0123456789</a></h5>
            <h5><a><i class="lnr lnr-envelope"></i> dunganhprovip@gmail.com</a></h5>
            <p class="border bg-light"><a>
                -----BEGIN PUBLIC KEY----- <br />
                MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdwSw75msocxvpxPD0UNjJRrp+<br />
                GYngh+x18CtBWHlgUFlCFGjxqfyn2cdiZGQPubyprqGzVIBYNHU2XJcBJWHQOCBG<br />
                CN12br4N7AckDw8LvxmcqSdYinJytzkzVWq0Y6l0hrLHr4jCzWQ90nLaCF5xE+Up<br />
                PIs+DvA+XXyLRzXDUQIDAQAB<br />
                -----END PUBLIC KEY-----<br />
            </a></p>
            <div class="br"></div>
        </aside>
    )
}


export default class ViewConTract extends React.Component {

    constructor() {
        super();
        this.state = {
            showCheck1 : false,
            showCheck2 : false
        }
    }

    handleClickBtn1 = () => {
        this.setState({
            showCheck1 : true
        })
        alert("Chu ky hop le !!!!")
    }

    handleClickBtn2 = () => {
        this.setState({
            showCheck2: true
        })
        alert("Chu ky hop le !!!!")
    }

    render() {

        const { showCheck1,showCheck2 } = this.state;

        return (
            <div>
                <Header />
                <section className="banner-area">
                    <div style={{ paddingTop: "100px" }} class="text-center align-bottom"><h1> Hop Dong Thue Nha </h1></div>
                </section>
                <h5 style={{ padding: "15px", paddingLeft: "30px" }}>
                    Ngay tao : 20/12/2019
                </h5>
                <div class="row" style={{ padding: "30px", paddingTop: "0px" }}>
                    <div class="col-12 text-center">
                        <div class="card-deck">
                            <PersonalInfo />
                            <PersonalInfo />
                        </div>
                    </div>
                </div>
                <div class="row card-deck" style={{ padding: "30px", paddingTop: "0px" }}>
                    <div class="col-12 card">
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            1. Noi dung hop dong
                        </h3>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <div class="row align-items-center" style={{ padding: "10px" }}>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <h3 class="text-left">
                                    2. Thoi han hop dong
                                </h3>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                                <h4> Ngay bat dau :11/11/2011</h4>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                                <h4> Ngay ket thuc : 08/08/2018</h4>
                            </div>
                        </div>
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            3. Gia thue va Phuong thuc thanh toan
                        </h3>
                        <div class="row align-items-center" style={{ paddingLeft: "18px" }}>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <h4 class="text-left">
                                    3.1 Gia thue
                                </h4>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                                <h4> 2000000 VND/thang</h4>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                            </div>
                        </div>
                        <h4 class="text-left" style={{ paddingLeft: "18px" }}>
                            3.2 Phuong thuc thanh toan
                        </h4>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            4. Trach nhiem cac ben
                        </h3>
                        <h4 class="text-left" style={{ paddingLeft: "18px" }}>
                            4.1 Trach nhiem cua ben A
                        </h4>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <h4 class="text-left" style={{ paddingLeft: "18px" }}>
                            4.2 Trach nhiem cua ben A
                        </h4>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            5. Dieu khoan chung
                        </h3>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                Ben A chu so huu can nha dong y cho ben B duoc phep
                                thue nha tai dia chi 5 Ta Quang Buu, Phuong Bach Khoa,
                                Quan Hai Ba Trung, Ha Noi. Trang thiet bi trong nha gom co
                                : Quat, Dieu hoa, Tu lanh, ...
                            </p>
                        </div>
                        <h3 class="text-left" style={{ padding: "10px" }}>
                            Hash Contract
                        </h3>
                        <div class="border" style={{ padding: "15px" }}>
                            <p>
                                MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdwSw75msocxvpxPD0UNjJRrp+
                                GYngh+x18CtBWHlgUFlCFGjxqfyn2cdiZGQPubyprqGzVIBYNHU2XJcBJWHQOCBG
                                CN12br4N7AckDw8LvxmcqSdYinJytzkzVWq0Y6l0hrLHr4jCzWQ90nLaCF5xE+Up
                                PIs+DvA+XXyLRzXDUQIDAQAB
                            </p>
                        </div>
                        <br />
                    </div>
                </div>
                <div class="card-deck text-center" style={{ padding: "30px", paddingTop: "0px" }}>
                    <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-warning"> Chu ky Ben A</h3>
                        <p class="border bg-light"><a>
                            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdwSw75msocxvpxPD0UNjJRrp+<br />
                            GYngh+x18CtBWHlgUFlCFGjxqfyn2cdiZGQPubyprqGzVIBYNHU2XJcBJWHQOCBG<br />
                            CN12br4N7AckDw8LvxmcqSdYinJytzkzVWq0Y6l0hrLHr4jCzWQ90nLaCF5xE+Up<br />
                            PIs+DvA+XXyLRzXDUQIDAQAB<br />
                        </a></p>
                        <button id="btn1" type="button" class="btn btn-primary" onClick={this.handleClickBtn1}>Kiem tra chu ky</button>
                        <div class="br"></div>
                    </aside>
                    <aside class=" card single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-warning"> Chu ky Ben B</h3>
                        <p class="border bg-light"><a>
                            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdwSw75msocxvpxPD0UNjJRrp+<br />
                            GYngh+x18CtBWHlgUFlCFGjxqfyn2cdiZGQPubyprqGzVIBYNHU2XJcBJWHQOCBG<br />
                            CN12br4N7AckDw8LvxmcqSdYinJytzkzVWq0Y6l0hrLHr4jCzWQ90nLaCF5xE+Up<br />
                            PIs+DvA+XXyLRzXDUQIDAQAB<br />
                        </a></p>
                        <button id="btn2" type="button" class="btn btn-primary" onClick={this.handleClickBtn2}>Kiem tra chu ky</button>
                        <div class="br"></div>
                    </aside>
                </div>
                <div class="row text-center" style={{ padding: "30px", paddingTop: "0px" }}>
                    {showCheck1 && <aside class="col-6 single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-red"> Content Decode </h3>
                        <p class="border bg-light"><a>
                            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdwSw75msocxvpxPD0UNjJRrp+<br />
                            GYngh+x18CtBWHlgUFlCFGjxqfyn2cdiZGQPubyprqGzVIBYNHU2XJcBJWHQOCBG<br />
                            CN12br4N7AckDw8LvxmcqSdYinJytzkzVWq0Y6l0hrLHr4jCzWQ90nLaCF5xE+Up<br />
                            PIs+DvA+XXyLRzXDUQIDAQAB<br />
                        </a></p>
                        <div class="br"></div>
                    </aside>}
                    {showCheck2 && <aside class="col-6 ml-auto single_sidebar_widget author_widget" style={{ padding: "10px" }}>
                        <h3 class="border bg-red"> Content Decode </h3>
                        <p class="border bg-light"><a>
                            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdwSw75msocxvpxPD0UNjJRrp+<br />
                            GYngh+x18CtBWHlgUFlCFGjxqfyn2cdiZGQPubyprqGzVIBYNHU2XJcBJWHQOCBG<br />
                            CN12br4N7AckDw8LvxmcqSdYinJytzkzVWq0Y6l0hrLHr4jCzWQ90nLaCF5xE+Up<br />
                            PIs+DvA+XXyLRzXDUQIDAQAB<br />
                        </a></p>
                        <div class="br"></div>
                    </aside>}
                </div >
                <FooterHome />
            </div >
        )
    }
}