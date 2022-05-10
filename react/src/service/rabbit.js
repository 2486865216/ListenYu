import axios from "axios";
import {BASE_URl} from "./baseUrl";


export const initRabbit =() => {
    return axios.get(`${BASE_URl}/rabbit/init`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return error
        })
}
export const getRecommended =(queueId) => {
    return axios.get(`${BASE_URl}/rabbit/recommended/${queueId}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return error
        })
}