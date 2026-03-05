import axios from 'axios';
import { useRef, useEffect, useState } from "react";
import { getData, getExtendedData } from '../PostService';
import  style  from "./style.module.scss"


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










export function CreateComplaint ({userId}) {
    
    const [failureNode, setFailureNode] = useState([])
    const [recoveryMethod, setRecoveryMethod] = useState([])
    const [serviceCompany, setServiceCompany] = useState([])


    const [dataTable, setDataTable] = useState([])
   

    useEffect(() => {
        if (userId) {
            getData(userId).then(result => {
                setDataTable(result.data)

            })
        }}, [userId])
    

    useEffect(()=>{
        getExtendedData().then(result => {
            setFailureNode(result.failure_node)
            setRecoveryMethod(result.recovery_method)
            setServiceCompany(result.service_company)
        })
        
    },[])

    console.log(dataTable)



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
                    <label htmlFor="DateFailure">Дата отказа</label>
                    <input id="DateFailure" ref={refDateFailure} type='date'/>

                    <label htmlFor="OperatingTime">Наработка м/ч</label>
                    <input id="OperatingTime" ref={refOperatingTime} type='text'/>


                    <label htmlFor="FailureNode">Узел отказа</label>
                    <select id="FailureNode" ref={refFailureNode}>
                        {
                           failureNode.map((item) => {
                            return <option value={item.id}>{item.name}</option>
                           }) 
                        }
                    </select>
                    <label htmlFor="DescriptionFailure">Описание отказа</label>
                    <textarea ref={refDescriptionFailure} id="DescriptionFailure"></textarea>


                    <label htmlFor="RecoveryMethod">Метод восстановления</label>
                    <select id="RecoveryMethod" ref={refRecoveryMethod}>
                        {
                           recoveryMethod.map((item) => {
                            return <option value={item.id}>{item.name}</option>
                           }) 
                        }
                    </select>

                    <label htmlFor="UsedParts">Используемые запчасти</label>
                    <textarea ref={refUsedParts} id="UsedParts"></textarea>
                    

                    <label htmlFor="DateRestoration">Дата восстановления</label>
                    <input id="DateRestoration" ref={refDateRestoration} type='date'/>

                    <label htmlFor="Downtime">Время простоя техники</label>
                    <input id="Downtime" ref={refDowntime} type='text'/>
                    

                    <label htmlFor="Machine">Машина</label>
                    <select id="Machine" ref={refMachine}>
                        {
                           dataTable.map((item) => {

                            return <option value={item.number_machine}>{item.number_machine}</option>
                           }) 
                        }
                    </select>

                    <label htmlFor="ServiceCompany">Сервисная компания</label>
                    <select id="ServiceCompany" ref={refServiceCompany}>
                        {
                           serviceCompany.map((item) => {

                            return <option value={item.id}>{item.name}</option>
                           }) 
                        }
                    </select>

                    <button onClick={send}>Создать</button>
                </div>


            </>

    )

}