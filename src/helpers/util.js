export const parsePayloadToFormData = (payload) => {
    var formData = new FormData();

    Object.keys(payload).forEach(function(key) {
        formData.append(key, payload[key]);
    });

    return formData;
}