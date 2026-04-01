import { useEffect, useRef, useState } from "react"
import  style  from "./style.module.scss"
import { Link } from 'react-router-dom'
import { Filter } from "../Filter/Filter"
import { getDataReferenceBooks } from "../AuxiliaryFunctions/AuxiliaryFunctions"
import { setLocalStorage } from "../AuxiliaryFunctions/LocalStorage"




export const TableComplaint = ({complaintData, referenceBooks}) => {
            
        const [filterList, setFilterlist] = useState([])
        const [dataTable, setDataTable] = useState([])
        const refFilterFailureNode = useRef()
        const refFilterRecoveryMethod = useRef()
        const refFilterServiceCompany = useRef()

        const refFilterList = [refFilterFailureNode, refFilterRecoveryMethod, refFilterServiceCompany]

        function sorted(list) {list.sort((a, b) => new Date(a.date_failure) - new Date (b.date_failure))}
        
        useEffect(()=>{
            sorted(complaintData)
            setFilterlist(complaintData)
            setDataTable(complaintData)
            },[complaintData])

    
return ( 
            <table className={style.table}> 
                <thead>
                    <tr className={style.table__row}> 
                        <td className={style.table__column}>№ Заявки</td>
                        <td className={style.table__column}>Заводской № Машины</td>
                        <td className={style.table__column}>Дата отказа</td>
                        <td className={style.table__column}>Наработка, м/час</td>
                        <td className={style.table__column}>
                            Узел отказа
                            <Filter listSelect={referenceBooks.failure_node} 
                            keyFilter={"failure_node"} refSelect={refFilterFailureNode} 
                            refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>                                  
                        </td>
                        <td className={style.table__column}>Описание отказа</td>
                        <td className={style.table__column}>
                            Способ восстановления
                            <Filter listSelect={referenceBooks.recovery_method} 
                            keyFilter={"recovery_method"} refSelect={refFilterRecoveryMethod} 
                            refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>    
                        </td>
                        <td className={style.table__column}>Используемые запчасти</td>
                        <td className={style.table__column}>Дата восстановления</td>
                        <td className={style.table__column}>Время простоя техники</td>
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
                                        <td className={style.table__column}><Link className={style.link} onClick={()=>{setLocalStorage('number_complaint_detail', row.id)}} to="/detail_complaint">{row.id}</Link></td>
                                        
                                        <td className={style.table__column}>{row.machine}</td>

                                        <td className={style.table__column}>{row.date_failure}</td>

                                        <td className={style.table__column}>{row.operating_time}</td>

                                        <td className={style.table__column}>{getDataReferenceBooks(row.failure_node, referenceBooks.failure_node)}</td>

                                        <td className={style.table__column}>{row.description_failure}</td>

                                        <td className={style.table__column}>{getDataReferenceBooks(row.recovery_method, referenceBooks.recovery_method)}</td>
                                        <td className={style.table__column}>{row.used_parts}</td>

                                        <td className={style.table__column}>{row.date_restoration}</td>
                                        <td className={style.table__column}>{row.downtime}</td>

                                        <td className={style.table__column}>{getDataReferenceBooks(row.service_company, referenceBooks.service_company)}</td>
                                        
                                    </tr> 
                                :null })
                    }

                </tbody>

            </table>


    )

}

