import  style  from "./style.module.scss"
import { useState, useEffect, } from "react";
import { getData, getDataComplaint} from "../PostService";
import { Link } from 'react-router-dom'



function mashineDetail () {

    return (<div>

        </div>)
     
}











export const TableMachine = ({path, userId}) => {
            
    const [dataTable, setDataTable] = useState([])
    const [tableFieldsHeaders, setTableFieldsHeaders] = useState([])

    useEffect(()=>{

        if(userId) {
            getData(path, userId).then(result => {
            setDataTable(result.data)
            setTableFieldsHeaders(result.fields)
        })
        }
        
        
    },[userId, path])

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




export const TableComplaint = ({userId}) => {
            
    const [dataTable, setDataTable] = useState([])
    const [tableFieldsHeaders, setTableFieldsHeaders] = useState([])

    useEffect(()=>{

        if(userId) {
            getDataComplaint(userId).then(result => {
            setDataTable(result.data)
            setTableFieldsHeaders(result.fields)
        })
        }
        
        
    },[userId])




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
