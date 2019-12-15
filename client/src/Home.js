import React from 'react';
import CreateForm from './components/createForm';
import TopBar from './components/TopBar'
import Banner from './components/Banner'
import Search from './components/Search'
import ListArea from './components/ListArea'
import ListHome from './components/ListHome'
import AboutUs from './components/AboutUs'
import Footer from './components/Footer'



class Home extends React.Component {

  render() {
    return (
      <div>
        <TopBar />
        <section class="banner_area">
          <Banner/>
          <Search/>
        </section>
        <ListArea/>
        <ListHome/>
        <AboutUs />
        <Footer/>
      </div>
    );
  }
}

export default Home;
