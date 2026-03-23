import axios from 'axios';
import { useRef, useEffect, useState } from "react";
import { Routes, Route, Link, } from 'react-router-dom'
import { getDataCreateMashine, getDataMasineDetail, getDataMasine, getReferenceBooksMasine, getReferenceBooksComplaint, getReferenceBooksTechnicalMaintenance } from '../PostService';
import { TableMachine } from '../Table/TableMachine/TableMachine';
import { TableComplaint } from '../Table/TableComplaint/TableComplaint';
import { TableTechnicalMaintenance } from '../Table/TableTechnicalMaintenance/TableTechnicalMaintenance';
import { getLocalStorage } from '../AuxiliaryFunctions/LocalStorage';
import { getDataReferenceBooks } from '../AuxiliaryFunctions/AuxiliaryFunctions';
import { NavigationMachine, NavigationMachineDetail } from '../Navigation/Navigation';
import  style  from "./style.module.scss"





export function Masine({userId}) {

        const [complaintData, setComplaintData] = useState([])       
        const [machineData, setMachineData] = useState([])       
        const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
        const [referenceBooksMasine, setReferenceBooksMasine] = useState({})
        const [referenceBooksComplaint, setReferenceBooksComplaint] = useState({})
        const [referenceBooksTechnicalMaintenance, setReferenceBooksTechnicalMaintenance] = useState({})
        

        useEffect(()=>{
        
                if(userId) {
                    getDataMasine(userId).then(result => {
                    setComplaintData(result.complaint_data)
                    setMachineData(result.machine_data)
                    setTechnicalMaintenanceData(result.technical_maintenance_data)
                })
                }
                
            },[userId])
        

            useEffect(()=>{
                getReferenceBooksMasine().then(result => {setReferenceBooksMasine(result)})
                getReferenceBooksComplaint().then(result => {setReferenceBooksComplaint(result)})
                getReferenceBooksTechnicalMaintenance().then(result => {setReferenceBooksTechnicalMaintenance(result)
                })
            },[])

           


            return <div>

                        <NavigationMachine />

                        <span className={style.text__result_search}>Информация о комплектации и технических зарактеристиках Вашей техники</span>
                        <div className={style.container__table}>
                            <Routes>
                                <Route path="/" element={<TableMachine dataMachine={machineData} referenceBooks={referenceBooksMasine}/>}></Route>
                                <Route path="/technical_maintenance" element={<TableTechnicalMaintenance technicalMaintenanceData={technicalMaintenanceData} referenceBooks={referenceBooksTechnicalMaintenance}/>}></Route>
                                <Route path="/complaint" element={<TableComplaint complaintData={complaintData} referenceBooks={referenceBooksComplaint}/>}></Route>
                            </Routes>
                        </div>
                        

                    </div>

}





export const MachineDetail = () => {

    let value = getLocalStorage('number_machine_to_detail')

    const [complaintData, setComplaintData] = useState([])
    const [machineData, setMachineData] = useState({})
    const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
    const [referenceBooksMasine, setReferenceBooksMasine] = useState({})
    const [referenceBooksComplaint, setReferenceBooksComplaint] = useState({})
    const [referenceBooksTechnicalMaintenance, setReferenceBooksTechnicalMaintenance] = useState({})

    useEffect(()=>{
        getDataMasineDetail(value).then(result => {
            setComplaintData(result.complaint_data)
            const mashine = result.machine_data
            setMachineData(mashine[0])
            setTechnicalMaintenanceData(result.technical_maintenance_data)

        })
    },[])

    useEffect(()=>{
        getReferenceBooksMasine().then(result => {setReferenceBooksMasine(result)})
        getReferenceBooksComplaint().then(result => {setReferenceBooksComplaint(result)})
        getReferenceBooksTechnicalMaintenance().then(result => {setReferenceBooksTechnicalMaintenance(result)
        })
    },[])

    return (

            <div>
                <NavigationMachineDetail/>

                <span className={style.text__result_search}>{`Машина: ${getDataReferenceBooks(machineData.model_technic, referenceBooksMasine.model_technic) }`}</span>
                <span className={style.text__result_search}>{`Cерийный номер: ${machineData.number_machine}`}</span>
                <Link to="/update_mashine/">Редактировать</Link>
                <div className={style.container__table}>
                    <Routes>                         
                        <Route path="/" element={<TableTechnicalMaintenance technicalMaintenanceData={technicalMaintenanceData} referenceBooks={referenceBooksTechnicalMaintenance}/>}></Route>
                        <Route path="/complaint" element={<TableComplaint complaintData={complaintData} referenceBooks={referenceBooksComplaint}/>}></Route>
                        
                    </Routes>
                </div>
            </div>


    )
    

}


export function CreateUpdateMaсhine ({type}) {
    
    const [modelTechnic, setModelTechnic] = useState([])
    const [modelEngine, setModelEngine] = useState([])
    const [modelTransmission, setModelTransmission] = useState([])
    const [modelDrivingBridge, setModelDrivingBridge] = useState([])
    const [modelControlledBridge, setModelControlledBridge] = useState([])
    const [client, setClient] = useState([])
    const [serviceCompany, setServiceCompany] = useState([])
    const [serviceMessage, setServiceMessage] = useState("")
    const [machineData, setMachineData] = useState({})

    useEffect(()=>{
            getDataCreateMashine().then(result => {
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
            setMachineData(mashine[0])
            console.log(mashine[0])
            updateForm(mashine[0])
        })}

    },[type])




