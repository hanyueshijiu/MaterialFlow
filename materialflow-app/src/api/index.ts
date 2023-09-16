import axios from 'axios'
// import  router  from '../router/index'
const BASE_URL = 'http://localhost:3000' // 使得代码维护更简单

export function post(url: string, body: any, params = {}) {
    return axios.post(BASE_URL + url, body, params)
}

export function get(url: string, params = {}) {
    return axios.get(BASE_URL + url, params)
}

// export default axios
