import axios from 'axios';
import { useRef, useEffect, useState} from "react";
import { createPortal } from 'react-dom';
import  style  from "./style.module.scss"


export function Modal({children}) {
    const elRef = useRef(null);
    
    
    if (!elRef.current) {
        elRef.current = document.createElement("div");

      }

   useEffect(() => {
        const modalRoot = document.getElementById("authn");
        console.log(modalRoot)
        modalRoot.appendChild(elRef.current);
    
        return () => modalRoot.removeChild(elRef.current);
        }, []);


    return createPortal(<div className={style.modal_container}>{children}</div>, elRef.current);
}


export function AuthN({setShowModal, updateSession}) {
    const refName = useRef(null)
    const refPassword = useRef(null)
      const [serviceMessage, setServiceMessage] = useState("")



 function onLogin() {
    logOut()
    // Сначала получаем CSRF токен (он устанавливается при GET запросе)
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.post('http://localhost:8000/_allauth/browser/v1/auth/login', {
                username: refName.current.value,
                password: refPassword.current.value,
            }, {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .then(data => { 
            updateSession()
            setServiceMessage("")
            setShowModal(false)
        })
        .catch(error => {

            if (error.response.status === 400) {
                setServiceMessage("Неправильный логин или пароль")
               }
        });
}


function logOut() {
    // Сначала получаем CSRF токен (он устанавливается при GET запросе)
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.delete('http://localhost:8000/_allauth/browser/v1/auth/session', {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .catch(() => {
           updateSession()
        });
}

return (
    <div className={style.authn_container}>
        <button className={style.authn_button_close} onClick={()=>{setShowModal(false)}}> <div className={style.auth__container_line}><div className={style.button_close__line_1}></div><div className={style.button_close__line_2}></div></div> </button>
        <input ref={refName} type='text' placeholder='Введите имя'></input>
        <input ref={refPassword} type='password' placeholder='Введите пароль'></input>
        <div className={style.authn_container__button_login_logout}>
            <button onClick={onLogin}>Авторизоватся</button>
            <button onClick={logOut}>Выйти</button>
        </div>        
        <span className={style.authn_serviceMessage}>{`${serviceMessage}`}</span>
        <span>Для регистрации свяжитесь с нами: +7-8352-20-12-09. Telegram</span>
    </div>
)
}






