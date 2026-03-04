import axios from 'axios';
import { useRef, useEffect, } from "react";
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
    const refText = useRef(null)


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
        })
        .catch(error => {

            if (error.response.status === 400) {
                console.log("Неправильный логин или пароль");
            }
            if (error.response.status === 409) {
                console.log("Вы уже авторизованы");
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
        <button onClick={()=>{setShowModal(false)}}>Закрыть</button>
        <input ref={refName} type='text' placeholder='Введите имя'></input>
        <input ref={refPassword} type='text' placeholder='Введите пароль'></input>
        <button onClick={onLogin}>Отправить</button>
        <button onClick={logOut}>Выйти</button>
        <span ref={refText}> </span>
    </div>
)

}







/*
export const updateSession = async (setUser, setAuthenticated) => {
    try {
        const response = await axios.get('http://localhost:8000/_allauth/browser/v1/auth/session', {
            headers: {
                "accept": "application/json",
                'Content-Type': "application/json",
            },
            withCredentials: true
        });
        
        
        if (response.data.data && response.data.data.user) {

            setUser(response.data.data.user.username)
            setAuthenticated(true)

        }
    } catch (error) {
        console.error("Не авторизован:", error.response || error);

    }
};

*/








