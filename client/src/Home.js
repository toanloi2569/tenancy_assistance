import React from 'react';
import Banner from './components/Banner';
import FooterHome from './components/Footer/FooterHome';
// import image from 'material-ui/svg-icons/image/image';
import './index.css';
import ListArea from './components/ListArea'
import ListHomeArea from './components/ListHomeArea'
import AboutUs from './components/AboutUs'
import Header from './components/Header';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <br/><br/>
        <section className="banner_area">
          <Banner/>
        </section>
        <ListArea/>
        <ListHomeArea/>
        <AboutUs />
        <FooterHome/>
      </div>
    );
  }
}

export default Home;
