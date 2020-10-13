import axios from 'axios';

const host = {
    apiUrl: "http://localhost:8000/api"
};

const api = {
    apiGetDevices:"/devices"
};


const apiGetDevices = () => {
    const token = localStorage.getItem('token');
    const response = axios.get(`${host.apiUrl}${api.apiGetDevices}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

export { apiGetDevices };