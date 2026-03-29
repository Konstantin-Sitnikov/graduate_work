import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation} from 'react-router-dom'
import { getDataMasineDetail,  getReferenceBooksMasine, getReferenceBooksComplaint, getReferenceBooksTechnicalMaintenance } from '../../PostService';
import { TableComplaint } from '../../Table/TableComplaint';
import { TableTechnicalMaintenance } from '../../Table/TableTechnicalMaintenance';
import { getLocalStorage } from '../../AuxiliaryFunctions/LocalStorage';
import { getDataReferenceBooks } from '../../AuxiliaryFunctions/AuxiliaryFunctions';
import { NavigationMachineDetail } from '../../Navigation/Navigation';
import  style  from "./style.module.scss"



export const MachineDetail = ({userGroup}) => {

    let value = getLocalStorage('number_machine_to_detail')

    const [complaintData, setComplaintData] = useState([])
    const [machineData, setMachineData] = useState({})
    const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
    const [referenceBooksMasine, setReferenceBooksMasine] = useState({})
    const [referenceBooksComplaint, setReferenceBooksComplaint] = useState({})
    const [referenceBooksTechnicalMaintenance, setReferenceBooksTechnicalMaintenance] = useState({})
    const [pathName, setPathName] = useState("")

    const location = useLocation()
    useEffect(()=> {
        setPathName(location.pathname)
    },[location])
    
    
    useEffect(()=>{
        getDataMasineDetail(value).then(result => {
            setComplaintData(result.complaint_data)
            const mashine = result.machine_data
            setMachineData(mashine[0])
            setTechnicalMaintenanceData(result.technical_maintenance_data)

        })
    },[])

    useEffect(()=>{
        getReferenceBooksMasine().then(result => {setReferenceBooksMasine(result)})
        getReferenceBooksComplaint().then(result => {setReferenceBooksComplaint(result)})
        getReferenceBooksTechnicalMaintenance().then(result => {setReferenceBooksTechnicalMaintenance(result)
        })
    },[])

    const test = () => {
                        if(pathName ==="/detail/technical_maintenance") {return <span>Информация о проведенных ТО Вышей техники</span> }
                        if(pathName ==="/detail/complaint") {return <span>Информация о возникших поломках Вышей техники</span> }
                    }
    
    const Create = () => {
                        if((pathName ==="/detail/technical_maintenance") & ((userGroup === "Manager") || (userGroup === "Service_company"))) {return <Link to="/create_technical_maintenance/">Добавить ТО</Link> }
                        if(pathName ==="/detail/complaint") {return <Link to="/create_complaint/">Добавить Поломку</Link> }
                    }


    return (

            <div className={style.machineDetail__container_body}>                
                <div className={style.machineDetail__container_info}>
                    <span className={style.text__result_search}>{`Машина: ${getDataReferenceBooks(machineData.model_technic, referenceBooksMasine.model_technic) }`}</span>
                    <span className={style.text__result_search}>{`Cерийный номер: ${machineData.number_machine}`}</span> 
                </div>

                <div className={style.machineDetail__container_equipment}>
                    <span>Информация о комплектации:</span>
                    <Link to="/update_mashine/">Редактировать</Link>
                    <table className={style.machineDetail__tableEquipment}>
                        <thead><td>Узел</td><td>Модель</td><td>Номер</td></thead>
                        <tbody>
                            <tr><td>Двигатель</td><td>{getDataReferenceBooks(machineData.model_engine, referenceBooksMasine.model_engine)}</td><td>{machineData.number_engine}</td></tr>
                            <tr><td>Трансмиссия</td><td>{getDataReferenceBooks(machineData.model_transmission, referenceBooksMasine.model_transmission)}</td><td>{machineData.number_transmission}</td></tr>
                            <tr><td>Ведущий мост</td><td>{getDataReferenceBooks(machineData.model_driving_bridge, referenceBooksMasine.model_driving_bridge)}</td><td>{machineData.number_driving_bridge}</td></tr>
                            <tr><td>Управляемый мост</td><td>{getDataReferenceBooks(machineData.model_controlled_bridge, referenceBooksMasine.model_controlled_bridge)}</td><td>{machineData.number_controlled_bridge}</td></tr>
                            <tr><td>Дополнительная комплектация</td><td></td><td colSpan={2}>{machineData.Equipment}</td></tr>
                        </tbody>
                        
                    </table>
                </div>
                
                
                <div className={style.machineDetail__container_searchResults}>
                    {test()} {Create()}
                    
                    <NavigationMachineDetail/>

                    <Routes>                         
                        <Route path="/technical_maintenance" element={<TableTechnicalMaintenance technicalMaintenanceData={technicalMaintenanceData} referenceBooks={referenceBooksTechnicalMaintenance} />}> </Route>
                        <Route path="/complaint" element={<TableComplaint complaintData={complaintData} referenceBooks={referenceBooksComplaint} />}></Route>
                    </Routes>

                </div>
            </div>


    )
    

}
