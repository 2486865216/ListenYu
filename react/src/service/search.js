import axios from "axios";
import {BASE_URl} from "./baseUrl";

export const searchMusic = (value) => {
    return axios.get(`${BASE_URl}/main/search/${value}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return error
        })
}