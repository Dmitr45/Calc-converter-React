import { useState } from 'react';
import css  from './styles.module.css'
import lightTheme from '../../config/light-theme.module.css';
import darkTheme from '../../config/dark-theme.module.css';
import CalcHeader from '../Header/Header';
import Send from '../Send/Send';
import Form from '../Form/Form';

export default function Calc(){

let [DarkTheme, setDarkTheme] = useState(true);

return(
<div className={`${css.calc} ${DarkTheme? darkTheme.theme: lightTheme.theme}`}>
    <div className={css.buttonTheme} onClick={()=>{setDarkTheme(!DarkTheme)}}> <img src="./dark-mode.png" alt="Theme" /> </div>
    <CalcHeader/>
    <Form DarkTheme={DarkTheme}/>
    <Send/>
</div>
)}