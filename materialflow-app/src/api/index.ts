import axios from 'axios'
// import  router  from '../router/index'
const BASE_URL = 'http://localhost:3000' // 使得代码维护更简单

// //请求拦截
// axios.interceptors.request.use((config:any) => {

// })

// // 响应拦截
// axios.interceptors.response.use(

// )

export function post(url:string,body:any) {
  return axios.post(BASE_URL+url,body)
}

export function get(url:string) {
  return axios.get(BASE_URL+url)
}



// export default axios
