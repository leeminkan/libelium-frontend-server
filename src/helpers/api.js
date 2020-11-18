import axios from 'axios';
import config from '../config';
import * as util from './util';

const { serverUrl, api } = config;

const apiGetDevices = () => {
    const token = localStorage.getItem('token');
    const response = axios.get(`${serverUrl}${api.apiGetDevices}?order_by=created_at&order=desc&per_page=4`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiGetDeviceInfo = (id) => {
    const token = localStorage.getItem('token');
    const response = axios.get(`${serverUrl}${api.apiGetDevices}/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiUpdateDeviceInfo = (id, data) => {
    const formData = util.parsePayloadToFormData(data);
    const token = localStorage.getItem('token');
    const response = axios.post(`${serverUrl}${api.apiGetDevices}/${id}`, formData, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiSensors = (pagination, sort, filter) => {
    const token = localStorage.getItem('token');
    let apiQuery = `${serverUrl}${api.apiGetSensors}`;
    if (pagination) {
        let page = pagination.page ? pagination.page : 1;
        apiQuery += `?page=${page}&per_page=${pagination.per_page}`;
    }

    if (sort) {
        apiQuery += apiQuery.includes("?") ? '&' : '?';
        apiQuery += `order_by=${sort.order_by}&order=${sort.order}`;
    }

    let queryFilter = {match:"and",rules:[]};

    Object.keys(filter).forEach(function(key) {
        if (filter[key].value !== "") {
            queryFilter.rules.push({
                field: key, 
                operator: "like",
                value: `%${filter[key].value}%`
            });
        }
    });

    if (queryFilter.rules.length > 0) {
        apiQuery += "&filters=" + JSON.stringify(queryFilter);
    }

    const response = axios.get(apiQuery, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiGetSensorInfo = (id) => {
    const token = localStorage.getItem('token');
    const response = axios.get(`${serverUrl}${api.apiGetSensors}/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiUpdateSensorInfo = (id, data) => {
    const token = localStorage.getItem('token');
    const response = axios.put(`${serverUrl}${api.apiGetSensors}/${id}`, JSON.stringify(data), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiDevices = (pagination, sort, filter) => {
    const token = localStorage.getItem('token');
    let apiQuery = `${serverUrl}${api.apiGetDevices}`;
    if (pagination) {
        let page = pagination.page ? pagination.page : 1;
        apiQuery += `?page=${page}&per_page=${pagination.per_page}`;
    }

    if (sort) {
        apiQuery += apiQuery.includes("?") ? '&' : '?';
        apiQuery += `order_by=${sort.order_by}&order=${sort.order}`;
    }

    let queryFilter = {match:"and",rules:[]};

    Object.keys(filter).forEach(function(key) {
        if (filter[key].value !== "") {
            queryFilter.rules.push({
                field: key, 
                operator: "like",
                value: `%${filter[key].value}%`
            });
        }
    });

    if (queryFilter.rules.length > 0) {
        apiQuery += "&filters=" + JSON.stringify(queryFilter);
    }

    const response = axios.get(apiQuery, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiDataCollections = (pagination, sort, filter) => {
    const token = localStorage.getItem('token');
    let apiQuery = `${serverUrl}${api.apiDataCollections}`;
    if (pagination) {
        let page = pagination.page ? pagination.page : 1;
        apiQuery += `?page=${page}&per_page=${pagination.per_page}`;
    }

    if (sort) {
        apiQuery += apiQuery.includes("?") ? '&' : '?';
        apiQuery += `order_by=${sort.order_by}&order=${sort.order}`;
    }

    let queryFilter = {match:"and",rules:[]};

    Object.keys(filter).forEach(function(key) {
        if (filter[key].value !== "") {
            queryFilter.rules.push({
                field: key, 
                operator: "like",
                value: `%${filter[key].value}%`
            });
        }
    });

    if (queryFilter.rules.length > 0) {
        apiQuery += "&filters=" + JSON.stringify(queryFilter);
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
    const response = axios.get(`${serverUrl}${api.apiSetting}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    return response;
}

const apiUpdateSetting = (data) => {
    const token = localStorage.getItem('token');
    const response = axios.put(`${serverUrl}${api.apiSetting}`, JSON.stringify(data), {
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
    let apiQuery = `${serverUrl}${api.apiDataCollections}/get-by-waspmote-id/1?type=temperature`;
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

export { apiGetDevices, apiDataCollections, apiSetting, apiUpdateSetting, apiGetTemperature, apiDevices, apiGetDeviceInfo, apiUpdateDeviceInfo, apiSensors, apiGetSensorInfo, apiUpdateSensorInfo };