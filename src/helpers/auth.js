import axios from 'axios';

const host = {
    apiUrl: "http://localhost:8000/api"
};

const api = {
    apiSignin:"/login"
};


const login = async credential => {
    const response = axios.post(`${host.apiUrl}${api.apiSignin}`, JSON.stringify(credential), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    return response;
};

export { login };