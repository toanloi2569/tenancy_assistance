import React from 'react';
import TopBar from './components/TopBar';
import Banner from './components/Banner';
import FooterHome from './components/Footer/FooterHome';
// import image from 'material-ui/svg-icons/image/image';
import './index.css';
import ListArea from './components/ListArea'
import ListHomeArea from './components/ListHomeArea'
import AboutUs from './components/AboutUs'

class Home extends React.Component {

  render() {
    return (
      <div>
        <header className="header-area" id="top-bar">
          <TopBar />
        </header>
        <section className="banner_area">
          <Banner/>
        </section>
        <ListArea></ListArea>
        <ListHomeArea></ListHomeArea>
        <AboutUs />
        <FooterHome/>
      </div>
    );
  }
}

export default Home;
