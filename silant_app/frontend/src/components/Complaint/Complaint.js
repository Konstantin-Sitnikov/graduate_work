import { useRef, useEffect, useState } from "react";
import { getReferenceBooksComplaint, getDataComplaintDetail, createUpdate } from '../PostService';
import { getLocalStorage } from '../AuxiliaryFunctions/LocalStorage';
import { getDataReferenceBooks } from '../AuxiliaryFunctions/AuxiliaryFunctions';
import { GoBackButton } from '../Button/Button'
import { Link, } from 'react-router-dom'
import  style  from "./style.module.scss"



export function CreateUpdateComplaint ({type}) { 
    let value = getLocalStorage('number_machine_to_detail')
    
    const [failureNode, setFailureNode] = useState([])
    const [recoveryMethod, setRecoveryMethod] = useState([])
    const [serviceCompany, setServiceCompany] = useState([])
    const [serviceMessage, setServiceMessage] = useState("")

    const [complaintData, setComplaintData] = useState([])

   

    useEffect(()=>{
        getReferenceBooksComplaint().then(result => {
            setFailureNode(result.failure_node)
            setRecoveryMethod(result.recovery_method)
            setServiceCompany(result.service_company)
        })
        
    },[])

    useEffect(()=>{
            if(type === "update") {
            getDataComplaintDetail(getLocalStorage('number_complaint_detail')).then(result => {
                setComplaintData(result.complaint_data)
                updateForm(result.complaint_data)
            })}
    
    },[type])

    
    const refDateFailure = useRef(null)
    const refOperatingTime = useRef(null)
    const refFailureNode = useRef(null)
    const refDescriptionFailure = useRef(null)
    const refRecoveryMethod = useRef(null)
    const refUsedParts = useRef(null)
    const refDateRestoration = useRef(null)
    const refServiceCompany = useRef(null)

    function updateForm(complaint){

        refDateFailure.current.value = complaint.date_failure
        refOperatingTime.current.value = complaint.operating_time
        refFailureNode.current.value = complaint.failure_node
        refDescriptionFailure.current.value = complaint.description_failure
        refRecoveryMethod.current.value = complaint.recovery_method
        refUsedParts.current.value = complaint.used_parts
        refDateRestoration.current.value = complaint.date_restoration               
        refServiceCompany.current.value = complaint.service_company

    }
    function clearForm(){

            refDateFailure.current.value = ""
            refOperatingTime.current.value = ""
            refFailureNode.current.value = "" 
            refDescriptionFailure.current.value = ""
            refRecoveryMethod.current.value = ""
            refUsedParts.current.value = ""
            refDateRestoration.current.value = ""
            refServiceCompany.current.value = ""
           
        }


    function send() {
        let dataValid = false

        const dataComplaint = {
            "id": complaintData.id,
            "date_failure": refDateFailure.current.value,
            "operating_time": refOperatingTime.current.value,
            "failure_node": refFailureNode.current.value,
            "description_failure": refDescriptionFailure.current.value,
            "recovery_method": refRecoveryMethod.current.value,
            "used_parts": refUsedParts.current.value,
            "date_restoration": refDateRestoration.current.value,
            "machine": value,
            "service_company": refServiceCompany.current.value,
            "type_post": type
        }

    const requiredData = {
            "date_failure": refDateFailure.current.value,
            "operating_time": refOperatingTime.current.value,
            "failure_node": refFailureNode.current.value,
            "description_failure": refDescriptionFailure.current.value,
            "recovery_method": refRecoveryMethod.current.value,
            "machine": value,
            "service_company": refServiceCompany.current.value,
        }
            
        for (const  value of Object.values(requiredData)) {

                    if(value){
                        dataValid = true
                    }else{
                        dataValid = false
                        break
                    }}
        if (dataValid) {
                    console.log(dataValid)
                    createUpdate("create_complaint", dataComplaint).then(data => {
                        alert(data.data.message)
                        if(type === "create") {clearForm()}
                        setServiceMessage("")
                    })
                .catch(error => {
                    if (error.response.status === 400) {setServiceMessage(error.response.data.message)}
                    if (error.response.status === 501) {setServiceMessage(error.response.data.message)}
                });
                }
            }
        
    const handleSubmit = (event) => {
            event.preventDefault();


        };

        function Header(type) {
            if (type === "create") {return "Создать"}
            if (type === "update") {return "Редактировать"}
        }

        function Button(type) {
            if (type === "create") {return "Создать"}
            if (type === "update") {return "Редактировать"}
        }


    return (
            <>  

                <form onSubmit={handleSubmit}> 
                    <GoBackButton />
                    <span>{Header(type)}</span>                   

                    <span>{serviceMessage}</span>

                    <div> 
                        <span>Дата отказа</span>
                        <input ref={refDateFailure} type='datetime-local' required/>
                    </div> 

                    <label htmlFor="OperatingTime">Наработка м/ч</label>
                    <input id="OperatingTime" ref={refOperatingTime} type='number' required/>


                    <label htmlFor="FailureNode">Узел отказа</label>
                    <select id="FailureNode" ref={refFailureNode}>
                        {failureNode.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>
                    <label htmlFor="DescriptionFailure">Описание отказа</label>
                    <textarea ref={refDescriptionFailure} id="DescriptionFailure" required></textarea>


                    <label htmlFor="RecoveryMethod">Метод восстановления</label>
                    <select id="RecoveryMethod" ref={refRecoveryMethod}>
                        {recoveryMethod.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>

                    <label htmlFor="UsedParts">Используемые запчасти</label>
                    <textarea ref={refUsedParts} id="UsedParts"></textarea>
                    

                    <label htmlFor="DateRestoration">Дата восстановления</label>
                    <input id="DateRestoration" ref={refDateRestoration} type='datetime-local'/>

                                       
                    <label htmlFor="Machine">Серийный номер</label>
                    <span>{`${value}`}</span>
                    

                    <label htmlFor="ServiceCompany">Сервисная компания</label>
                    <select id="ServiceCompany" ref={refServiceCompany}>
                        {serviceCompany.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>

                    <button onClick={send}>{Button(type)}</button>
                </form>


            </>

    )

}


export const ComplaintDetail = () => {

    let value = getLocalStorage('number_complaint_detail')

    const [complaintData, setComplaintData] = useState([])

    const [referenceBooksComplaint, setReferenceBooksComplaint] = useState({})
  

    useEffect(()=>{
        getDataComplaintDetail(value).then(result => {
            setComplaintData(result.complaint_data)            
        })
    },[])

    useEffect(()=>{
        getReferenceBooksComplaint().then(result => {setReferenceBooksComplaint(result)})
    },[])
    return (

            <div>
                <GoBackButton />
                <Link to="/update_complaint/">Редактировать</Link>
                <span className={style.text__result_search}>{`Номер заявки: ${complaintData.id}`}</span>
                <span className={style.text__result_search}>{`Заводской № Машины: ${complaintData.machine}`}</span>
                <span className={style.text__result_search}>{`Дата отказа: ${complaintData.date_failure}`}</span>
                <span className={style.text__result_search}>{`Наработка, м/час: ${complaintData.operating_time}`}</span>
                <span className={style.text__result_search}>{`Узел отказа: ${getDataReferenceBooks(complaintData.failure_node, referenceBooksComplaint.failure_node)}`}</span>
                <span className={style.text__result_search}>{`Описание отказа: ${complaintData.description_failure}`}</span>
                <span className={style.text__result_search}>{`Способ восстановления: ${getDataReferenceBooks(complaintData.recovery_method, referenceBooksComplaint.recovery_method)}`}</span>
                <span className={style.text__result_search}>{`Используемые запчасти: ${complaintData.used_parts}`}</span>
                <span className={style.text__result_search}>{`Дата восстановления: ${complaintData.date_restoration}`}</span>
                <span className={style.text__result_search}>{`Время простоя техники: ${complaintData.downtime}`}</span>
                <span className={style.text__result_search}>{`Сервисная компания: ${getDataReferenceBooks(complaintData.service_company, referenceBooksComplaint.service_company)}`}</span>
            </div>


    )
    

}







