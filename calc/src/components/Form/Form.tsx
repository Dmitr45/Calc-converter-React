import css  from './styles.module.css'


export default function Form(){

return(
<div className= {css.component}>
<div className={css.input}><input type='text'></input><div className={css.select}>USD</div></div>
<div className={css.input}><input type='text'></input><div className={css.select}>BTC</div></div>
<div className={css.input}>You get 00000 for $0000</div>
</div>
)}