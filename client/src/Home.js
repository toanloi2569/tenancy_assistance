import React from 'react';
import TopBar from './components/TopBar'
import Banner from './components/Banner'



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
      </div>
    );
  }
}

export default Home;
