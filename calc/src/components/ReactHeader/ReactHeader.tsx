import logo from './logo.svg';
import styles from './Logo.module.css';
import './rotate.css';


export default function ReactHeader(){

return(
<div className={styles.AppHeader}>
    <div> React-SCSS </div>
    <div className='App-logo'>
        <img src={logo} className={styles.AppLogo}  alt="logo" />
    </div>    
</div>
)}