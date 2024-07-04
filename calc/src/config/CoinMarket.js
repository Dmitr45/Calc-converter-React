import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function APIstate(isoBUY, isoSALE){

// //const ====================================================================================
 const KEY = "cur_live_TaNrZpd4nenVo48AivP92jkELxjKF2yZw8bEZZCq"; //   https://app.currencyapi.com/dashboard
const apiUrl=  "https://api.currencyapi.com/v3/latest?apikey="  //  https://app.currencyapi.com/dashboard

// State ====================================================================================
const [jsonData, setJsonData] = useState();


// AXIOS POST =====================================================================================

axios({
  method: 'get',
  url: apiUrl+KEY,
  data: {}
})
  .then(response => {
    console.log(response.data);
    setJsonData(response.data);
    })
  .catch(error => {
    console.log(error);
    })

// useEffect ================================================================================


return  jsonData
}



