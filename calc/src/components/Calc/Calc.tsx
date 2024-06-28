import css  from './styles.module.css'
import CalcHeader from '../Header/Header';
import BuySellSwap from '../BuySellSwap/BuySellSwap';
import Send from '../Send/Send';
import Form from '../Form/Form';

export default function Calc(){

return(
<div className= {css.calc}>
    <CalcHeader/>
    <BuySellSwap/>
    <Form/>
    <Send/>
</div>
)}