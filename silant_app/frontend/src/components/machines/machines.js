import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom'
import {  getDataMasine, getReferenceBooksMasine, getReferenceBooksComplaint, searchMasine,
    getReferenceBooksTechnicalMaintenance } from '../PostService';
import { TableMachine } from '../Table/TableMachine';
import { TableComplaint } from '../Table/TableComplaint';
import { TableTechnicalMaintenance } from '../Table/TableTechnicalMaintenance';

import { NavigationMachine } from '../Navigation/Navigation';

import  style  from "./style.module.scss"


export function Masine({user, userGroup}) {
        console.log(user)
        const [complaintData, setComplaintData] = useState([])       
        const [machineData, setMachineData] = useState([])       
        const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
        const [referenceBooksMasine, setReferenceBooksMasine] = useState({})
        const [referenceBooksComplaint, setReferenceBooksComplaint] = useState({})
        const [referenceBooksTechnicalMaintenance, setReferenceBooksTechnicalMaintenance] = useState({})

        const refInput = useRef(null)


        useEffect(()=>{        
                if(user.id) {
                    getDataMasine(user.id, userGroup).then(result => {
                    setComplaintData(result.complaint_data)
                    setMachineData(result.machine_data)
                    setTechnicalMaintenanceData(result.technical_maintenance_data)
                })} else { setMachineData([])}
                
            },[user])

            useEffect(()=>{
                getReferenceBooksMasine().then(result => {setReferenceBooksMasine(result)})
                getReferenceBooksComplaint().then(result => {setReferenceBooksComplaint(result)})
                getReferenceBooksTechnicalMaintenance().then(result => {setReferenceBooksTechnicalMaintenance(result)
                })
            },[])


            
            function addCrateMachineToHTML() {
                if (userGroup === "Manager") {return <Link to="/create_mashine/">Добавить машину</Link>}
            }

            function Search() {
                console.log(refInput.current.value)
                if (refInput.current.value) {
                    searchMasine(refInput.current.value).then(result => {
                        setMachineData(result.machine_data)
                
                })
                }
                
                


  
            }

            const handleSubmit = (event) => {
                    event.preventDefault();
                };

            return (
                    <div className={style.machine__container}>
                        {   user? ( <>  
                                        <span className={style.text__result_search}>Добро пожаловать: {user.username}</span>
                                        <span className={style.text__result_search}>Информация о комплектации и технических зарактеристиках Вашей техники</span>
                                        <NavigationMachine />
                                        { addCrateMachineToHTML() }
                                    </>                               
                                
                        ):( <>
                                <span className={style.main__text}>Проверьте комплектацию и технические характеристики техники Силант</span>
                                <div className={style.container__input_button}>
                                    <form onSubmit={handleSubmit}> 
                                        <input className={style.input} ref={refInput} type="text" required/>
                                        <button className={style.button}  onClick={Search}>Поиск машин</button>
                                    </form>
                                </div>
                            </>
                        )
                        }                       
                        

                        
                        <Routes>
                            <Route path="/" element={<TableMachine dataMachine={machineData} referenceBooks={referenceBooksMasine} user={user}/>}></Route>
                            <Route path="/technical_maintenance" element={<TableTechnicalMaintenance technicalMaintenanceData={technicalMaintenanceData} referenceBooks={referenceBooksTechnicalMaintenance}/>}></Route>
                            <Route path="/complaint" element={<TableComplaint complaintData={complaintData} referenceBooks={referenceBooksComplaint}/>}></Route>
                        </Routes>
                            

                    </div>)

                        



}

