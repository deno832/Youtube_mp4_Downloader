// import logo from './logo.svg';
import './App.css';

import Baslik from "./components/baslik";
import Ana from "./components/ana";
import Footter from "./components/footter";


import React from 'react';

function App() {
  return (
    <div id='background'>
      <Baslik/>
      <Ana/>
      <Footter/>
    </div>
  );
}

export default App;