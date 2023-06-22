<template>
    <div class="w-screen h-screen">
        <div class=" flex flex-row-reverse ">
            <div class=" rounded bg-white py-1 px-2 my-4 mx-4 hover:bg-slate-800 hover:text-white transition hover:delay-75"
                @click="logOut">Log
                Out</div>
        </div>
        <div class=" flex flex-col items-center justify-center h-[850px]">
            <h1 class="text-5xl text-decoration-line: underline bg-white rounded px-1 pb-1">
                Role : {{ roleName[0] }}</h1>
            <button class=" py-1 px-2 rounded text-center text-lg bg-fuchsia-800 text-white mt-2"
                @click="press">Click</button>
        </div>
    </div>
</template>



<script>
import APIDataServices from '@/services/APIDataServices.js'
import { ref } from 'vue';

export default {
    name: "HomeView",
    data () {
        return {
            roleName: ref(''),
        }
    },
    methods: {
        async press () {
            let response = await APIDataServices.getRoles(localStorage.getItem('Token'))
            const role = JSON.parse(JSON.stringify(response))
            this.roleName = role.data
        },
        logOut () {
            localStorage.removeItem('Username')
            localStorage.removeItem('Company ID')
            localStorage.removeItem('Token')
            this.$router.push({ name: 'login' })
            console.log(localStorage)
        }
    }
}
    // get roles with the API
</script>