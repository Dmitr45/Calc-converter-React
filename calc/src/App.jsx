import React from 'react';
import './App.css';
import ReactHeader from './components/ReactHeader/ReactHeader';
import Calc from './components/Calc/Calc';
import css from "./css.module.css"
import APIstate from './config/CoinMarket';




function App() { 
  APIstate();



  return (
    <div>
    <ReactHeader/>
    <div className={css.background}>
      <Calc/>
    </div>

    </div>
  );
}

export default App;
