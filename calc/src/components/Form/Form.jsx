import css  from './styles.module.css';
import config from '../../config/config';
import { useEffect, useState, useRef } from 'react';
import lightTheme from '../../config/light-theme.module.css';
import darkTheme from '../../config/dark-theme.module.css';
import Loader from "react-js-loader";
import axios from 'axios';


export default function Form(props){
//Props==========================================================================================================================
let DarkTheme= props.DarkTheme;

//BuySellSwap ===================================================================================================================
const [ActivCategory, setActivCategory] = useState("Buy");


useEffect(()=>{setActivCategory(ActivCategory);   },[ActivCategory]);

const BuyButton = <div className={ActivCategory == "Buy" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Buy")}}>Buy</div>;
const SellButton = <div className={ActivCategory == "Sell" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Sell")}}>Sell</div>;
const SwapButton = <div className={ActivCategory == "Swap" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Swap")}}>Swap</div>;
const allButton = [BuyButton, SellButton, SwapButton] 


// Const Let =========================================================================================================================
const CURRENCY= config("CURRENCY");
const CRYPTOCURRENCY = config("CRYPTOCURRENCY");
let body = {};

const liCurrency =  <nav><ul className={css.ul}>
                        {CURRENCY.map((elem, index)=>{
                            return <li key={index} onClick={()=>{setFocusCurr([index, FocusCurr[1]]);setNavSal(false);setNavBuy(false);}}><img className={css.icon} src={elem.icon} alt={elem.nameEN} /><div>{elem.nameEN}<br/><span className={css.iso}>{elem.iso}</span></div></li>
                        })}    
                    </ul></nav>
const liCrypto =  <nav><ul className={css.ul}>
                        {CRYPTOCURRENCY.map((elem, index)=>{
                            return <li key={index} onClick={()=>{setFocusCrypto([index, FocusCrypto[1]]);setNavSal(false);setNavBuy(false)}}  ><img className={css.icon} src={elem.icon} alt={elem.nameEN} /><div>{elem.nameEN}<br/><span className={css.iso}>{elem.iso}</span></div></li>
                        })}    
                    </ul></nav>

// useRef
const navBuyRef = useRef(null);
//useClickOutside(navBuyRef, ()=>{setNavBuy(false)});
const navSalRef = useRef(null);
//useClickOutside(navSalRef, ()=>{setNavSal(false)});
const iBuyRef = useRef(null); 
const iSaleRef = useRef(null);
// useState ======================================================================================================================
let [buyCategory, setBuyCategory] = useState(CURRENCY);
let [saleCategory, setSaleCategory] = useState(CRYPTOCURRENCY);
let [navBuy, setNavBuy]=useState(false);
let [navSal, setNavSal]=useState(false);
let [liBuyList, setLiBuyList] = useState(liCrypto)
let [liSaleList, setLiSaleList] = useState(liCurrency)
let [FocusCurr, setFocusCurr] = useState([0,0]);
let [FocusCrypto, setFocusCrypto] = useState([0,1]);
let [buyCurrency, setBuyCurrency]= useState(CURRENCY[FocusCurr[0]]);
let [saleCurrency, setSaleCurrency] = useState(CRYPTOCURRENCY[FocusCrypto[0]]);
let [price, setPrice] = useState(0);
let [inputSale, setInputSale] = useState(1);
let [inputBuy, setInputBuy] = useState(0);
let [coinSecond, setCoinSecond] = useState(0);

//API ========================================================================================================================

//const ====================================================================================
const urlApi = new URL( "https://exempl.com" ); //  "https://staging.baltbit.com/crypto-fusion/api/v1/public/real-time/how-much"        );
const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};




  // Fetch Post ===============================================================================

function APIFetchPost(Crypt="BTC", Curr="USD") {
    console.log( "Запрос цены " + Crypt + " / " + Curr);
    body = {
        "payload": {
            "direction": "source",
            "source": {
            "currency": Curr
            },
            "target": {
            "amount": "1.00",
            "currency": Crypt
            }
        }
    };


    RequestAPI();
    function RequestAPI(){
    fetch(urlApi, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    }
    ).then(response => response.json())
    .then((data) => { setPrice(data.data.source.amount) })
    .catch(error => {setPrice('No connection! Please wait!');})
    }
}



let coin = 0;
function UpdateTimer(time){

let timer =()=>{setTimeout(()=>{
    if ( coin<20) {coin+=1; setCoinSecond(coin);} else { APIFetchPost(); coin=0; setCoinSecond(0);}
    }, time)};
clearTimeout(timer);
timer();
return coin
}



// useEffect(()=>{


// console.log(UpdateTimer(1000))
// if (ActivCategory == "Buy") { 
//     let priceAPi =   APIFetchPost(buyCurrency.iso, saleCurrency.iso )
//     setInputBuy(priceAPi)}
// }



// if (ActivCategory == "Sell") {APIFetchPost( saleCurrency.iso, buyCurrency.iso); setInputBuy(inputSale/price)}
// },[saleCurrency,buyCurrency,inputSale, ActivCategory]);


// useEffect ====================================================================================================================
useEffect(() => {  
    setPrice(price);
}, [price, saleCurrency, buyCurrency]);


useEffect(() => {  
    document.activeElement == iBuyRef.current ? setInputSale(inputBuy/price) :setInputBuy(inputSale*price);
}, [inputBuy, inputSale]);

useEffect(()=>{
setActivCategory(ActivCategory);
if (ActivCategory=="Buy") { setBuyCategory(CRYPTOCURRENCY); setSaleCategory(CURRENCY); setLiBuyList(liCrypto); setLiSaleList(liCurrency); setBuyCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); setSaleCurrency(CURRENCY[FocusCurr[0]]);  } 
if (ActivCategory=="Sell") {setBuyCategory(CURRENCY); setSaleCategory(CRYPTOCURRENCY); setLiBuyList(liCurrency); setLiSaleList(liCrypto); setBuyCurrency(CURRENCY[FocusCurr[0]]); setSaleCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); }
if (ActivCategory=="Swap") {setBuyCategory(CRYPTOCURRENCY); setSaleCategory(CRYPTOCURRENCY); setLiBuyList(liCrypto); setLiSaleList(liCrypto); setBuyCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); setSaleCurrency(CRYPTOCURRENCY[FocusCrypto[1]]); }
},[ActivCategory, ActivCategory, FocusCurr, FocusCrypto]);

