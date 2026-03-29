import { useEffect, useRef, useState } from "react"
import  style  from "./style.module.scss"
import { Link } from 'react-router-dom'
import { Filter, FilterMachine } from "../Filter/Filter"
import { getDataReferenceBooks } from "../AuxiliaryFunctions/AuxiliaryFunctions"
import { setLocalStorage } from "../AuxiliaryFunctions/LocalStorage"

export const TableTechnicalMaintenance = ({technicalMaintenanceData, referenceBooks}) => {
        const [filterList, setFilterlist] = useState([])
        const [dataTable, setDataTable] = useState([])


        const refFilterTypeTechnicalMaintenance = useRef()
        const refFilterServiceCompany = useRef()

        const refFilterList = [refFilterTypeTechnicalMaintenance, refFilterServiceCompany]

        function sorted(list) {list.sort((a, b) => new Date(a.date_maintenance) - new Date (b.date_maintenance))}
        
        useEffect(()=>{
            sorted(technicalMaintenanceData)
            setFilterlist(technicalMaintenanceData)
            setDataTable(technicalMaintenanceData)
            },[technicalMaintenanceData])

    
return ( 
            <div className={style.container__table}>
            <table className={style.table}>                                    
                        
                <thead>
                    <tr className={style.table__row}>

                        <td className={style.table__column}>№ заказ-наряда</td> 
                            
                        <td className={style.table__column}>
                            
                            Вит ТО
                            <Filter listSelect={referenceBooks.type_technical_maintenance} 
                                keyFilter={"type_technical_maintenance"} refSelect={refFilterTypeTechnicalMaintenance} 
                                refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>    

                        </td>

                        <td className={style.table__column}>Дата проведения ТО</td>
                            

                        <td className={style.table__column}>Наработка, м/час</td>
                        
                        <td className={style.table__column}>Дата заказ-наряда</td>

                        <td className={style.table__column}>
                            Заводской № Машины
                            <FilterMachine refList={refFilterList} setFilterlist={setFilterlist} dataTable={dataTable}/>
                        </td>

                        <td className={style.table__column}>
                            Сервисная компания
                            <Filter listSelect={referenceBooks.service_company} 
                            keyFilter={"service_company"} refSelect={refFilterServiceCompany} 
                            refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>
                        </td>
                    </tr>                
                </thead>

                <tbody>

                    {
                        filterList.map(function(row, index) {  
                            
                                                   
                            return  referenceBooks ? 
                            
                                    <tr className={style.table__row} key={index}>

                                        <td className={style.table__column}><Link className={style.link} onClick={()=>{setLocalStorage('number_technical_maintenance_detail', row.id)}} to="/detail_technical_maintenance">{row.order_number}</Link></td>
                                        
                                        <td className={style.table__column}>{getDataReferenceBooks(row.type_technical_maintenance, referenceBooks.type_technical_maintenance)}</td>

                                        <td className={style.table__column}>{row.date_maintenance}</td>

                                        <td className={style.table__column}>{row.operating_time}</td>
                                      
                                        <td className={style.table__column}>{row.date_order_number}</td>

                                        <td className={style.table__column}>{row.machine}</td>
                                        
                                        <td className={style.table__column}>{getDataReferenceBooks(row.service_company, referenceBooks.service_company)}</td>
                                        
                                    </tr> 
                                :null })
                    }

                </tbody>

            </table>
        </div>

    )

}

