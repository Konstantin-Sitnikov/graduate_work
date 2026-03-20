import  style  from "./style.module.scss"
import { useState, } from "react";
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { Masine, MachineDetail, CreateMashine } from "../machines/machines";







const Main = ({isAuthN, userId}) =>  {
        const [path, setPath] = useState("machines")

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
                    <Route path="/create_mashine/*" element={<CreateMashine/>}></Route>
                </Routes>
                
                
                    
            </div>):null



            }
                    

        </main>
    );
    }


export default Main