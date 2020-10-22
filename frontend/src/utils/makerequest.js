import axios from 'axios';
const httpTimeout = 2000;
export const makeRequest = async (url, method, data, token = null) => {
    let header = {};
    let result = null;

    if (token) {
        header = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json; multipart/form-data',
        };
    }
    const api = axios.create({
        baseURL: 'http://localhost:5000/productCategory/',
        timeout: httpTimeout,
        headers: header
    });

    if (method.toLowerCase() === 'get') {
        await api
            .get(url, data)
            .then(res => {
                result = res;
            })
            .catch(err => {
                console.log(err, "get");
            });
    }

    if (method.toLowerCase() === 'post') {
        await api
            .post(url, data, {
                onUploadProgress: progressEvent => {
                    console.log('upload progress:' + Math.round((progressEvent.loaded/progressEvent.total) *100)+"%")
                }
            })
            .then(res => {
                result = res;
            })
            .catch(err => {
                console.log(err, 'post');
            });
    }

    if (method.toLowerCase() === 'put') {
        await api
            .put(url, data)
            .then(res => {
                result = res;
            })
            .catch(err => {
                console.log(err, 'put');
            });
    }

    if (method.toLowerCase() === 'delete') {
        await api
            .delete(url, data)
            .then(res => {
                result = res;
            })
            .catch(err => {
                console.log(err, 'delete');
            });
    }

    if (result != null) {
        return result;
    }
};