import { defineStore } from 'pinia';
import store from '../index';

// interface userInfo {
//   username: string,
//   password: string
// }

export const useInfoStore = defineStore({
  id: 'userInfo',
  state: () => {
    return {
      username: '',
      password: ''
    }
  },
  getters: {

  },
  actions: {

  }
}) 

 export function useuserInfoStoreWithOut() {
  return useInfoStore(store); //  使分仓库名正言顺
 }