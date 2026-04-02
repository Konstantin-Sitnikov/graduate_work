import { getLocalStorage } from '../AuxiliaryFunctions/LocalStorage';
import { GoBackButton } from '../Button/Button'
import  style  from "./style.module.scss"



export function TechnicalNodeDetail () { 
    let value = getLocalStorage('detail_node')
   
    return (
            <> 
            <div className={style.technicalNode__container}>
                <GoBackButton />
                <span className={style.technicalNode__text_name}>{`${value.model}`}</span>
                <span className={style.technicalNode__text_description}>{`${value.description}`}</span>
            </div>

            </>

    )

}

