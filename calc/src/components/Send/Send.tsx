import css  from './styles.module.css'
import Veil from '../Veil/Veil';
import {useState} from 'react';


export default function Send(){
let [veilLoader, setVeilLoader] = useState(false); // Закрыть калькулятор завесой с лоадером
return(
<div className= {css.component}>
    { veilLoader?<Veil/>:<></> }
    <div onClick={()=>{setVeilLoader(true)}} className={css.button}><div className='button_attribute'></div><div className='button_attribute'>Continue</div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>
    <div className={css.polic}>By continuing, you agree to our <a href="http://#" target="_blank" rel="noopener noreferrer">cookie policy.</a></div>
</div>
)}