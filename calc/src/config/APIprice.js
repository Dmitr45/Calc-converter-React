import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';















export default function APIprice(isoBUY, isoSale) { 

let price =()=>{ 
            let result = 3;
            console.log("Запросили цену на " + isoBUY + " за " + isoSale + ". Отправили цену: " + result);
            return result
                };
return price 
}