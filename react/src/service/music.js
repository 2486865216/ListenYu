import axios from 'axios';
import {BASE_URl} from "./baseUrl";



export const uploadMusic = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    return axios.post(`${BASE_URl}/main/upload`, formData)
        .then(res => {
            return res;
        })
        .catch(error => {
            return error;
        })
}
export const getMusic = () => {
    return axios.get(`${BASE_URl}/main/music`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error
        })
}