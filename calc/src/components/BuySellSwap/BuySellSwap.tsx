import { JsxElement } from 'typescript';
import css  from './styles.module.css';
import { useState, useEffect } from 'react';


export default function BuySellSwap(){

const category:string[] = ["Buy", "Sell", "Swap"];
const [activCategory, setActivCategory] = useState(0);



const BuyButton = <div className={activCategory == 0 ? css.button_activ: css.button} onClick={()=>{setActivCategory(0)}}>Buy</div>;
const SellButton = <div className={activCategory == 1 ? css.button_activ: css.button} onClick={()=>{setActivCategory(1)}}>Sell</div>;
const SwapButton = <div className={activCategory == 2 ? css.button_activ: css.button} onClick={()=>{setActivCategory(2)}}>Swap</div>;
const allButton = [BuyButton, SellButton, SwapButton] 

return(
<div className= {css.component}>
    {allButton}
</div>
)}