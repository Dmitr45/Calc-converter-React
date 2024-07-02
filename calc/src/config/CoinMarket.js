import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function APIstate(){

// //const ====================================================================================
 const KEY = "fb65b1c8-c2ba-4a5d-85f3-1f567b1a2e9d"; //   https://pro.coinmarketcap.com/account
const apiUrl= "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

// State ====================================================================================
const [appState, setAppState] = useState();


// AXIOS GET =====================================================================================
axios.get(apiUrl).then((resp) => {
    const Data = resp.data;
    setAppState(Data);
  });


// useEffect ================================================================================
useEffect(() => {
console.log(appState);


}, [setAppState]);






}



