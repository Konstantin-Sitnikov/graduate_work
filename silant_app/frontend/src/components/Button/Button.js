import axios from 'axios';
import {useNavigate } from 'react-router-dom'
import  style  from "./style.module.scss"


export function GoBackButton() {
    const navigate = useNavigate();
    return <button className={style.goBackButton} onClick={() => navigate(-1)}>Назад</button>;
}


