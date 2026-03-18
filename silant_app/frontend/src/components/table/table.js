import { useEffect, useState } from "react"
import  style  from "./style.module.scss"
import { Link } from 'react-router-dom'

function setLocalStorage(value) {
    localStorage.setItem('number_machine_to_detail', JSON.stringify(value))
}



export const Table = ({dataTable, tableFieldsHeaders}) => {
            

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

                            return <td className={style.table__column}><Link className={style.link} to="/detail" onClick={()=>{setLocalStorage(value)}}>{value}</Link></td>
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


export const TableMachine = ({dataMachine, referenceBooks}) => {

        const [filterList, setFilterlist] = useState([])
        const [dataTable, setDataTable] = useState([])
        
        useEffect(()=>{
            setFilterlist(dataMachine)
            setDataTable(dataMachine)
        },[dataMachine])


        function getDataReferenceBooks(id, array) {
            
            for (let item of array) {
                if (item.id === id) {
                    if ("model" in item) {
                        return item.model
                    } 
                    if ("username" in item) {
                        return item.username
                    }
                    if ("name" in item) {
                        return item.name
                    }
            }
            
        }}
                
        let rowTable = filterList.map(function(row) {

                        
                return  referenceBooks ? 
                         <tr className={style.table__row} >
                            <td className={style.table__column}>{row.number_machine}</td>
                            <td className={style.table__column}>{getDataReferenceBooks(row.model_technic, referenceBooks.model_technic)}</td>

                            <td className={style.table__column}>{getDataReferenceBooks(row.model_engine, referenceBooks.model_engine)}</td>
                            <td className={style.table__column}>{row.number_engine}</td>

                            <td className={style.table__column}>{getDataReferenceBooks(row.model_transmission, referenceBooks.model_transmission)}</td>
                            <td className={style.table__column}>{row.number_transmission}</td>

                            <td className={style.table__column}>{getDataReferenceBooks(row.model_driving_bridge, referenceBooks.model_driving_bridge)}</td>
                            <td className={style.table__column}>{row.number_driving_bridge}</td>

                            <td className={style.table__column}>{getDataReferenceBooks(row.model_controlled_bridge, referenceBooks.model_controlled_bridge)}</td>
                            <td className={style.table__column}>{row.number_controlled_bridge}</td>

                            <td className={style.table__column}>{row.delivery_agreement}</td>
                            <td className={style.table__column}>{row.date_shipment}</td>

                            <td className={style.table__column}>{row.end_user}</td>
                            <td className={style.table__column}>{row.delivery_address}</td>
                            
                            <td className={style.table__column}>{row.Equipment}</td>

                            <td className={style.table__column}>{getDataReferenceBooks(row.client, referenceBooks.client)}</td>

                            <td className={style.table__column}>{getDataReferenceBooks(row.service_company, referenceBooks.service_company)}</td>
                        </tr> 
      :null })

    function test(e, key) {
        console.log (e.target.value)
        if (e.target.value === "123") {
            setFilterlist(dataTable)
        }   else {const filter = dataTable.filter(item=>
            item[key] == e.target.value
        )
            setFilterlist(filter)}


    }

    function filter(list, key) {

        return  list?   <select onChange={(event)=> {test(event, key)}} defaultValue={123}>
                            <option value={123}>Вся</option>
                            {
                            list.map((item) => {
                                return <option key={item.id} value={item.id}>{item.model}</option>
                            }) 
                            }
                        </select>:null
    }



return ( 


    
<div className={style.container__table}>
    <table className={style.table}>
                <caption>Таблица с данными (выдача результата)</caption>
                
                
                <thead>
                    <tr className={style.table__row}> 
                        <td className={style.table__column} colSpan={2}>  
                            Техника
                            {  
                                filter(referenceBooks.model_technic, "model_technic") 
                            }
                            
                        </td>
                        
                        <td className={style.table__column} colSpan={2}>Двигатель</td>
                        

                        <td className={style.table__column} colSpan={2}>Трансмиссия</td>


                        <td className={style.table__column} colSpan={2}>Ведущий мост</td>

                        <td className={style.table__column} colSpan={2}>Управляемый мост</td>

                        <td className={style.table__column} colSpan={2}>Договор</td>

                        <td className={style.table__column} colSpan={2}>Получатель</td>


                        <td className={style.table__column} rowSpan={2}>Комплектация</td>

                        <td className={style.table__column} rowSpan={2}>Клиент</td>

                        <td className={style.table__column} rowSpan={2}>Сервисная компания</td>
                    </tr>
                <tr className={style.table__row}> 
                        <td className={style.table__column}>Зав. №</td>
                        <td className={style.table__column}>Модель</td>

                        <td className={style.table__column}>Модель</td>
                        <td className={style.table__column}>Зав. №</td>

                        <td className={style.table__column}>Модель</td>
                        <td className={style.table__column}>Зав. №</td>

                        <td className={style.table__column}>Модель</td>
                        <td className={style.table__column}>Зав. №</td>

                        <td className={style.table__column}>Модель</td>
                        <td className={style.table__column}>Зав. №</td>

                        <td className={style.table__column}>Номер, дата</td>
                        <td className={style.table__column}>Дата отгрузки</td>

                        <td className={style.table__column}>Имя</td>
                        <td className={style.table__column}>Адрес поставки</td>


                    </tr>

                </thead>

                <tbody>

                    {rowTable}

                </tbody>

            </table>
        </div>

    )

}

