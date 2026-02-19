import  style  from "./style.module.scss"
import { useState, useEffect } from "react";
import { getMachine, getInformationMachines } from "../PostService";

function reformatData(arr) {
    let dict = {}
    for (let item of arr) {
        let id = item.id
        delete item.id
        dict[id] = item
    } return dict
}   

const Main = () =>  {
    const [machine, setMachine] = useState([])
    const [tableFields, setTableFields] = useState([])
    const [machineData, setMachineData] = useState({})
    const [engine, setEngine] = useState()
    const [transmission, setTransmission] = useState()
    const [drivingBridge, setDrivingBridge] = useState()
    const [controlledBridge, setControlledBridge] = useState()
    const [user, setUser] = useState()


    function getData() {
        getInformationMachines().then(result => {
           setMachineData(result)
        }

        )
    }

    function getMachineData() {
        getMachine().then(result => {
            setMachine(result.machine)
            setTableFields(result.fields)

        })
      }


    useEffect(()=>{
        getData()
        getMachineData()
    },[])



        let columnTableHeaders = tableFields.map(function(column) {
            return <td key={column} className={style.table__column}>{column}</td>
        })

        let machines = machine.map(function(row) {
            
            let column = Object.entries(row).map(function([key, value]){
                if (machineData[key]){
                    let test = null
                    if (key === "client") {
                        machineData[key].map(function(item){
                        if (item.id === value) { test = item["username"]}
                    })} else {
                        machineData[key].map(function(item){

                            if (item.id === value) { 
                                test = item["model"]
                                
                            }})
                    } 
                    return <td className={style.table__column}>{test}</td>
                    } else {
                        return <td className={style.table__column}>{value}</td>
                    }              
                })
                
                
    
         
        return  <tr className={style.table__row} key={row.number_machine}>
                
                {column}

                </tr> 
      })

        console.log(machines)
     

        //<tr className={style.table__row}>{columnTableHeaders}</tr>



    return (
        <main className={style.main}>
            <span className={style.main__text}>Проверьте комплектацию и технические характеристики техники Силант</span>
            <div className={style.container__input_button}>
                <input className={style.input} type="text" />
                <button className={style.button}onClick={getMachineData}>Поиск машин</button>
            </div>
            <span className={style.text__result_search}>Информация о комплектации и технических зарактеристиках Вашей техники</span>
            <table className={style.table}>
                <caption>Таблица с данными (выдача результата)</caption>
                
                
                <thead>
                    
                        {columnTableHeaders}

                </thead>

                <tbody>

                    {machines}

                </tbody>

            </table>

        </main>
    );
    }


export default Main