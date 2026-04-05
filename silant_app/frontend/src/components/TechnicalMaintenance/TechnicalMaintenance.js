import { useRef, useEffect, useState } from "react";
import { getReferenceBooksTechnicalMaintenance, getDataTechnicalMaintenanceDetail, createUpdate } from '../PostService';
import { getLocalStorage } from '../AuxiliaryFunctions/LocalStorage';
import { getDataReferenceBooks } from '../AuxiliaryFunctions/AuxiliaryFunctions';
import { GoBackButton } from '../Button/Button'
import { Link, } from 'react-router-dom'
import  style  from "./style.module.scss"



export const TechnicalMaintenanceDetail = ({referenceBooksTechnicalMaintenance, userGroup}) => {

    let value = getLocalStorage('number_technical_maintenance_detail')    

    const [technicalMaintenanceData, setTechnicalMaintenanceData] = useState([])
   

    useEffect(()=>{
        getDataTechnicalMaintenanceDetail(value).then(result => {
            setTechnicalMaintenanceData(result.technical_maintenance)            
        })
    },[])

    const Create = () => {
                        if(((userGroup === "Manager") || (userGroup === "Service_company"))) {return <Link className={style.TechnicalMaintenanceDetail__link_createUpdate} to="/update_technical_maintenance/">Редактировать</Link> }
                        }

   
    return (

            <div className={style.TechnicalMaintenanceDetail__container_body}>
                <div className={style.TechnicalMaintenanceDetail__container_backUpdate}>
                    <GoBackButton />
                    {Create()}
                </div>
                <div className={style.TechnicalMaintenanceDetail__container_info}>
                    <div className={style.TechnicalMaintenanceDetail__container_row}>
                        <span className={style.text__result_search}>{`Вид ТО: `}</span>
                        <span className={style.text__result_search}>{` ${getDataReferenceBooks(technicalMaintenanceData.type_technical_maintenance, referenceBooksTechnicalMaintenance.type_technical_maintenance)}`}</span>
                    </div>
                    <div className={style.TechnicalMaintenanceDetail__container_row}>
                        <span className={style.text__result_search}>{`Дата проведения ТО:`}</span>
                        <span className={style.text__result_search}>{`${technicalMaintenanceData.date_maintenance}`}</span>
                    </div>
                    <div className={style.TechnicalMaintenanceDetail__container_row}>
                        <span className={style.text__result_search}>{`Наработка, м/час:`}</span>
                        <span className={style.text__result_search}>{`${technicalMaintenanceData.operating_time}`}</span>
                    </div>
                    <div className={style.TechnicalMaintenanceDetail__container_row}>
                        <span className={style.text__result_search}>{`№ заказ-наряда: `}</span>
                        <span className={style.text__result_search}>{`${technicalMaintenanceData.order_number}`}</span>

                    </div>
                    <div className={style.TechnicalMaintenanceDetail__container_row}>
                        <span className={style.text__result_search}>{`Дата заказ-наряда: `}</span>
                        <span className={style.text__result_search}>{`${technicalMaintenanceData.date_order_number}`}</span>
                    </div>
                    <div className={style.TechnicalMaintenanceDetail__container_row}>
                        <span className={style.text__result_search}>{`Заводской № Машины:`}</span>
                        <span className={style.text__result_search}>{`${technicalMaintenanceData.machine}`}</span>
                    </div>
                    <div className={style.TechnicalMaintenanceDetail__container_row}>
                        <span className={style.text__result_search}>{`Сервисная компания:`}</span>
                        <span className={style.text__result_search}>{`${getDataReferenceBooks(technicalMaintenanceData.service_company, referenceBooksTechnicalMaintenance.service_company)}`}</span>

                    </div>


                    
                    
                    
                    
                    
                    
                    
                </div>
                

                
            </div>


    )
    

}