// Function

function exchangeCurr(){
if (ActivCategory=="Buy"){setActivCategory("Sell")};
if (ActivCategory=="Sell") {setActivCategory("Buy")};
if (ActivCategory=="Swap") { setFocusCrypto([FocusCrypto[1],FocusCrypto[0]])};
}

function buyNav(){

return navBuy ? css.buyNav: css.nav_hide
}



// RETURN ========================================================================================================================
return(
<>
<Loader type="bubble-scale" bgColor="#fff" color="#fff" size={100} /> 





<div className= {css.BuySellSwap}>
    {allButton}
</div>
<div className= {css.component}>
        <div className={css.input}>
        <form>
            <input ref={iSaleRef}
                    name="inputSale"
                    type="number"
                    value={inputSale}
                    onChange={(e) => {
                        e.preventDefault()
                        setInputSale(e.target.value)
                        }}
            > 
            </input> 
        </form>
        <div className={css.select} onClick={()=>setNavSal(!navSal)}>
                <img className={css.select_icon} src={saleCurrency.icon} alt={saleCurrency.nameEN} />
                <div className={css.select_iso}>{saleCurrency.iso}</div> <div className={css.galka}>&or;</div>
            </div>
        </div>
{/* 
        <div className={css.icon_exchange} onClick={exchangeCurr}   ><img className={css.img_icon_exchange} src="./currency-exchange.png" alt="Exchange" /></div>
     */}

        <div className={css.input}>
        <form>
            <input  ref={iBuyRef} maxLength={8}
                    name="inputSale"
                    type="number"
                    value={inputBuy}
                    onChange={(e) => {
                        e.preventDefault()
                        setInputBuy(e.target.value)
                        }}
            > 
            </input> 
        </form>
        <div className={css.select} onClick={()=>setNavBuy(!navBuy)}> 
            <img className={css.select_icon} src={buyCurrency.icon} alt={buyCurrency.nameEN} /> 
            <div className={css.select_iso}> {buyCurrency.iso}</div><div className={css.galka}>&or;</div>
        </div>
    </div>


<div className={`${navBuy ? css.buyNav: css.nav_hide} ${DarkTheme? darkTheme.theme: lightTheme.theme}`} ref={navBuyRef}>
    <div className={css.headerSelect} onClick={()=>setNavBuy(!navBuy)}>&#10006;</div>
    {liBuyList}
</div>



<div className={`${navSal ? css.selNav: css.nav_hide} ${DarkTheme? darkTheme.theme: lightTheme.theme}`} ref={navBuyRef}> 
<div className={css.headerSelect} onClick={()=>setNavSal(!navSal)}>&#10006;</div>
    {liSaleList} 
</div>
    
    <div className={css.message}>You get  {inputBuy} {buyCurrency.nameEN} for {inputSale} {saleCurrency.nameEN} <div className={css.galka}>&or;</div> </div>
</div>

</>
)}