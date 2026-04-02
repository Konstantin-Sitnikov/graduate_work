import { useEffect, useState } from "react";
import {  getDataComplaintDetail } from '../../PostService';
import { getLocalStorage } from '../../AuxiliaryFunctions/LocalStorage';
import { getDataReferenceBooks } from '../../AuxiliaryFunctions/AuxiliaryFunctions';
import { GoBackButton } from '../../Button/Button'
import { Link, } from 'react-router-dom'
import  style  from "./style.module.scss"




export const ComplaintDetail = ({referenceBooksComplaint}) => {

    let value = getLocalStorage('number_complaint_detail')

    const [complaintData, setComplaintData] = useState([])


    useEffect(()=>{
        getDataComplaintDetail(value).then(result => {
            setComplaintData(result.complaint_data)            
        })
    },[])

    return (

            <div className={style.complaintDetail__container_body}>
                <div className={style.complaintDetail__container_backUpdate}>
                    <GoBackButton />  
                    <Link className={style.complaintDetail__link_createUpdate} to="/update_complaint/">Редактировать</Link>
                </div>
                <div className={style.complaintDetail__container_numberComplaint}>
                    <span>{`Номер заявки: ${complaintData.id}`}</span>
                </div>               

                <div className={style.complaintDetail__container_info}>
                    
                    <div className={style.complaintDetail__container_column}>
                        <div className={style.complaintDetail__container_row}>
                            <span className={style.text__result_search}>{`Заводской № Машины:`}</span>
                            <span className={style.text__result_search}>{`${complaintData.machine}`}</span>
                        </div>
                        <div className={style.complaintDetail__container_row}>
                            <span className={style.text__result_search}>{`Дата отказа:`}</span>
                            <span className={style.text__result_search}>{`${complaintData.date_failure}`}</span>
                        </div>
                        <div className={style.complaintDetail__container_row}>
                            <span className={style.text__result_search}>{`Наработка, м/час:`}</span>
                            <span className={style.text__result_search}>{`${complaintData.operating_time}`}</span>
                        </div>
                        <div className={style.complaintDetail__container_row}>
                            <span className={style.text__result_search}>{`Узел отказа:`}</span>
                            <span className={style.text__result_search}>{`${getDataReferenceBooks(complaintData.failure_node, referenceBooksComplaint.failure_node)}`}</span>
                        </div>
                        
                        <div className={style.complaintDetail__container_description_parts}>
                            <span className={style.text__result_search}>{`Описание отказа:`}</span>
                            <div className={style.complaintDetail__container_description}>
                                <span className={style.text__result_search}>{`${complaintData.description_failure}`}</span>
                            </div>
                            
                        </div>

                        
                    </div>

                    <div className={style.complaintDetail__container_column}>
                        
                        
                        <div className={style.complaintDetail__container_row}>
                            <span className={style.text__result_search}>{`Способ восстановления:`}</span>
                            <span className={style.text__result_search}>{`${getDataReferenceBooks(complaintData.recovery_method, referenceBooksComplaint.recovery_method)}`}</span>
                        </div>
                        
                        <div className={style.complaintDetail__container_row}>
                            <span className={style.text__result_search}>{`Дата восстановления:`}</span>
                            <span className={style.text__result_search}>{`${complaintData.date_restoration}`}</span>
                        </div>


                        <div className={style.complaintDetail__container_row}>
                            <span className={style.text__result_search}>{`Время простоя техники, час:`}</span>
                           <span className={style.text__result_search}>{`${complaintData.downtime}`}</span>
                        </div>
                        
                        <div className={style.complaintDetail__container_row}>
                            <span className={style.text__result_search}>{`Сервисная компания:`}</span>
                            <span className={style.text__result_search}>{`${getDataReferenceBooks(complaintData.service_company, referenceBooksComplaint.service_company)}`}</span>
                        </div>

                        <div className={style.complaintDetail__container_description_parts}>
                            <span className={style.text__result_search}>{`Используемые запчасти:`}</span>
                            <div className={style.complaintDetail__container_description}>
                                <span className={style.text__result_search}>{`${complaintData.used_parts}`}</span>
                            </div>                            
                        </div> 
                    </div>
                </div>                
            </div>
    ) 
}







