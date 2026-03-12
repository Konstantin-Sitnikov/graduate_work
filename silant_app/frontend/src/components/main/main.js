import  style  from "./style.module.scss"
import { useEffect, useState, } from "react";
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import { TableMachine,  } from "../table/table";
import { getDataMasineDetail, getDataTest } from "../PostService";

import {CreateComplaint} from "../../components/CreateComplaint/CreateComplaint"


const Detail = () => {
    let location = useLocation()
    let data = location.state
    let values =  data.values


    useEffect(()=>{
        getDataMasineDetail(values).then(result => {
            console.log(result.machine)
            console.log(result.complaint)
        })
    },[])

  

    return (
        <>
            <Link className={style.link} to="/">Выход</Link>
            <span>{values}</span>
            <span>{values.description}</span>

        </>


    )
    

}
/*
{ isAuthN? ( 
                
            <div>
                <Routes>
                    <Route path="/" element={<TableMachine path={path} userId={userId}/>}></Route>

                    <Route path="/detail" element={<Detail />}></Route>
                </Routes>


            </div>):null



            }

*/









const Table = ({dataTable, tableFieldsHeaders}) => {
            

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


function Masine({userId}) {

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
                    <Route path="/detail" element={<Detail />}></Route>
                </Routes>


            </div>):null



            }
                    

        </main>
    );
    }


export default Main