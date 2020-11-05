import axios from 'axios';
import config from '../config';
const { serverUrl, api } = config;

const login = async credential => {
    const response = axios.post(`${serverUrl}${api.apiSignin}`, JSON.stringify(credential), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    return response;
};

export { login };