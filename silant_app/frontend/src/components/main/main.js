import  style  from "./style.module.scss"
import { Routes, Route} from 'react-router-dom'
import { Masine, MachineDetail, CreateUpdateMaсhine } from "../machines/machines";
import { ComplaintDetail, CreateUpdateComplaint } from "../Complaint/Complaint";
import { TechnicalMaintenanceDetail, CreateUpdateTechnicalMaintenance } from "../TechnicalMaintenance/TechnicalMaintenance";


const Main = ({isAuthN, userId}) =>  {
    return (
        <main className={style.main}>
            
            { isAuthN? ( 
                <div className={style.main__container_authn}>
                    <Routes>
                        <Route path="/*" element={<Masine userId={userId}/>}></Route>
                        <Route path="/detail/*" element={<MachineDetail/>}></Route>
                        <Route path="/create_mashine/*" element={<CreateUpdateMaсhine type={"create"}/>}></Route>
                        <Route path="/update_mashine/*" element={<CreateUpdateMaсhine type={"update"}/>}></Route>

                        <Route path="/detail_complaint/*" element={<ComplaintDetail/>}></Route>
                        <Route path="/create_complaint/*" element={<CreateUpdateComplaint type={"create"}/>}></Route>
                        <Route path="/update_complaint/*" element={<CreateUpdateComplaint type={"update"}/>}></Route>

                        <Route path="/detail_technical_maintenance/*" element={<TechnicalMaintenanceDetail/>}></Route>
                        <Route path="/create_technical_maintenance/*" element={<CreateUpdateTechnicalMaintenance type={"create"}/>}></Route>
                        <Route path="/update_technical_maintenance/*" element={<CreateUpdateTechnicalMaintenance type={"update"}/>}></Route>
                    </Routes>
                
            </div>):(
                <div className="main__container_notAuthn"> 
                    <span className={style.main__text}>Проверьте комплектацию и технические характеристики техники Силант</span>
                    <div className={style.container__input_button}>
                        <input className={style.input} type="text" />
                        <button className={style.button} >Поиск машин</button>
                    </div>
                </div>)



            }
                    

        </main>
    );
    }


export default Main