import  style  from "./style.module.scss"
import { useState, useEffect, useContext } from "react";
import { getData, getExtendedData } from "../PostService";
import { Routes, Route, Link, useLocation, data } from 'react-router-dom'
import axios from 'axios';



const Table = ({path}) => {
    const [dataTable, setDataTable] = useState([])
    const [tableFieldsHeaders, setTableFieldsHeaders] = useState([])
    const [extendedTableData, setExtendedTableData] = useState({})


    function getTableData(path) {
        
        getData(path).then(result => {
            console.log(result)
            setDataTable(result.data)
            setTableFieldsHeaders(result.fields)
        })

        getExtendedData(path).then(result => {
            setExtendedTableData(result)
        })
    }





    useEffect(()=>{
        getTableData(path)
    },[])




        let columnTableHeaders = tableFieldsHeaders.map(function(column) {
            return <td key={column} className={style.table__column}>{column}</td>
        })

        let rowTable = dataTable.map(function(row) {
            
            let columnTable = Object.entries(row).map(function([key, value]){
                if (extendedTableData[key]){
                    let test = null
                    if (key === "client" || key === "service_company") {
                        if (key === "client") {extendedTableData[key].map(function(item){if (item.id === value) { test = item["username"]}})}
                        if (key === "service_company") {extendedTableData[key].map(function(item){if (item.id === value) { test = item["name"]}})}

                } else {
                        extendedTableData[key].map(function(item){

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
                
                {columnTable}

                </tr> 
      })

return (
    <table className={style.table}>
                <caption>Таблица с данными (выдача результата)</caption>
                
                
                <thead>
                    
                    {columnTableHeaders}

                </thead>

                <tbody>

                    {rowTable}

                </tbody>

            </table>
    )

}





const NewTable = ({path}) => {
    const [dataTable, setDataTable] = useState([])
    const [tableFieldsHeaders, setTableFieldsHeaders] = useState([])
    


    useEffect(()=>{
        getData(path).then(result => {
            setDataTable(result.data)
            setTableFieldsHeaders(result.fields)
        })
        
    },[path])

        let columnTableHeaders = tableFieldsHeaders.map(function(column) {
            return <td key={column} className={style.table__column}>{column}</td>
        })

        let rowTable = dataTable.map(function(row) {
            
            let columnTable = Object.entries(row).map(
                
                function([key, value]) {
                    if (typeof(value) === "object"){
                        let test = (Object.values(value)[1])

                        if (typeof(test) === "object") {
                             
                            return <td className={style.table__column}><Link className={style.link} to="/detail">{Object.values(test)[1]}</Link></td>
                        } else {
                            return <td className={style.table__column}><Link className={style.link} to="/detail" state={{keys:key, values:value}}>{Object.values(value)[1]}</Link></td>
                        }
                        

                    } else { 

                        if (key === "number_machine") {

                            return <td className={style.table__column}><Link className={style.link} to="/detail" state={{keys:key, values:value}}>{value}</Link></td>
                        }
                        else {
                            return <td className={style.table__column}>{value}</td>
                        }

                        }})
                                    
                        
                        
                return  <tr className={style.table__row} > {columnTable} </tr> 
      })

return (

    <>
    

    <table className={style.table}>
                <caption>Таблица с данными (выдача результата)</caption>
                
                
                <thead>
                    
                    {columnTableHeaders}

                </thead>

                <tbody>

                    {rowTable}

                </tbody>

            </table>
    </>
    )

}

const Detail = () => {
    let location = useLocation()
    let data = location.state
    let values =  data.values

    console.log()
    return (
        <>
            <Link className={style.link} to="/">Выход</Link>
            <span>{values.model}</span>
            <span>{values.description}</span>

        </>


    )
    
    



    
}
















const Main = () =>  {
        const [path, setPath] = useState("machines")
    
        function clickButton1 () {
            setPath("machines")
        }
        
        function clickButton2 () {
            setPath("technical_maintenance")
        }

        function clickButton3 () {
            setPath("complaint")
    }



    function getCookie (name) {
        let cookieValue = null
        console.log(document.cookie && document.cookie !== '')
        if (document.cookie && document.cookie !== '') {

        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
                }
            }
            }
            console.log(cookieValue)
        return cookieValue
        }
// Настройка axios с интерцептором для автоматической отправки CSRF токена
axios.defaults.withCredentials = true; // Важно для отправки кук

// Добавляем CSRF токен ко всем POST запросам
axios.interceptors.request.use(config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
    }
    return config;
});






function onLogin() {
    // Сначала получаем CSRF токен (он устанавливается при GET запросе)
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.post('http://localhost:8000/_allauth/browser/v1/auth/login', {
                username: "ИПТрудниковС.В.",
                password: "Kot_Terminator_1",
            }, {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .then(data => {
            console.log("Успешный вход:", data);
            updateSession(); // Обновляем информацию о сессии
        })
        .catch(error => {
            console.error("Ошибка входа:", error.response || error);
        });
}


function logOut() {
    // Сначала получаем CSRF токен (он устанавливается при GET запросе)
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.delete('http://localhost:8000/_allauth/browser/v1/auth/session', {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .then(data => {
            console.log("Вы вышли из сесии:", data.status);
            updateSession(); // Обновляем информацию о сессии
        })
        .catch(error => {
            console.error("Ошибка входа:", error.response || error);
        });
}






    const BASE_URL = `/_allauth/browser/v1`

    const SESSIONS =  '/auth/sessions'

    const session = {
        username: null,
        is_authenticated: false
        }









       // https://docs.allauth.org/_allauth/browser/v1/auth/session

    const updateSession = async () => {
    try {
        const response = await axios.get('http://localhost:8000/_allauth/browser/v1/auth/session', {
            headers: {
                "accept": "application/json",
                'Content-Type': "application/json",
            },
            withCredentials: true
        });
        
        
        if (response.data.data && response.data.data.user) {
            session.username = response.data.data.user.username;
            session.is_authenticated = true;
            console.log(session.username);
        }
    } catch (error) {
        console.error("Не авторизован:", error.response || error);
        session.username = null;
        session.is_authenticated = false;
    }
};






    return (
        <main className={style.main}>
            <span className={style.main__text}>Проверьте комплектацию и технические характеристики техники Силант</span>
            <div className={style.container__input_button}>
                <input className={style.input} type="text" />
                <button className={style.button}>Поиск машин</button>
                <div>
                    <button onClick={clickButton1}>Машины</button>
                    <button onClick={clickButton2}>ТО</button>
                    <button onClick={clickButton3}>Ремонты</button>
                    <button onClick={onLogin}>Войти</button>
                    <button onClick={updateSession}>Проверка сессии</button>
                    <button onClick={logOut}>Выйти</button>    

                </div>




            </div>
            <span className={style.text__result_search}>Информация о комплектации и технических зарактеристиках Вашей техники</span>
            
            <div>

                <Routes>
                    <Route path="/" element={<NewTable path={path}/>}></Route>
                    <Route path="/detail" element={<Detail />}></Route>
                </Routes>

            </div>
                    

        </main>
    );
    }


export default Main