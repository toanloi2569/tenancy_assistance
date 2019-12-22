import React from 'react';
import TenantHeader from './components/Header/TenantHeader';
import Profile from './components/Profile';
import FooterHome from './components/Footer/FooterHome';

class TenantProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            showEditInfo : false,
        }
    }

    handleClick = () => {
        this.setState({
            showEditInfo : true
        })
    }
    
    render() {

        const { showEditInfo } = this.state;
        return (
            <div>
                <TenantHeader />
                <section className="banner-area">
                    <div style={{ paddingTop: "100px" }} class="text-center align-bottom"><h1> Thong tin ca nhan </h1></div>
                </section>
                <div class="row justify-content-around align-items-center bg-warning" style={{ padding: "20px" }}>
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                        <h5><a><i class="lnr lnr-user"></i> Ho va Ten : Anh Dung</a></h5>
                        <h5><a><i class="lnr lnr-license"></i> So CMT : 0123456789</a></h5>
                        <h5><a><i class="lnr lnr-map-marker"></i> Dia chi : Ha Dong, Ha Noi</a></h5>
                        <h5><a><i class="lnr lnr-phone-handset"></i> So DT 0123456789</a></h5>
                        <h5><a><i class="lnr lnr-envelope"></i> Mail : dunganhprovip@gmail.com</a></h5>
                        <button id="btn2" type="button" class="btn btn-primary" onClick={this.handleClick}>Chinh sua thong tin</button>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-8 border bg-light" style={{ padding: "10px" }}>
                        <div class="card">
                            <img class="w-100 h-100" src="./image/blog/author.png" alt="" />
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-8 border bg-light" style={{ padding: "10px" }}>
                        <div class="card">
                            <img class="w-100 h-100" src="./image/blog/author.png" alt="" />
                        </div>
                    </div>
                </div>
                {showEditInfo && <Profile />}
                <FooterHome/>
            </div>
        )
    }
}
export default TenantProfile;