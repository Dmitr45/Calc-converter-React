import css  from './styles.module.css';
import config from '../../config/config';
import { useEffect, useState, useRef } from 'react';
import Require from "../../config/CoinMarket";


export default function Form(props){
//BuySellSwap ===================================================================================================================

const [ActivCategory, setActivCategory] = useState("Buy");

useEffect(()=>{setActivCategory(ActivCategory);   },[ActivCategory]);

const BuyButton = <div className={ActivCategory == "Buy" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Buy")}}>Buy</div>;
const SellButton = <div className={ActivCategory == "Sell" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Sell")}}>Sell</div>;
const SwapButton = <div className={ActivCategory == "Swap" ? css.button_activ: css.button} onClick={()=>{setActivCategory("Swap")}}>Swap</div>;
const allButton = [BuyButton, SellButton, SwapButton] 


// Const =========================================================================================================================

const CURRENCY= config("CURRENCY");
const CRYPTOCURRENCY = config("CRYPTOCURRENCY");

const liCurrency =  <nav><ul className={css.ul}>
                        {CURRENCY.map((elem, index)=>{
                            return <li key={index} onClick={()=>{setFocusCurr([index, FocusCurr[1]])}}><img className={css.icon} src={elem.icon} alt={elem.nameEN} /><br/>{elem.iso}</li>
                        })}    
                    </ul></nav>
const liCrypto =  <nav><ul className={css.ul}>
                        {CRYPTOCURRENCY.map((elem, index)=>{
                            return <li key={index} onClick={()=>{setFocusCrypto([index, FocusCrypto[1]])}}  ><img className={css.icon} src={elem.icon} alt={elem.nameEN} /><br/>{elem.iso}</li>
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
let [inputSale, setInputSale] = useState(1);
let [inputBuy, setInputBuy] = useState(0);
let [price, setPrice] = useState(1.5);
let [liBuyList, setLiBuyList] = useState(liCrypto)
let [liSaleList, setLiSaleList] = useState(liCurrency)
let [FocusCurr, setFocusCurr] = useState([0,0]);
let [FocusCrypto, setFocusCrypto] = useState([0,1]);
let [buyCurrency, setBuyCurrency]= useState(CURRENCY[FocusCurr[0]]);
let [saleCurrency, setSaleCurrency] = useState(CRYPTOCURRENCY[FocusCrypto[0]]);

// useEffect ====================================================================================================================
useEffect(() => {  
    document.activeElement == iBuyRef.current ? setInputSale(inputBuy/price) :setInputBuy(inputSale*price);
}, [inputBuy, inputSale]);

useEffect(()=>{
setActivCategory(ActivCategory);
if (ActivCategory=="Buy") { setBuyCategory(CRYPTOCURRENCY); setSaleCategory(CURRENCY); setLiBuyList(liCrypto); setLiSaleList(liCurrency); setBuyCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); setSaleCurrency(CURRENCY[FocusCurr[0]]); console.log("Buy"); } 
if (ActivCategory=="Sell") {setBuyCategory(CURRENCY); setSaleCategory(CRYPTOCURRENCY); setLiBuyList(liCurrency); setLiSaleList(liCrypto); setBuyCurrency(CURRENCY[FocusCurr[0]]); setSaleCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); console.log("Sell");}
if (ActivCategory=="Swap") {setBuyCategory(CRYPTOCURRENCY); setSaleCategory(CRYPTOCURRENCY); setLiBuyList(liCrypto); setLiSaleList(liCrypto); setBuyCurrency(CRYPTOCURRENCY[FocusCrypto[0]]); setSaleCurrency(CRYPTOCURRENCY[FocusCrypto[1]]); console.log("Swap");}
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
                <div className={css.select_iso}>{saleCurrency.iso}</div> 
            </div>
        </div>

        <div className={css.icon_exchange} onClick={exchangeCurr}   ><img className={css.img_icon_exchange} src="./currency-exchange.png" alt="Exchange" /></div>
    

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
            <div className={css.select_iso}> {buyCurrency.iso}</div>
        </div>
    </div>
    
<div className={buyNav()} ref={navBuyRef}> {liBuyList}</div>
<div className={navSal ? css.selNav: css.nav_hide} ref={navBuyRef}> {liSaleList} </div>
    
    
    
    
    <div className={css.message}>You get  {inputBuy} {buyCurrency.nameEN} for {inputSale} {saleCurrency.nameEN}</div>
</div>
</>
)}