import config from '../config';

export const parsePayloadToFormData = (payload) => {
    var formData = new FormData();

    Object.keys(payload).forEach(function(key) {
        formData.append(key, payload[key]);
    });

    return formData;
}

export const parseUrlImage = (image) => {
    return `${config.url}${image}`;
}

export const getAnotherValueFromArray = (array, columnReturn, columnCheck, checkValue) => {
    let finded = array.find(item => item[columnCheck] === checkValue);
    return finded ? finded[columnReturn] : null;
}