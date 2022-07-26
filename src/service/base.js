/* 封装axios */

import axios from 'axios'
const ERR_OK = 0
const baseURL = 'http://localhost:9002'

axios.defaults.baseURL = baseURL

export function get(url, params) {
    // debugger

    // console.log('params', params)
    return axios
        .get(url, {
            params,
        })
        .then(res => {
            const serverData = res.data
            if (serverData.code === ERR_OK) {
                return serverData.result
            }
        })
        .catch(e => console.log(e))
}
