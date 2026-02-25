import axios from 'axios';
const API_URL = 'http://localhost:8000';


export function getData(paht) {
const url = `${API_URL}/api/${paht}/`
return axios.get(url).then(response => response.data)
}


export function getExtendedData(paht) {
const url = `${API_URL}/api/information_${paht}/`
return axios.get(url).then(response => response.data)
}