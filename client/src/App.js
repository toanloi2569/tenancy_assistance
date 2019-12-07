import React, { Component } from "react";
// const INPUT_TIMEOUT = 250; //ms - It's our input delay

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "" 
        };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div>
                {/* <!--================Header Area =================--> */}
                <header class="header_area">
                    <div class="container">
                        <nav class="navbar navbar-expand-lg navbar-light">
                            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                            <a class="navbar-brand logo_h" href="index.html"><img class="logo_h" src="image/logo_renthome1.jpg" alt=""/></a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                            <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                                <ul class="nav navbar-nav menu_nav ml-auto">
                                    <li class="nav-item"><a class="nav-link" href="index.html">Tìm nhà</a></li> 
                                    <li class="nav-item"><a class="nav-link" href="elements.html">Cho thuê</a></li>
                                    <li class="nav-item"><a class="nav-link" href="contact.html">Giới thiệu</a></li>
                                    <li class="nav-item"><a class="nav-link" href="elements.html">Đăng nhập</a></li>
                                </ul>
                            </div> 
                        </nav>
                    </div>
                </header>
                {/* <!--================Header Area =================--> */}
                
                {/* <!--================Banner Area =================--> */}
                <section class="banner_area">
                    <div class="booking_table d_flex align-items-center">
                        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
                        <div class="container">
                            <div class="banner_content text-center">
                                <h6>Chọn nhà theo cách của bạn</h6>
                                <h2>Tìm nhà nhanh</h2>
                                <p>Môi giới không chắc chắn cho bạn một căn nhà<br/> Nhưng chúng tôi sẽ luôn tìm cho bạn một mái ấm</p>
                            </div>
                            <div id="search"></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;