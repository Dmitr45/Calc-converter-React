import { useState, useEffect } from "react";


export default async function APIprice() { 

// Const ====================================================================================
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

// Connect =====================================================================================




    //     fetch(urlApi, {
    //     method: "POST",
    //     headers,
    //     body: JSON.stringify(body),
    // }).then(response => response.json())
    //  .then((data) => {console.log(data.data.source.amount); return data.data.source.amount })


//=================================================================================================================
return 


}