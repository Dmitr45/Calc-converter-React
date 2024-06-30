import CURRENCY from "./currency.json";

type currType = {
    iso: string,
    nameRU: string,
    nameEN: string,
    icon: string,
    };


export default function config(key:string):currType[]{



switch (key) {
    case "CURRENCY" : return CURRENCY.currency;
    case "CRYPTOCURRENCY" : return CURRENCY.cryptocurrency;
    default: return [{"iso": "err", "nameRU": "err", "nameEN": "Euro", "icon": "Euro"}];
}


} 

