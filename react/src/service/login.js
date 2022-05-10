import axios from "axios";
import {BASE_URl} from "./baseUrl";

axios.defaults.withCredentials = true


export const getCode = () => {
    return axios.get(`${BASE_URl}/user/getVerifiCode`)
        .then(res => {
            return res
        })
        .catch(error => {
            return error;
        })
}
export const login = (value) => {
    return axios.post(`${BASE_URl}/user/login`, value)
        .then(res => {
            return res
        })
        .catch(error => {
            return error;
        })
}
export const getInfo = (token) => {
    return axios.get(`${BASE_URl}/user/getinfo`,
        {
            headers: {"token": token}
        }).then(res => {
            return res
        }).catch(error => {
            return error
        })
}
export const getDetailInfo = (username) => {
    return axios.get(`${BASE_URl}/user/getDetailInfo/${username}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
    })
}