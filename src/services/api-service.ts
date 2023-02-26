import axios, {AxiosRequestConfig} from "axios";

const API_URL = process.env.API_URL || 'http://18.183.175.32:8080'
const reqInstance = axios.create({
    headers: {"content-type": "application/json"}
})

export class ApiService {
    static get(url: string, config?: AxiosRequestConfig) {
        return reqInstance.get(`${API_URL}/${url}`, config).then(res => res.data)
    }

    static post(url: string, payload: any, config?: AxiosRequestConfig) {
        return reqInstance.post(`${API_URL}/${url}`, payload, config).then(res => res.data)
    }

}