import  style  from "./style.module.scss"
import { useEffect, useState } from "react";
import {  getDataMasine, getReferenceBooksMasine, getReferenceBooksComplaint, 
    getReferenceBooksTechnicalMaintenance } from '../PostService';
import { Routes, Route} from 'react-router-dom'
import { Masine } from "../machines/machines";
import { CreateUpdateMachine } from "../machines/CreateUpdateMaсhine/CreateUpdateMachine";
import { MachineDetail } from "../machines/MachineDetail/MachineDetail";
import { ComplaintDetail, CreateUpdateComplaint } from "../Complaint/Complaint";
import { TechnicalMaintenanceDetail, CreateUpdateTechnicalMaintenance } from "../TechnicalMaintenance/TechnicalMaintenance";
import { TechnicalNodeDetail } from "../TechnicalNodeDetail/TechnicalNodeDetail";


const Main = ({user, userGroup}) =>  {
        const [complaintData, setComplaintData] = useState([])       
        const [machineData, setMachineData] = useState([])
        const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
        const [referenceBooksMasine, setReferenceBooksMasine] = useState({})
        const [referenceBooksComplaint, setReferenceBooksComplaint] = useState({})
        const [referenceBooksTechnicalMaintenance, setReferenceBooksTechnicalMaintenance] = useState({})


        useEffect(()=>{     
  
                updateDateMachine()
                
            },[user])

        function updateDateMachine() {
            if(user.id) {
                getDataMasine(user.id, userGroup).then((result) => {
                    setMachineData(result.machine_data)
                    setComplaintData(result.complaint_data)
                    setTechnicalMaintenanceData(result.technical_maintenance_data)                    
                })
                } else { 
                setMachineData([])
                setComplaintData([])
                setTechnicalMaintenanceData([])}
        }




            useEffect(()=>{
                getReferenceBooksMasine().then(result => {setReferenceBooksMasine(result)})
                getReferenceBooksComplaint().then(result => {setReferenceBooksComplaint(result)})
                getReferenceBooksTechnicalMaintenance().then(result => {setReferenceBooksTechnicalMaintenance(result)
                })
            },[])


    return (
        <main className={style.main}>
     
            
                <Routes>
                        machineData, complaintData, technicalMaintenanceData, referenceBooksMasine, referenceBooksComplaint, referenceBooksTechnicalMaintenance, setMachineData, user, userGroup
                    <Route path="/*" element={<Masine machineData={machineData} 
                                                      complaintData={complaintData} 
                                                      technicalMaintenanceData={technicalMaintenanceData} 
                                                      referenceBooksMasine={referenceBooksMasine}
                                                      referenceBooksComplaint={referenceBooksComplaint}
                                                      referenceBooksTechnicalMaintenance={referenceBooksTechnicalMaintenance}
                                                      setMachineData={setMachineData}
                                                      user={user} userGroup={userGroup}/>}></Route>

                    <Route path="/detail/*" element={<MachineDetail referenceBooksMasine={referenceBooksMasine}
                                                                    referenceBooksComplaint={referenceBooksComplaint}
                                                                    referenceBooksTechnicalMaintenance={referenceBooksTechnicalMaintenance}  
                                                                    userGroup={userGroup}/>}></Route>

                    <Route path="/detail_node/" element={<TechnicalNodeDetail/>}></Route>

                    <Route path="/create_mashine/*" element={<CreateUpdateMachine type={"create"} updateDateMachine={updateDateMachine}/>}></Route>
                    <Route path="/update_mashine/*" element={<CreateUpdateMachine type={"update"}/>}></Route>
                    
                    <Route path="/detail_complaint/*" element={<ComplaintDetail referenceBooksComplaint={referenceBooksComplaint}/>}></Route>
                    <Route path="/create_complaint/*" element={<CreateUpdateComplaint type={"create"}/>}></Route>
                    <Route path="/update_complaint/*" element={<CreateUpdateComplaint type={"update"}/>}></Route>

                    <Route path="/detail_technical_maintenance/*" element={<TechnicalMaintenanceDetail referenceBooksTechnicalMaintenance={referenceBooksTechnicalMaintenance}/>}></Route>
                    <Route path="/create_technical_maintenance/*" element={<CreateUpdateTechnicalMaintenance type={"create"}/>}></Route>
                    <Route path="/update_technical_maintenance/*" element={<CreateUpdateTechnicalMaintenance type={"update"}/>}></Route>
                </Routes>
         
        </main>
    );
    }


export default Main