import { defineStore } from 'pinia'

export const useUserStore = defineStore("userStore", {

    state: () =>{
        return{
            username: '',
            password: '',
            companyId: '',
            companyName: '',
            token: '',
            pageName: 'Home',
        }
    },
})