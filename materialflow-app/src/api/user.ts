import { post } from './index'

// 注册接口
export function register(body:any) {
  return post('/users/registry',body).then( (res:any):any => res.data )
}
// 登录接口
export function login(body:any) {
  return post('/users/login',body).then( (res:any):any => res.data )
}