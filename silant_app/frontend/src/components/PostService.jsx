import axios from 'axios';
const API_URL = 'http://localhost:8000';

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


export function getCSRF(foo) {
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => { 
            return foo})}




/*
export function logIn () {
    (()=>{ return axios.post('http://localhost:8000/_allauth/browser/v1/auth/login', {
                username: refName.current.value,
                password: refPassword.current.value,
            }, {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .then(data => { 

            updateSession()
        })
        .catch(error => {

            if (error.response.status === 400) {
                console.log("Неправильный логин или пароль");
            }
            if (error.response.status === 409) {
                console.log("Вы уже авторизованы");
            }


        });
}            

*/



export function getData(path, userId) {
const url = `${API_URL}/api/${path}/` + userId
return axios.get(url).then(response => response.data)
}

export function getDataComplaint(userId) {
const url = `${API_URL}/api/complaint/` + userId
return axios.get(url).then(response => response.data)
}

export function getDataCreateComplaint(userId) {
const url = `${API_URL}/api/machines/` + userId
return axios.get(url).then(response => response.data)
}




export function getExtendedData() {
const url = `${API_URL}/api/information_for_complaint/`
return axios.get(url).then(response => response.data)
}


