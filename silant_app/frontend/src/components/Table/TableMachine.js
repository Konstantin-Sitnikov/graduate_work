import { useEffect, useRef, useState } from "react"
import  style  from "./style.module.scss"
import { Link } from 'react-router-dom'
import { Filter } from "../Filter/Filter"
import { getDataReferenceBooks } from "../AuxiliaryFunctions/AuxiliaryFunctions"
import { setLocalStorage } from "../AuxiliaryFunctions/LocalStorage"



export const TableMachine = ({dataMachine, referenceBooks, user}) => {
                
        const [filterList, setFilterlist] = useState([])
        const [dataTable, setDataTable] = useState([])

        const refFilterTechnic = useRef()
        const refFilterEngine = useRef()
        const refFilterTransmission = useRef()
        const refFilterDrivingBridge = useRef()
        const refFilterControlledBridge = useRef()

        const refFilterList = [refFilterTechnic, refFilterEngine, refFilterTransmission, refFilterDrivingBridge, refFilterControlledBridge]

        function sorted(list) {list.sort((a, b) => new Date(a.date_shipment) - new Date (b.date_shipment))}
        
        useEffect(()=>{
            sorted(dataMachine)
            setFilterlist(dataMachine)
            setDataTable(dataMachine)
            },[dataMachine])

return ( referenceBooks? <div className={style.container__table}>                            
                               
                            <table className={style.table}>
                                <thead>
                                            <tr className={style.table__row}> 
                                                <td className={style.table__column} colSpan={2}>  
                                                    Техника
                                                    <Filter listSelect={referenceBooks.model_technic} 
                                                    keyFilter={"model_technic"} refSelect={refFilterTechnic} 
                                                    refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>
                                                </td>                                    
                                                <td className={style.table__column} colSpan={2}>
                                                    Двигатель
                                                    <Filter listSelect={referenceBooks.model_engine} 
                                                    keyFilter={"model_engine"} refSelect={refFilterEngine} 
                                                    refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>
                                                </td> 

                                                <td className={style.table__column} colSpan={2}>
                                                    Трансмиссия
                                                    <Filter listSelect={referenceBooks.model_transmission} 
                                                    keyFilter={"model_transmission"} refSelect={refFilterTransmission}
                                                    refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>
                                                </td>

                                                <td className={style.table__column} colSpan={2}>
                                                    Ведущий мост
                                                    <Filter listSelect={referenceBooks.model_driving_bridge} 
                                                    keyFilter={"model_driving_bridge"} refSelect={refFilterDrivingBridge} 
                                                    refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>                                  
                                                </td>

                                                <td className={style.table__column} colSpan={2}>
                                                    Управляемый мост
                                                    <Filter listSelect={referenceBooks.model_controlled_bridge} 
                                                    keyFilter={"model_controlled_bridge"} refSelect={refFilterControlledBridge} 
                                                    refList={refFilterList} dataTable={dataTable} setFilterlist={setFilterlist}/>                        
                                                </td>
                                                
                                                {   user ? ( <>
                                                                <td className={style.table__column} colSpan={2}>Договор</td>

                                                                <td className={style.table__column} colSpan={2}>Получатель</td>

                                                                <td className={style.table__column} rowSpan={2}>Комплектация</td>

                                                                <td className={style.table__column} rowSpan={2}>Клиент</td>

                                                                <td className={style.table__column} rowSpan={2}>Сервисная компания</td>
                                                                                                
                                                            </>
                                                            
                                                ):null
                                                }
                                                
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
                                                {   user ? ( <>
                                                                <td className={style.table__column}>Номер, дата</td>
                                                                <td className={style.table__column}>Дата отгрузки</td>

                                                                <td className={style.table__column}>Имя</td>
                                                                <td className={style.table__column}>Адрес поставки</td>
                                                                                                
                                                            </>                                                            
                                                ):null
                                                }




                                                
                                            </tr>
                                    </thead>
                                <tbody>

                                    {
                                        filterList.map(function(row, index) {                                                        
                                                        return  referenceBooks ? 
                                                                <tr className={style.table__row} key={index}>
                                                                    <td className={style.table__column}><Link className={style.link} to="/detail/technical_maintenance" onClick={()=>{setLocalStorage('number_machine_to_detail', row.number_machine)}}>{row.number_machine}</Link></td>
                                                                    <td className={style.table__column}>{getDataReferenceBooks(row.model_technic, referenceBooks.model_technic)}</td>

                                                                    <td className={style.table__column}>{getDataReferenceBooks(row.model_engine, referenceBooks.model_engine)}</td>
                                                                    <td className={style.table__column}>{row.number_engine}</td>

                                                                    <td className={style.table__column}>{getDataReferenceBooks(row.model_transmission, referenceBooks.model_transmission)}</td>
                                                                    <td className={style.table__column}>{row.number_transmission}</td>

                                                                    <td className={style.table__column}>{getDataReferenceBooks(row.model_driving_bridge, referenceBooks.model_driving_bridge)}</td>
                                                                    <td className={style.table__column}>{row.number_driving_bridge}</td>

                                                                    <td className={style.table__column}>{getDataReferenceBooks(row.model_controlled_bridge, referenceBooks.model_controlled_bridge)}</td>
                                                                    <td className={style.table__column}>{row.number_controlled_bridge}</td>


                                                                    {   user ? ( <>
                                                                                    <td className={style.table__column}>{row.delivery_agreement}</td>
                                                                                    <td className={style.table__column}>{row.date_shipment}</td>

                                                                                    <td className={style.table__column}>{row.end_user}</td>
                                                                                    <td className={style.table__column}>{row.delivery_address}</td>
                                                                                    
                                                                                    <td className={style.table__column}>{row.Equipment}</td>

                                                                                    <td className={style.table__column}>{getDataReferenceBooks(row.client, referenceBooks.client)}</td>

                                                                                    <td className={style.table__column}>{getDataReferenceBooks(row.service_company, referenceBooks.service_company)}</td>
                                                                                                
                                                                        </>                                                            
                                                                    ):null
                                                                    }


                                                                    
                                                                </tr> 
                                            :null })
                                    }

                                </tbody>


                        </table>
                        
                    </div> :null

    )

}