function create(data) {
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.post('http://localhost:8000/api/create_machine/', data, {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .then(data => {
            alert(data.data.message)
            if(type === "create") {
                clearForm()
            }
            
            setServiceMessage("")
        })
        .catch(error => {
            if (error.response.status === 400) {setServiceMessage(error.response.data.message)}
            if (error.response.status === 501) {setServiceMessage(error.response.data.message)}
        });
}

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
            create(dataMachine)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
            <>  
                <Link to="/">Выйти</Link>
                <span>{serviceMessage}</span>
                <form className={style.form} onSubmit={handleSubmit}> 
                    <div className={style.container__row}> 
                        <span className={style.row__header}>Введите данные машины:</span>
                        <div className={style.container__column}>
                            <span>Введите серийный номер автомобиля</span>
                            <input ref={refNumberMachine} type='text' required/>
                        </div>
                    
                        <div className={style.container__column}>
                            <label htmlFor="modelTechnic">Выберете модель техники</label>
                            <select id="modelTechnic" ref={refModelTechnic}>
                                {modelTechnic.map((item,) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                            </select>
                        </div>

                    </div>
                    
                    <div className={style.container__row}>
                        <span className={style.row__header}>Введите данные двигателя:</span>
                        <div className={style.container__column}>
                            <label htmlFor="modelEngine">Выберете модель двигателя</label>
                            <select id="modelEngine" ref={refModelEngine}>
                                {modelEngine.map((item) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                            </select>
                        </div>
                        

                        <div className={style.container__column}>
                            <label htmlFor="NumberEngine">Зав. № двигателя</label>
                            <input id="NumberEngine" ref={refNumberEngine} type='text' required/>
                        </div>  
                     </div>

                    <div className={style.container__row}>
                        <span className={style.row__header}>Введите данные трансмиссии:</span>
                        <div className={style.container__column}> 
                            <label htmlFor="ModelTransmission">Выберете модель трансмиссии</label>
                            <select id="ModelTransmission" ref={refModelTransmission}>
                                {modelTransmission.map((item) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                            </select>
                        </div>                   

                        <div className={style.container__column}>
                            <label htmlFor="NumberTransmission">Зав. № трансмиссии</label>
                            <input id="NumberTransmission" ref={refNumberTransmission} type='text' required/>
                        </div>
                    </div>
                    
                    <div className={style.container__row}>
                        <span className={style.row__header}>Введите данные ведущего моста:</span>
                        <div className={style.container__column}>
                            <label htmlFor="ModelDrivingBridge">Выберете модель ведущего моста</label>
                            <select id="ModelDrivingBridge" ref={refModelDrivingBridge}>
                                {modelDrivingBridge.map((item) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                            </select>
                        </div>
                        

                        <div className={style.container__column}>
                            <label htmlFor="NumberDrivingBridge">Зав. № ведущего моста</label>
                            <input id="NumberDrivingBridge" ref={refNumberDrivingBridge} type='text' required/>
                        </div>                        
                    </div>
                    

                    <div className={style.container__row}>
                        <span className={style.row__header}>Введите данные управляемого моста:</span>
                        <div className={style.container__column}>
                            <label htmlFor="ModelControlledBridge">Выберете модель управляемого моста</label>
                            <select id="ModelControlledBridge" ref={refModelControlledBridge}>
                                {modelControlledBridge.map((item) => {return <option value={item.id} key={item.id}>{item.model}</option>})}
                            </select>
                        </div>
                        

                        <div className={style.container__column}>
                            <label htmlFor="NumberControlledBridge">Зав. № управляемого моста</label>
                            <input id="NumberControlledBridge" ref={refNumberControlledBridge} type='text' required/>
                        </div>
                            
                    </div>
                                          
                    <div className={style.container__row}>
                        <span className={style.row__header}>Введите данные договора:</span>
                        <div className={style.container__column}>
                            <label htmlFor="DeliveryAgreement">Договор поставки №, дата'</label>
                            <input id="DeliveryAgreement" ref={refDeliveryAgreement} type='text'required/>  
                        </div>
                        
                        <div className={style.container__column}>
                            <label htmlFor="DateShipment">Дата отгрузки с завода</label>
                            <input id="DateShipment" ref={refDateShipment} type='date' required/>
                        </div>
                    </div>

                    
                    

                    <div className={style.container__row}>
                        <span className={style.row__header}>Введите данные пользователя:</span>
                        <div className={style.container__column}>
                            <label htmlFor="EndUser">Конечный потребитель'</label>
                            <input id="EndUser" ref={refEndUser} type='text' required/>
                        </div>
                        

                        <div className={style.container__column}>
                            <label htmlFor="DeliveryAddress">Адрес поставки'</label>
                            <input id="DeliveryAddress" ref={refDeliveryAddress} type='text' required/>
                        </div>
                    </div>
                    
                    

                    <div className={style.container__row}>
                        <label htmlFor="Equipment">Дополнительная комплектация</label>
                        <textarea ref={refEquipment} id="Equipment"></textarea>
                    </div>
                    

                    
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
                    

                    <button onClick={send}>Создать</button>
                </form>
                


            </>

    )

}


/*



*/