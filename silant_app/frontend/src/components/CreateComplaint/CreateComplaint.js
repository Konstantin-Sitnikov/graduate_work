import axios from 'axios';
import { useRef, useEffect, useState } from "react";
import { getExtendedData } from '../PostService';



function create() {

    // Сначала получаем CSRF токен (он устанавливается при GET запросе)
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.post('http://localhost:8000/api/create_complaint/', {
                username: "fbvdsfbv",
                password: "sdfvbzdsfv",
            }, {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .then(data => { 

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










export function CreateComplaint () {
    const [failureNode, setFailureNode] = useState([])
    const [recoveryMethod, setRecoveryMethod] = useState([])

    useEffect(()=>{
        getExtendedData().then(result => {
            setFailureNode(result.failure_node)
            setRecoveryMethod(result.recovery_method)
        }
            
        )
    },[])

    console.log(failureNode, recoveryMethod)


    const refDateFailure = useRef(null)
    const refOperatingTime = useRef(null)
    const refFailureNode = useRef(null)
    const refDescriptionFailure = useRef(null)
    const refRecoveryMethod = useRef(null)
    const refUsedParts = useRef(null)
    const refDateRestoration = useRef(null)
    const refDowntime = useRef(null)
    const refMachine = useRef(null)
    const refServiceCompany = useRef(null)


    function send() {
        console.log(refFailureNode.current.value)
    }


    return (
            <>
                <div>
                    <input ref={refDateFailure} type='date'/>
                    <input ref={refOperatingTime} type='text'/>
                    <select ref={refFailureNode}>
                        {
                           failureNode.map((item) => {
                            return <option value={item.id}>{item.name}</option>
                           }) 
                        }
                    </select>
                    <select ref={refRecoveryMethod}>
                        {
                           recoveryMethod.map((item) => {
                            return <option value={item.id}>{item.name}</option>
                           }) 
                        }

                    </select>

                    <button onClick={send}>Создать</button>
                </div>


            </>

    )

}