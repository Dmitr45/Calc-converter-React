// import axios from 'axios';




// export default function Require(){
// axios = require('axios');

// let response = null;
// new Promise(async (resolve, reject) => {
// try {
//     response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
//     headers: {
//         'X-CMC_PRO_API_KEY': 'fb65b1c8-c2ba-4a5d-85f3-1f567b1a2e9d',
//     },
//     });
// } catch(ex) {
//     response = null;
//     // error
//     console.log(ex);
//     reject(ex);
// }
// if (response) {
//     // success
//     const json = response.data;
//     console.log(json);
//     resolve(json);
// }
// });
// }