import { useRef, useEffect, useState } from "react";
import { getReferenceBooksComplaint, getDataComplaintDetail, createUpdate } from '../PostService';
import { getLocalStorage } from '../AuxiliaryFunctions/LocalStorage';
import { getDataReferenceBooks } from '../AuxiliaryFunctions/AuxiliaryFunctions';
import { GoBackButton } from '../Button/Button'
import { Link, } from 'react-router-dom'
import  style  from "./style.module.scss"



export function CreateUpdateComplaint ({type, updateDateMachine}) { 
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
                        updateDateMachine()
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

        function Button(type) {
            if (type === "create") {return "Создать"}
            if (type === "update") {return "Редактировать"}
        }


    return (
            <>  
                <div className={style.createUpdate__container_body}>
                <GoBackButton />
                <form className={style.createUpdate__form} onSubmit={handleSubmit}> 
            
                    <span className={style.text__servicemessage}>{serviceMessage}</span>

    
                    <span className={style.text__DateFailure}>Дата отказа</span>
                    <input className={style.input__DateFailure} ref={refDateFailure} type='datetime-local' required/>

                    <span className={style.text__OperatingTime}>Наработка м/ч</span>
                    <input className={style.input__OperatingTime} ref={refOperatingTime} type='number' required/>


                    <span className={style.text__FailureNode}>Узел отказа</span>
                    <select className={style.select__FailureNode} ref={refFailureNode}>
                        {failureNode.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>

  
                    <span className={style.text__DescriptionFailure}>Описание отказа</span>
                    <textarea className={style.bigText__DescriptionFailure} ref={refDescriptionFailure}  required></textarea>


                    <span className={style.text__RecoveryMethod}>Метод восстановления</span>
                    <select className={style.select__RecoveryMethod} ref={refRecoveryMethod}>
                        {recoveryMethod.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>


                    <span className={style.text__UsedParts}>Используемые запчасти</span>
                    <textarea className={style.bigText__UsedParts} ref={refUsedParts}></textarea>
                    

                    <span className={style.text__DateRestoration}>Дата восстановления</span>
                    <input className={style.input__DateRestoration} ref={refDateRestoration} type='datetime-local'/>

                                       
                    <span className={style.text__SerialNumber}>Серийный номер машины</span>
                    <span className={style.text__SerialNumberValue}>{`${value}`}</span>
                    

                    <span className={style.text__ServiceCompany}>Сервисная компания</span>
                    <select className={style.select__ServiceCompany} ref={refServiceCompany}>
                        {serviceCompany.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>

                    <button className={style.button} onClick={send}>{Button(type)}</button>

                </form>
                </div>


            </>

    )

}