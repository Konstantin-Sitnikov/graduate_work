import { useRef } from "react"
import  style  from "./style.module.scss"



export const Filter = ({listSelect, keyFilter, refSelect, refList, dataTable, setFilterlist}) => {

    return  listSelect?   <select className={style.filter__select} ref={refSelect} 
                                onChange={(event)=> {

                                    if (event.target.value === "default") {
                                        setFilterlist(dataTable)
                                    }   else {for (const ref of refList){if (event.target !== ref.current) {ref.current.value = "default"}}
                                        
                                        const filter = dataTable.filter(item=> String(item[keyFilter]) === String(event.target.value))
                                        setFilterlist(filter)}}
                                } 
                            
                            
                                defaultValue={"default"}>
                        <option value={"default"}>Выберете...</option>
                        {
                        listSelect.map((item) => {
                            if ("model" in item) {return <option key={item.id} value={item.id}>{item.model}</option>} 
                            if ("username" in item) {return item.username}
                            if ("name" in item) {return <option key={item.id} value={item.id}>{item.name}</option> }
                        }) 
                        }
                    </select>:null
    }



export const FilterMachine = ({setFilterlist, refList, dataTable}) => {
    const refInput = useRef()
    console.log(dataTable)
    function test(item) {
        if ("number_machine" in item) { return item.number_machine }
        else {return item.machine}
    }
    
    
    return <input className={style.filter__input} ref={refInput} onChange={()=>{
            if (refInput.current.value) {

                for (const ref of refList){ref.current.value = "default"}
                                        const filter = dataTable.filter(item=> String(test(item)).includes(String(refInput.current.value)))
                                        setFilterlist(filter)
                                        console.log(filter)
            } else {setFilterlist(dataTable)}


        }} type="text"/>
            
    }

