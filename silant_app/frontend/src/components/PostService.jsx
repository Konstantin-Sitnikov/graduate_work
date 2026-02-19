import axios from 'axios';
const API_URL = 'http://localhost:8000';


export function getMachine() {
const url = `${API_URL}/api/machines/`
return axios.get(url).then(response => response.data)
}


export function getInformationMachines() {
const url = `${API_URL}/api/information_machines/`
return axios.get(url).then(response => response.data)
}