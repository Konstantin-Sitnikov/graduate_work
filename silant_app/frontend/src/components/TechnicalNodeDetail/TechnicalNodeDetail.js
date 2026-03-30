import { getLocalStorage } from '../AuxiliaryFunctions/LocalStorage';
import { GoBackButton } from '../Button/Button'
import  style  from "./style.module.scss"



export function TechnicalNodeDetail () { 
    let value = getLocalStorage('detail_node')
    console.log(value)
   
    return (
            <> 
            <div>
                <GoBackButton />
                <span className={style.text__result_search}>{`Назваине: ${value.model}`}</span>
                <span className={style.text__result_search}>{`Описание: ${value.description}`}</span>
            </div>

            </>

    )

}

