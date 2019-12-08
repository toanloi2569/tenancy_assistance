import React from 'react';
import CreateForm from './components/createForm';
import TopBar from './components/TopBar'
import Banner from './components/Banner'



class App extends React.Component {

  render() {
    return (
      <div>
        <header class="header-area" id="top-bar">
          <TopBar />
        </header>
        <section class="banner_area">
          <Banner/>
        </section>
      </div>
    );
  }
}

export default App;
