import  style  from "./style.module.scss"
import { useState, useEffect, useContext } from "react";
import { getData, getExtendedData } from "../PostService";
import { Routes, Route, Link, useLocation, data } from 'react-router-dom'
import axios from 'axios';
import {onLogin, logOut, updateSession} from "../authn/authn" 
 




const NewTable = ({path}) => {
    const [dataTable, setDataTable] = useState([])
    const [tableFieldsHeaders, setTableFieldsHeaders] = useState([])

    useEffect(()=>{
        getData(path).then(result => {
            setDataTable(result.data)
            setTableFieldsHeaders(result.fields)
        })
        
    },[path])

        let columnTableHeaders = tableFieldsHeaders.map(function(column) {
            return <td key={column} className={style.table__column}>{column}</td>
        })

        let rowTable = dataTable.map(function(row) {
            
            let columnTable = Object.entries(row).map(
                
                function([key, value]) {
                    if (typeof(value) === "object"){
                        let test = (Object.values(value)[1])

                        if (typeof(test) === "object") {
                             
                            return <td className={style.table__column}><Link className={style.link} to="/detail">{Object.values(test)[1]}</Link></td>
                        } else {
                            return <td className={style.table__column}><Link className={style.link} to="/detail" state={{keys:key, values:value}}>{Object.values(value)[1]}</Link></td>
                        }
                        

                    } else { 

                        if (key === "number_machine") {

                            return <td className={style.table__column}><Link className={style.link} to="/detail" state={{keys:key, values:value}}>{value}</Link></td>
                        }
                        else {
                            return <td className={style.table__column}>{value}</td>
                        }

                        }})
                                    
                        
                        
                return  <tr className={style.table__row} > {columnTable} </tr> 
      })

return (

    <>
    

    <table className={style.table}>
                <caption>Таблица с данными (выдача результата)</caption>
                
                
                <thead>
                    
                    {columnTableHeaders}

                </thead>

                <tbody>

                    {rowTable}

                </tbody>

            </table>
    </>
    )

}

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





const Main = () =>  {

    const [user, setUser] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(()=>{
        updateSession(setUser, setIsAuthenticated)
    },[])

console.log(user, isAuthenticated)






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









    const BASE_URL = `/_allauth/browser/v1`

    const SESSIONS =  '/auth/sessions'









       // https://docs.allauth.org/_allauth/browser/v1/auth/session

    





    return (
        <main className={style.main}>
            <span className={style.main__text}>Проверьте комплектацию и технические характеристики техники Силант</span>
            <div className={style.container__input_button}>
                <input className={style.input} type="text" />
                <button className={style.button}>Поиск машин</button>
                <div>
                    <button onClick={clickButton1}>Машины</button>
                    <button onClick={clickButton2}>ТО</button>
                    <button onClick={clickButton3}>Ремонты</button>
                    <button onClick={onLogin}>Войти</button>
                    <button onClick={updateSession}>Проверка сессии</button>
                    <button onClick={logOut}>Выйти</button>    

                </div>




            </div>
            <span className={style.text__result_search}>Информация о комплектации и технических зарактеристиках Вашей техники</span>
            
            <div>

                <Routes>
                    <Route path="/" element={<NewTable path={path}/>}></Route>
                    <Route path="/detail" element={<Detail />}></Route>
                </Routes>

            </div>
                    

        </main>
    );
    }


export default Main