import { useRef, useEffect, useState } from "react";
import { getReferenceBooksTechnicalMaintenance, getDataTechnicalMaintenanceDetail, createUpdate } from '../PostService';
import { getLocalStorage } from '../AuxiliaryFunctions/LocalStorage';
import { getDataReferenceBooks } from '../AuxiliaryFunctions/AuxiliaryFunctions';
import { GoBackButton } from '../Button/Button'
import { Link, } from 'react-router-dom'
import  style  from "./style.module.scss"



export function CreateUpdateTechnicalMaintenance ({type}) { 
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

                <form onSubmit={handleSubmit}> 
                    <GoBackButton />
                    <span>{serviceMessage}</span>
                    
                    <label htmlFor="TypeTechnicalMaintenance">Тип технического обслуживания</label>
                    <select id="TypeTechnicalMaintenance" ref={refTypeTechnicalMaintenance}>
                        {typeTechnicalMaintenance.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>


                    <label htmlFor="DateMaintenance">Дата проведения ТО</label>
                    <input id="DateMaintenance" ref={refDateMaintenance} type='datetime-local' required/>
               

                    <label htmlFor="OperatingTime">Наработка м/ч</label>
                    <input id="OperatingTime" ref={refOperatingTime} type='number' required/>


                    <label htmlFor="OrderNumber">№ Наряд-заказа</label>
                    <input id="OrderNumber" ref={refOrderNumber} type='text' required/>
                    

                    <label htmlFor="DateOrderNumber">Дата заказ-наряда</label>
                    <input id="DateOrderNumber" ref={refDateOrderNumber} type='datetime-local' required/>
                   
                                       
                    <label htmlFor="Machine">Серийный номер</label>
                    <span>{`${value}`}</span>
                    

                    <label htmlFor="ServiceCompany">Сервисная компания</label>
                    <select id="ServiceCompany" ref={refServiceCompany}>
                        {serviceCompany.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>

                    <button onClick={send}>Создать</button>
                </form>


            </>

    )

}


export const TechnicalMaintenanceDetail = () => {

    let value = getLocalStorage('number_technical_maintenance_detail')    

    const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
    const [referenceBooksTechnicalMaintenance, setReferenceBooksTechnicalMaintenance] = useState({})  

    useEffect(()=>{
        getDataTechnicalMaintenanceDetail(value).then(result => {
            setTechnicalMaintenanceData(result.technical_maintenance)            
        })
    },[])

    useEffect(()=>{
        getReferenceBooksTechnicalMaintenance().then(result => {setReferenceBooksTechnicalMaintenance(result)})
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







