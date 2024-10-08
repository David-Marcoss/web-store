import axios from "axios"

export const api = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 10000 
    })
}