import  style  from "./style.module.scss"
import { Routes, Route} from 'react-router-dom'
import { Masine, MachineDetail, CreateUpdateMaсhine } from "../machines/machines";
import { ComplaintDetail, CreateUpdateComplaint } from "../Complaint/Complaint";


const Main = ({isAuthN, userId}) =>  {
    return (
        <main className={style.main}>
            <span className={style.main__text}>Проверьте комплектацию и технические характеристики техники Силант</span>
            <div className={style.container__input_button}>
                <input className={style.input} type="text" />
                <button className={style.button} >Поиск машин</button>
            </div>

            
            
            { isAuthN? ( 
            
            <div>
                <Routes>
                    <Route path="/*" element={<Masine userId={userId}/>}></Route>
                    <Route path="/detail/*" element={<MachineDetail/>}></Route>
                    <Route path="/create_mashine/*" element={<CreateUpdateMaсhine type={"create"}/>}></Route>
                    <Route path="/update_mashine/*" element={<CreateUpdateMaсhine type={"update"}/>}></Route>
                    <Route path="/detail_complaint/*" element={<ComplaintDetail/>}></Route>
                    <Route path="/create_complaint/*" element={<CreateUpdateComplaint type={"create"}/>}></Route>
                    <Route path="/update_complaint/*" element={<CreateUpdateComplaint type={"update"}/>}></Route>
                </Routes>
                
                
                    
            </div>):null



            }
                    

        </main>
    );
    }


export default Main