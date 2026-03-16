import axios from 'axios';
import { useRef, useEffect, useState } from "react";
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { getDataCreateMashine, getExtendedData, getDataMasineDetail, getDataTest } from '../PostService';
import { Table } from '../table/table';

import  style  from "./style.module.scss"


function getLocalStorage() {
    return JSON.parse(localStorage.getItem('number_machine_to_detail'))
}



export function Masine({userId}) {

        const [complaintData, setComplaintData] = useState([])
        const [complaintFields, setComplaintFields] = useState([])

        const [machineData, setMachineData] = useState([])
        const [machineFields, setMachineFields] = useState([])

        const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
        const [technicalMaintenanceFields, setTechnicalMaintenanceFields] = useState([])

        useEffect(()=>{
        
                if(userId) {
                    getDataTest(userId).then(result => {
                    setComplaintData(result.complaint_data)
                    setComplaintFields(result.complaint_fields)
                    setMachineData(result.machine_data)
                    setMachineFields(result.machine_fields)
                    setTechnicalMaintenanceData(result.technical_maintenance_data)
                    setTechnicalMaintenanceFields(result.technical_maintenance_fields)
                })
                }
                
            },[userId])
        


            return  <div>
                        <nav> 
                            <NavLink to="/">Машины</NavLink>
                            <NavLink to="/technical_maintenance">ТО</NavLink>
                            <NavLink to="/complaint">Рекламации</NavLink>
                        </nav>


                        <span className={style.text__result_search}>Информация о комплектации и технических зарактеристиках Вашей техники</span>

                        <Routes>
                            <Route path="/" element={<Table dataTable={machineData} tableFieldsHeaders={machineFields}/>}></Route>
                            <Route path="/technical_maintenance" element={<Table dataTable={technicalMaintenanceData} tableFieldsHeaders={technicalMaintenanceFields}/>}></Route>
                            <Route path="/complaint" element={<Table dataTable={complaintData} tableFieldsHeaders={complaintFields}/>}></Route>
                        </Routes>
                    </div>

}





export const MachineDetail = () => {

    let value = getLocalStorage()
    console.log(value)

    const [complaintData, setComplaintData] = useState([])
    const [complaintFields, setComplaintFields] = useState([])

    const [machineData, setMachineData] = useState([])
    const [machineFields, setMachineFields] = useState([])

    const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
    const [technicalMaintenanceFields, setTechnicalMaintenanceFields] = useState([])


    useEffect(()=>{
        getDataMasineDetail(value).then(result => {
            setComplaintData(result.complaint_data)
            setComplaintFields(result.complaint_fields)
            const mashine = result.machine_data
            setMachineData(mashine[0])
            setMachineFields(result.machine_fields)
            setTechnicalMaintenanceData(result.technical_maintenance_data)
            setTechnicalMaintenanceFields(result.technical_maintenance_fields)
        })
    },[])

    let mashineModel = machineData.model_technic
    console.log(complaintData)
    console.log(technicalMaintenanceData)

    return (

            <div>
                        <nav> 
                            <NavLink to="/">Машины</NavLink>
                            <NavLink to="/detail/">ТО</NavLink>
                            <NavLink to="/detail/complaint">Рекламации</NavLink>
                        </nav>

                        <span className={style.text__result_search}>{`Машина: }`}</span>
                        <span className={style.text__result_search}>{`Cерийный номер: `}</span>
                        
                        <Routes>                         
                            <Route path="/" element={<Table dataTable={technicalMaintenanceData} tableFieldsHeaders={technicalMaintenanceFields}/>}></Route>
                            <Route path="/complaint" element={<Table dataTable={complaintData} tableFieldsHeaders={complaintFields}/>}></Route>
                        </Routes>
    
                        
                    </div>


    )
    

}


















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
            console.log(data.status)
            alert("Машина создана")
        })
        .catch(error => {

            if (error.response.status === 400) {
                console.log("Машина с таким номером уже есть");
                alert("Машина с таким номером уже есть")
            }
        });
}


export function CreateMashine ({userId}) {
    
    const [modelTechnic, setModelTechnic] = useState([])
    const [modelEngine, setModelEngine] = useState([])
    
    const [modelTransmission, setModelTransmission] = useState([])

    const [modelDrivingBridge, setModelDrivingBridge] = useState([])

    const [modelControlledBridge, setModelControlledBridge] = useState([])

    const [client, setClient] = useState([])

    const [serviceCompany, setServiceCompany] = useState([])

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
            "service_company": refServiceCompany.current.value
        }

        console.log(dataMachine.number_controlled_bridge)

        for (const  value of Object.values(dataMachine)) {
            if(value){
               dataValid = true
            
            } else{
                dataValid = false
                break
            }}


        if (dataValid) {
            create(dataMachine)
        }}

        const handleSubmit = (event) => {
            event.preventDefault();
        };


    return (
            <>  
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
                                {
                                modelTechnic.map((item) => {


                                    return <option value={item.id}>{item.model}</option>
                                }) 
                                }
                            </select>
                        </div>

                    </div>
                    
                    
                    
                    <div className={style.container__row}>
                        <span className={style.row__header}>Введите данные двигателя:</span>
                        <div className={style.container__column}>
                            <label htmlFor="modelEngine">Выберете модель двигателя</label>
                            <select id="modelEngine" ref={refModelEngine}>
                                {
                                modelEngine.map((item) => {

                                    return <option value={item.id}>{item.model}</option>
                                }) 
                                }
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
                                {
                                modelTransmission.map((item) => {
                                    return <option value={item.id}>{item.model}</option>
                                }) 
                                }
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
                                {
                                modelDrivingBridge.map((item) => {
                                    return <option value={item.id}>{item.model}</option>
                                }) 
                                }
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
                                {
                                modelControlledBridge.map((item) => {
                                    return <option value={item.id}>{item.model}</option>
                                }) 
                                }
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
                                {
                                client.map((item) => {
                                    console.log(item)
                                return <option value={item.id}>{item.username}</option>
                                }) 
                                }
                            </select>
                        </div> 
                        
                        <div className={style.container__column}>
                            <label htmlFor="ServiceCompany">Сервисная компания</label>
                            <select id="ServiceCompany" ref={refServiceCompany}>
                                {
                                serviceCompany.map((item) => {

                                    return <option value={item.id}>{item.name}</option>
                                }) 
                                }
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