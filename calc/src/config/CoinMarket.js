import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function APIstate(){

//const ====================================================================================
const urlApi = new URL(
  "https://staging.baltbit.com/crypto-fusion/api/v1/public/real-time/how-much"
);
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

let body = {
  "payload": {
      "direction": "target",
      "source": {
          "currency": "USD"
      },
      "target": {
          "currency": "EUR"
      }
  }
};


// State ====================================================================================
const [apiData, setApiData] = useState();


// Fetch POST =====================================================================================
const requestOptions = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(body)
};

fetch(urlApi, requestOptions)
  .then(response => response.json())




// useEffect ================================================================================
useEffect(() => {
console.log(apiData);


}, [apiData]);

}



