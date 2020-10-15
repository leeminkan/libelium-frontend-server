import axios from 'axios';

const host = {
    apiUrl: "http://localhost:8000/api"
};

const api = {
    apiGetDevices:"/devices",
    apiDataCollections:"/data-collections",
    apiSetting:"/settings",
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

const apiDataCollections = (pagination) => {
    const token = localStorage.getItem('token');
    let apiQuery = `${host.apiUrl}${api.apiDataCollections}`;
    if (pagination) {
        let page = pagination.page ? pagination.page : 1;
        apiQuery += `?page=${page}&per_page=${pagination.per_page}`;
    }

    const response = axios.get(apiQuery, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiSetting = () => {
    const token = localStorage.getItem('token');
    const response = axios.get(`${host.apiUrl}${api.apiSetting}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiUpdateSetting = (data) => {
    const token = localStorage.getItem('token');
    const response = axios.put(`${host.apiUrl}${api.apiSetting}`, JSON.stringify(data), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiGetTemperature = (pagination) => {
    const token = localStorage.getItem('token');
    let apiQuery = `${host.apiUrl}${api.apiDataCollections}/get-by-waspmote-id/1?type=temperature`;
    if (pagination) {
        let page = pagination.page ? pagination.page : 1;
        apiQuery += `&page=${page}&per_page=${pagination.per_page}`;
    }

    const response = axios.get(apiQuery, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

export { apiGetDevices, apiDataCollections, apiSetting, apiUpdateSetting, apiGetTemperature };