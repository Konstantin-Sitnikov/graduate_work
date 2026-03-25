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



//Yes
export function getDataMasine(userId) {
const url = `${API_URL}/api/machines/` + userId
return axios.get(url).then(response => response.data)
}

//Yes
export function getReferenceBooksMasine() {
const url = `${API_URL}/api/reference_books_machines/`
return axios.get(url).then(response => response.data)
}

//Yes
export function getReferenceBooksComplaint() {
const url = `${API_URL}/api/reference_books_complaint/`
return axios.get(url).then(response => response.data)
}

//Yes
export function getReferenceBooksTechnicalMaintenance() {
const url = `${API_URL}/api/reference_books_technical_maintenance/`
return axios.get(url).then(response => response.data)
}

//Yes
export function getDataMasineDetail(number_machine) {
const url = `${API_URL}/api/machine_detail/` + `${number_machine}`
return axios.get(url).then(response => response.data)}


export function getDataComplaintDetail(number_complaint) {
const url = `${API_URL}/api/complaint_detail/` + `${number_complaint}`
return axios.get(url).then(response => response.data)}


export function getDataCreateComplaint(userId) {
    const url = `${API_URL}/api/machines/` + userId
    return axios.get(url).then(response => response.data)
    }

export function getDataTechnicalMaintenanceDetail(number_technical_maintenance) {
const url = `${API_URL}/api/technical_maintenance_detail/` + `${number_technical_maintenance}`
return axios.get(url).then(response => response.data)}






export function createUpdate(path, data) {
    return axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.post(`http://localhost:8000/api/${path}/`, data, {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })}



