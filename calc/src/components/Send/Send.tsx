import css  from './styles.module.css'


export default function Send(){

return(
<div className= {css.component}>
    < div className={css.button}><div className='button_attribute'></div><div className='button_attribute'>Continue</div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>
    <div className={css.polic}>By continuing, you agree to our <a href="http://#" target="_blank" rel="noopener noreferrer">cookie policy.</a></div>
</div>
)}