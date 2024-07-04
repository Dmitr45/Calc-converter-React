import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function APIstate(isoBUY){

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
      "direction": "source",
      "source": {
          "currency": "EUR"
      },
      "target": {
        "amount": "1.00",
          "currency": "BTC"
      }
  }
};


// State ====================================================================================
const [apiData, setApiData] = useState();


// Fetch Post ===============================================================================

useEffect(()=>{
  const timer = setInterval(() => {
                                      fetch(urlApi, {
                                        method: "POST",
                                        headers,
                                        body: JSON.stringify(body),
                                      }).then(response => response.json())
                                      .then((data) => {setApiData(data.data.source.amount)})
                                        
  }, 20000);
  
  // очистка интервала
  return () => clearInterval(timer);
});




return apiData


}



