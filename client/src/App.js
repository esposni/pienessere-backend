import React from 'react';


import { Link } from "react-router-dom";
import './App.css';

class App extends React.Component {

  

  render() {

    //JSX
    return(
      <div className="app">
      <h2>Welcome to progetto pienessere app</h2>
      <Link to="/poesia"> <button style={{marginRight:"30px"}}>Crea Poesia</button></Link>
      <Link to="/ricetta"> <button >Crea Ricetta</button></Link>
      
       
      </div>
    );
  }
}


export default App;