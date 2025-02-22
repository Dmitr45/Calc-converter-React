import css  from './styles.module.css';
import config from '../../config/config';
import { useEffect, useState, useRef } from 'react';
import lightTheme from '../../config/light-theme.module.css';
import darkTheme from '../../config/dark-theme.module.css';
import Veil from '../Veil/Veil';



export default function Form(props){
// useRef
const navBuyRef = useRef(null);
//useClickOutside(navBuyRef, ()=>{setNavBuy(false)});
const navSalRef = useRef(null);
//useClickOutside(navSalRef, ()=>{setNavSal(false)});
const iBuyRef = useRef(null); 
const iSaleRef = useRef(null);

const CURRENCY= config("CURRENCY");
const CRYPTOCURRENCY = config("CRYPTOCURRENCY");
let body = {};


// Const Let =========================================================================================================================


const liCurrency =  <nav><ul className={css.ul}>
                        {CURRENCY.map((elem, index)=>{
                            return <li key={index} onClick={()=>{setFocusCurr([index, FocusCurr[1]]);setNavSal(false);setNavBuy(false); setPrice(0) }}><img className={css.icon} src={elem.icon} alt={elem.nameEN} /><div>{elem.nameEN}<br/><span className={css.iso}>{elem.iso}</span></div></li>
                        })}    
                    </ul></nav>
const liCrypto =  <nav><ul className={css.ul}>
                        {CRYPTOCURRENCY.map((elem, index)=>{
                            return <li key={index} onClick={()=>{setFocusCrypto([index, FocusCrypto[1]]);setNavSal(false);setNavBuy(false); setPrice(0) }}  ><img className={css.icon} src={elem.icon} alt={elem.nameEN} /><div>{elem.nameEN}<br/><span className={css.iso}>{elem.iso}</span></div></li>
                        })}    
                    </ul></nav>



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
let [price, setPrice] = useState(2);
let [inputSale, setInputSale] = useState(1);
let [inputBuy, setInputBuy] = useState(0);
let [coinSecond, setCoinSecond] = useState(0);
let [veilLoader, setVeilLoader] = useState(false); // Закрыть калькулятор завесой с лоадером
let [priceAPI, setPriceAPI] = useState(0); 




// // Const API ====================================================================================
// useEffect(()=>{
// ping();
// function ping() {
// const urlApi = new URL(
//     "https://staging.baltbit.com/crypto-fusion/api/v1/public/real-time/how-much"
// );
// const headers = {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
// };

// let bodyAPI = {
//     "payload": {
//         "direction": "source",
//         "source": {
//             "currency": buyCurrency.iso
//         },
//         "target": {
//         "amount": "1.00",
//             "currency": saleCurrency.iso
//         }
//     }
// };

// console.log(buyCurrency.iso + "   " + saleCurrency.iso);

// // Connect API =====================================================================================

//                 fetch(urlApi, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify(bodyAPI),
//                 }).then(response => response.json())
//                 .then((data) => { data.data.source.amount? setPriceAPI(data.data.source.amount) : setPriceAPI(0) })
//                 .catch(err => {
//                     console.log(err); 
//                 });

//                 console.log("Новое значение priceAPI: " + priceAPI);    

// }

// },[price, saleCurrency, buyCurrency]);



//=================================================================================================================








//Props==========================================================================================================================
let DarkTheme= props.DarkTheme;

//BuySellSwap ===================================================================================================================
const [ActivCategory, setActivCategory] = useState("Buy");
useEffect(()=>{setActivCategory(ActivCategory); setPrice(0);   },[ActivCategory]);

const BuyButton = <div className={ActivCategory == "Buy" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Buy")}}>Buy</div>;
const SellButton = <div className={ActivCategory == "Sell" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Sell")}}>Sell</div>;
const SwapButton = <div className={ActivCategory == "Swap" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Swap")}}>Swap</div>;
const allButton = [BuyButton, SellButton, SwapButton] 


// useEffect ====================================================================================================================

useEffect(() => {  
    price !== 0 ? setVeilLoader(false):  setVeilLoader(false );   // Ставим лоадер если цена 0
    if (price === 0) {setPrice(priceAPI);};
    setInputSale(inputSale);
}, [price, saleCurrency, buyCurrency,inputBuy, inputSale, priceAPI]);



useEffect(() => {  
    document.activeElement == iBuyRef.current ? setInputSale(inputBuy/price) :setInputBuy(inputSale*price);
}, [inputBuy, inputSale, price]);

useEffect(()=>{
setActivCategory(ActivCategory);
if (ActivCategory=="Buy") { setBuyCategory(CRYPTOCURRENCY); setSaleCategory(CURRENCY); setLiBuyList(liCrypto); setLiSaleList(liCurrency); setBuyCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); setSaleCurrency(CURRENCY[FocusCurr[0]]);  } 
if (ActivCategory=="Sell") {setBuyCategory(CURRENCY); setSaleCategory(CRYPTOCURRENCY); setLiBuyList(liCurrency); setLiSaleList(liCrypto); setBuyCurrency(CURRENCY[FocusCurr[0]]); setSaleCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); }
if (ActivCategory=="Swap") {setBuyCategory(CRYPTOCURRENCY); setSaleCategory(CRYPTOCURRENCY); setLiBuyList(liCrypto); setLiSaleList(liCrypto); setBuyCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); setSaleCurrency(CRYPTOCURRENCY[FocusCrypto[1]]); }
},[ActivCategory, ActivCategory, FocusCurr, FocusCrypto]);

// Function =====================================================================================================================

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
    { veilLoader?<Veil/>:<></> }
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