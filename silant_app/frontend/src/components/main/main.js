import  style  from "./style.module.scss"
import { useState, } from "react";
import { Routes, Route, Link, useLocation, } from 'react-router-dom'
import { TableMachine,  } from "../table/table";

import {CreateComplaint} from "../../components/CreateComplaint/CreateComplaint"


const Detail = () => {
    let location = useLocation()
    let data = location.state
    let values =  data.values

    console.log()
    return (
        <>
            <Link className={style.link} to="/">Выход</Link>
            <span>{values.model}</span>
            <span>{values.description}</span>

        </>


    )
    

}



const Main = ({isAuthN, userId}) =>  {

        const [path, setPath] = useState("machines")
    
        function clickButton1 () {
            setPath("machines")
        }
        
        function clickButton2 () {
            setPath("technical_maintenance")
        }

        function clickButton3 () {
            setPath("complaint")
    }
//
    console.log(path)
    return (
        <main className={style.main}>
            <span className={style.main__text}>Проверьте комплектацию и технические характеристики техники Силант</span>
            <div className={style.container__input_button}>
                <input className={style.input} type="text" />
                <button className={style.button} >Поиск машин</button>
                <div>
                    <button onClick={clickButton1}>Машины</button>
                    <button onClick={clickButton2}>ТО</button>
                    <button onClick={clickButton3}>Ремонты</button>
                        


                    <label> <input name="table" value={"machines"} type="radio" checked={path ==="machines"} onChange={()=>{setPath("machines")}}/> Машины </label> 
                    <label> <input name="table" value={"technical_maintenance"} type="radio" checked={path ==="technical_maintenance"} onChange={()=>{setPath("technical_maintenance")}}/> ТО </label>
                    <label> <input name="table" value={"complaint"} type="radio" checked={path ==="complaint"} onChange={()=>{setPath("complaint")}}/> Ремонты </label>


                </div>




            </div>
            <span className={style.text__result_search}>Информация о комплектации и технических зарактеристиках Вашей техники</span>
            { isAuthN? ( 
                
            <div>
                <Routes>
                    <Route path="/" element={<TableMachine path={path} userId={userId}/>}></Route>

                    <Route path="/detail" element={<Detail />}></Route>
                </Routes>


                <CreateComplaint userId={userId}/>


            </div>):null



            }
            
                    

        </main>
    );
    }


export default Main