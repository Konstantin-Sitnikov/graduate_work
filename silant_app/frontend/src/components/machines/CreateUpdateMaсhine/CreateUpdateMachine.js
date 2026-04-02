import { useRef, useEffect, useState } from "react";
import { getDataMasineDetail,  getReferenceBooksMasine, createUpdate } from '../../PostService';
import { useLocation} from 'react-router-dom'
import { getLocalStorage } from '../../AuxiliaryFunctions/LocalStorage';
import { GoBackButton } from '../../Button/Button';
import  style  from "./style.module.scss"



export function CreateUpdateMachine ({type, updateDateMachine}) {
    
    const [modelTechnic, setModelTechnic] = useState([])
    const [modelEngine, setModelEngine] = useState([])
    const [modelTransmission, setModelTransmission] = useState([])
    const [modelDrivingBridge, setModelDrivingBridge] = useState([])
    const [modelControlledBridge, setModelControlledBridge] = useState([])
    const [client, setClient] = useState([])
    const [serviceCompany, setServiceCompany] = useState([])
    const [serviceMessage, setServiceMessage] = useState("")


    const [pathName, setPathName] = useState("")

    const location = useLocation()
    useEffect(()=> {
        setPathName(location.pathname)
    },[location])





    useEffect(()=>{
            getReferenceBooksMasine().then(result => {
                setModelTechnic(result.model_technic)
                setModelEngine(result.model_engine)
                setModelTransmission(result.model_transmission)
                setModelDrivingBridge(result.model_driving_bridge)
                setModelControlledBridge(result.model_controlled_bridge)
                setClient(result.client)
                setServiceCompany(result.service_company)
            })   
        },[])

    const refNumberMachine = useRef(null)
    const refModelTechnic = useRef(null)
    const refModelEngine = useRef(null)
    const refNumberEngine = useRef(null)
    const refModelTransmission = useRef(null)
    const refNumberTransmission = useRef(null)
    const refModelDrivingBridge = useRef(null)
    const refNumberDrivingBridge = useRef(null)
    const refModelControlledBridge = useRef(null)
    const refNumberControlledBridge = useRef(null)
    const refDeliveryAgreement = useRef(null)
    const refDateShipment = useRef(null)
    const refEndUser = useRef(null)
    const refDeliveryAddress = useRef(null)
    const refEquipment = useRef(null)
    const refClient = useRef(null)
    const refServiceCompany = useRef(null)

   
    useEffect(()=>{
        if(type === "update") {
        getDataMasineDetail(getLocalStorage('number_machine_to_detail')).then(result => {
            const mashine = result.machine_data
            updateForm(mashine[0])
        })}

    },[type])



    function updateForm(machine){

        refNumberMachine.current.value = machine.number_machine
        refModelTechnic.current.value = machine.model_technic
        refModelEngine.current.value = machine.model_engine
        refNumberEngine.current.value = machine.number_engine
        refModelTransmission.current.value = machine.model_transmission
        refNumberTransmission.current.value = machine.number_transmission
        refModelDrivingBridge.current.value = machine.model_driving_bridge
        refNumberDrivingBridge.current.value = machine.number_driving_bridge
        refModelControlledBridge.current.value = machine.model_controlled_bridge
        refNumberControlledBridge.current.value = machine.number_controlled_bridge
        refDeliveryAgreement.current.value = machine.delivery_agreement
        refDateShipment.current.value = machine.date_shipment
        refEndUser.current.value = machine.end_user
        refDeliveryAddress.current.value = machine.delivery_address
        refEquipment.current.value = machine.Equipment
        refClient.current.value = machine.client
        refServiceCompany.current.value = machine.service_company
    }

        

    function clearForm(){

        refNumberMachine.current.value = ""
        refNumberEngine.current.value = ""
        refNumberTransmission.current.value = "" 
        refNumberDrivingBridge.current.value = ""
        refNumberControlledBridge.current.value = ""
        refDeliveryAgreement.current.value = ""
        refDateShipment.current.value = ""
        refEndUser.current.value = ""
        refDeliveryAddress.current.value = ""
        refEquipment.current.value = ""
    }
    

    

    function send() {
        let dataValid = false
        
        const dataMachine = {
            "number_machine": refNumberMachine.current.value,
            "model_technic": refModelTechnic.current.value,
            "model_engine": refModelEngine.current.value,
            "number_engine": refNumberEngine.current.value,
            "model_transmission": refModelTransmission.current.value,
            "number_transmission": refNumberTransmission.current.value,
            "model_driving_bridge": refModelDrivingBridge.current.value,
            "number_driving_bridge":refNumberDrivingBridge.current.value,
            "model_controlled_bridge": refModelControlledBridge.current.value,
            "number_controlled_bridge": refNumberControlledBridge.current.value,

            "delivery_agreement": refDeliveryAgreement.current.value,
            "date_shipment": refDateShipment.current.value,
            "end_user": refEndUser.current.value,
            "delivery_address": refDeliveryAddress.current.value,
            "Equipment": refEquipment.current.value,
            "client": refClient.current.value,
            "service_company": refServiceCompany.current.value,
            "type_post": type,
        }

        for (const  value of Object.values(dataMachine)) {
            if(value){
                dataValid = true
            }else{
                dataValid = false
                break
            }}


        if (dataValid) {
            console.log(dataValid)
            createUpdate("create_machine", dataMachine).then(data => {
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

    console.log(pathName)

    function addToHTMLButtonCreateOrUpdate () {
        if (pathName === "/create_mashine/") {return "Создать"}
        if (pathName === "/update_mashine/") {return "Редактировать"}
    }

    return (
         <div className={style.createUpdate__container_body}> 
                <GoBackButton />
                
                <form className={style.createUpdate__form} onSubmit={handleSubmit}>
                    <span className={style.text__servicemessage}>{serviceMessage}</span>
                    <span className={style.text__machine_data}>Введите данные машины:</span>
                    
                    <span className={style.text__machine_model}>Выберете модель техники:</span>
                    <select className={style.select__machine_model} id="modelTechnic" ref={refModelTechnic}>
                        {modelTechnic.map((item,) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                    </select>
                    <input className={style.input__machine_number} ref={refNumberMachine} type='text' required placeholder="Серийный номер автомобиля"/>
                    
                    
                    <span className={style.text__engine_model}>Выберете модель двигателя:</span>
                    <select className={style.select__engine_model} ref={refModelEngine}>
                                {modelEngine.map((item) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                    </select>
                    <input className={style.input__engine_number} ref={refNumberEngine} type='text' required placeholder="Серийный номер двигателя"/>



                    <span className={style.text__transmission_model}>Выберете модель трансмиссии:</span>
                    <select className={style.select__transmission_model} ref={refModelTransmission}>
                        {modelTransmission.map((item) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                    </select>
                    <input className={style.input__transmission_number} ref={refNumberTransmission} type='text' required placeholder="Серийный номер трансмиссии"/>


                    
                    <span className={style.text__drivingbridge_model}> Выберете модель ведущего моста:</span>
                    <select  className={style.select__drivingbridge_model} ref={refModelDrivingBridge}>
                        {modelDrivingBridge.map((item) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                    </select>
                    <input className={style.input__drivingbridge_number} ref={refNumberDrivingBridge} type='text' required placeholder="Серийный номер ведущего моста"/>



                    
                    <span className={style.text__controlledbridge_model}> Выберете модель управляемого моста:</span>
                    <select className={style.select__controlledbridge_model} ref={refModelControlledBridge}>
                        {modelControlledBridge.map((item) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                    </select>
                    <input className={style.input__controlledbridge_number} ref={refNumberControlledBridge} type='text' required placeholder="Серийный номер управляемого моста"/>



  
                    <span className={style.text__deliveryagreement_model}>Договор поставки №, дата:</span>
                    <input className={style.input__deliveryagreement_number} ref={refDeliveryAgreement} type='text'required/>  


                   
                    <span className={style.text__dateshipment_model}>Дата отгрузки с завода:</span>
                    <input className={style.input__dateshipment_number} ref={refDateShipment} type='date' required/>
                    


                    <span className={style.text__enduser}>Конечный пользователь:</span>
                    <input className={style.input__enduser} ref={refEndUser} type='text' required/>


                    <span className={style.text__deliveryaddress}>Адрес поставки:</span>
                    <input className={style.input__deliveryaddress} ref={refDeliveryAddress} type='text' required/>

                    <span className={style.text__equipment}>Дополнительная комплектация:</span>
                    <textarea ref={refEquipment} className={style.input__equipment}></textarea>
                    



                    <span className={style.text__client}>Клиент:</span>
                    <select className={style.select__client} ref={refClient}>
                        {client.map((item) => {return <option value={item.id} key={item.id}>{item.username}</option>})}
                    </select>



                    <span className={style.text__servicecompany}>Сервисная компания:</span>
                    <select className={style.select__servicecompany} ref={refServiceCompany}>
                        {serviceCompany.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                    </select>
                    <button className={style.button} onClick={send}>{addToHTMLButtonCreateOrUpdate()}</button>
                </form>
                

                </div>


    )

}


/*
<div className={style.createUpdate__container_row}>
                                                                
                    <div className={style.container__row}>

                        <div className={style.container__column}>
                            <label htmlFor="Client">Клиент</label>
                            <select id="Client" ref={refClient}>
                                {client.map((item) => {return <option value={item.id} key={item.id}>{item.username}</option>})}
                            </select>
                        </div> 
                        
                        <div className={style.container__column}>
                            <label htmlFor="ServiceCompany">Сервисная компания</label>
                            <select id="ServiceCompany" ref={refServiceCompany}>
                                {serviceCompany.map((item) => {return <option value={item.id} key={item.id}>{item.name}</option>})}
                            </select>
                        </div>

                    </div>


*/