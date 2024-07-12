import css from './styles.module.css';
import Loader from "react-js-loader";

export default function Veil(){



return(
<div className={css.veil}>
    <Loader type="bubble-scale" bgColor="#fff" color="#fff" size={100}  title={"Uploading data! Please wait!"} /> 
</div>
)};