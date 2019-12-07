import React from 'react';
import CreateForm from './components/createForm';



class App extends React.Component{

  render(){

    return (
      <div >
        
        <nav className="navbar navbar-inverse">
          <a className="navbar-brand" >Post House</a>
          <ul className="nav navbar-nav">
          </ul>
        </nav>  
        <CreateForm />
  

        
     
      </div>


    

      );
    }
  }


export default App;
