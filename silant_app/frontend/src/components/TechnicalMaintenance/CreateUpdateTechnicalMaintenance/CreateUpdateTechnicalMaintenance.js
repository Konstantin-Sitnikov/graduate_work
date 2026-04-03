import { useRef, useEffect, useState } from "react";
import { getReferenceBooksTechnicalMaintenance, getDataTechnicalMaintenanceDetail, createUpdate } from '../../PostService';
import { getLocalStorage } from '../../AuxiliaryFunctions/LocalStorage';
import { getDataReferenceBooks } from '../../AuxiliaryFunctions/AuxiliaryFunctions';
import { GoBackButton } from '../../Button/Button'
import { Link, } from 'react-router-dom'
import  style  from "./style.module.scss"



export function CreateUpdateTechnicalMaintenance ({type, updateDateMachine}) { 
    let value = getLocalStorage('number_machine_to_detail')
    
    const [typeTechnicalMaintenance, setTypeTechnicalMaintenance] = useState([])
    const [serviceCompany, setServiceCompany] = useState([])
    const [serviceMessage, setServiceMessage] = useState("")

    const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])

   

    useEffect(()=>{
        getReferenceBooksTechnicalMaintenance().then(result => {
            setTypeTechnicalMaintenance(result.type_technical_maintenance)
            setServiceCompany(result.service_company)
        })
        
    },[])

    useEffect(()=>{
            if(type === "update") {
            getDataTechnicalMaintenanceDetail(getLocalStorage('number_technical_maintenance_detail')).then(result => {
                setTechnicalMaintenanceData(result.technical_maintenance)
                updateForm(result.technical_maintenance)
            })}
    
    },[type])

    
    const refTypeTechnicalMaintenance = useRef(null)
    const refDateMaintenance = useRef(null)
    const refOperatingTime = useRef(null)

    const refOrderNumber = useRef(null)
    const refDateOrderNumber = useRef(null)
    const refServiceCompany = useRef(null)

    function updateForm(technical_maintenance){

        refTypeTechnicalMaintenance.current.value = technical_maintenance.type_technical_maintenance
        refDateMaintenance.current.value = technical_maintenance.date_maintenance
        refOperatingTime.current.value = technical_maintenance.operating_time
        refOrderNumber.current.value = technical_maintenance.order_number
        refDateOrderNumber.current.value = technical_maintenance.date_order_number
        refServiceCompany.current.value = technical_maintenance.service_company
    }
    
    function clearForm(){

        refTypeTechnicalMaintenance.current.value = ""
        refDateMaintenance.current.value = ""
        refOperatingTime.current.value = "" 
        refOrderNumber.current.value = ""
        refDateOrderNumber.current.value = ""
        refServiceCompany.current.value = ""

    }

    function send() {
        let dataValid = false

        const dataTechnicalMaintenance = {
            "id": technicalMaintenanceData.id,
            "type_technical_maintenance": refTypeTechnicalMaintenance.current.value,
            "date_maintenance": refDateMaintenance.current.value,
            "operating_time": refOperatingTime.current.value,            
            "order_number": refOrderNumber.current.value,
            "date_order_number": refDateOrderNumber.current.value,
            "machine": value,
            "service_company": refServiceCompany.current.value,
            "type_post": type
        }

    const requiredData = {

            "type_technical_maintenance": refTypeTechnicalMaintenance.current.value,
            "date_maintenance": refDateMaintenance.current.value,
            "operating_time": refOperatingTime.current.value,            
            "order_number": refOrderNumber.current.value,
            "date_order_number": refDateOrderNumber.current.value,
            "machine": value,
            "service_company": refServiceCompany.current.value,
            "type_post": type

        }
            
        for (const  value of Object.values(requiredData)) {

                    if(value){
                        dataValid = true
                    }else{
                        dataValid = false
                        break
                    }}
        if (dataValid) {
                    createUpdate("create_technical_maintenance", dataTechnicalMaintenance).then(data => {
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

    return (
            <>  
                <div className={style.createUpdate__container_body}>
                <GoBackButton />
                <form className={style.createUpdate__form} onSubmit={handleSubmit}> 

                    <span className={style.text__servicemessage}>{serviceMessage}</span>
                    
                    
                    <span className={style.text__TypeTechnicalMaintenance}>Тип технического обслуживания</span>
                    <select className={style.select__TypeTechnicalMaintenance} ref={refTypeTechnicalMaintenance}>
                        {typeTechnicalMaintenance.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>


               
                    <span className={style.text__DateMaintenance}>Дата проведения ТО</span>
                    <input className={style.input__DateMaintenance} ref={refDateMaintenance} type='datetime-local' required/>
               


                    <span className={style.text__OperatingTime}>Наработка м/ч</span>
                    <input className={style.input__OperatingTime} ref={refOperatingTime} type='number' required/>



                    <span className={style.text__OrderNumber}>№ Наряд-заказа</span>
                    <input className={style.input__OrderNumber} ref={refOrderNumber} type='text' required/>
                    


                    <span className={style.text__DateOrderNumber}>№ Наряд-заказа</span>
                    <input className={style.input__DateOrderNumber} ref={refDateOrderNumber} type='datetime-local' required/>
                   
                    <span className={style.text__SerialNumber}>Серийный номер машины</span>
                    <span className={style.text__SerialNumberValue}>{`${value}`}</span>
                    

                    <span className={style.text__ServiceCompany}>Сервисная компания</span>
                    <select className={style.select__ServiceCompany} ref={refServiceCompany}>
                        {serviceCompany.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>

                    <button className={style.button} onClick={send}>Создать</button>
                </form>
            </div>

            </>

    )

}


export const TechnicalMaintenanceDetail = ({referenceBooksTechnicalMaintenance}) => {

    let value = getLocalStorage('number_technical_maintenance_detail')    

    const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
   

    useEffect(()=>{
        getDataTechnicalMaintenanceDetail(value).then(result => {
            setTechnicalMaintenanceData(result.technical_maintenance)            
        })
    },[])

   
    return (

            <div>
                <GoBackButton />
                <Link to="/update_technical_maintenance/">Редактировать</Link>

                <span className={style.text__result_search}>{`Вид ТО: ${getDataReferenceBooks(technicalMaintenanceData.type_technical_maintenance, referenceBooksTechnicalMaintenance.type_technical_maintenance)}`}</span>
                <span className={style.text__result_search}>{`Дата проведения ТО: ${technicalMaintenanceData.date_maintenance}`}</span>
                <span className={style.text__result_search}>{`Наработка, м/час: ${technicalMaintenanceData.operating_time}`}</span>
                <span className={style.text__result_search}>{`№ заказ-наряда: ${technicalMaintenanceData.order_number}`}</span>
                <span className={style.text__result_search}>{`Дата заказ-наряда: ${technicalMaintenanceData.date_order_number}`}</span>
                <span className={style.text__result_search}>{`Заводской № Машины: ${technicalMaintenanceData.machine}`}</span>
                <span className={style.text__result_search}>{`Сервисная компания: ${getDataReferenceBooks(technicalMaintenanceData.service_company, referenceBooksTechnicalMaintenance.service_company)}`}</span>
            </div>


    )
    

}







