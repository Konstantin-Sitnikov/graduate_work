import  style  from "./style.module.scss"
import { Routes, Route} from 'react-router-dom'
import { Masine } from "../machines/machines";
import { CreateUpdateMachine } from "../machines/CreateUpdateMaсhine/CreateUpdateMachine";
import { MachineDetail } from "../machines/MachineDetail/MachineDetail";
import { ComplaintDetail, CreateUpdateComplaint } from "../Complaint/Complaint";
import { TechnicalMaintenanceDetail, CreateUpdateTechnicalMaintenance } from "../TechnicalMaintenance/TechnicalMaintenance";


const Main = ({isAuthN, user, userGroup}) =>  {
    console.log(user)
    return (
        <main className={style.main}>
     
            
                <Routes>
                    <Route path="/*" element={<Masine user={user} userGroup={userGroup}/>}></Route>
                    <Route path="/detail/*" element={<MachineDetail userGroup={userGroup}/>}></Route>
                    <Route path="/create_mashine/*" element={<CreateUpdateMachine type={"create"}/>}></Route>
                    <Route path="/update_mashine/*" element={<CreateUpdateMachine type={"update"}/>}></Route>
                    
                    <Route path="/detail_complaint/*" element={<ComplaintDetail/>}></Route>
                    <Route path="/create_complaint/*" element={<CreateUpdateComplaint type={"create"}/>}></Route>
                    <Route path="/update_complaint/*" element={<CreateUpdateComplaint type={"update"}/>}></Route>


                    <Route path="/detail_complaint/*" element={<ComplaintDetail/>}></Route>
                    <Route path="/create_complaint/*" element={<CreateUpdateComplaint type={"create"}/>}></Route>
                    <Route path="/update_complaint/*" element={<CreateUpdateComplaint type={"update"}/>}></Route>

                    <Route path="/detail_technical_maintenance/*" element={<TechnicalMaintenanceDetail/>}></Route>
                    <Route path="/create_technical_maintenance/*" element={<CreateUpdateTechnicalMaintenance type={"create"}/>}></Route>
                    <Route path="/update_technical_maintenance/*" element={<CreateUpdateTechnicalMaintenance type={"update"}/>}></Route>
                </Routes>
                
       

                    

        </main>
    );
    }


export default Main