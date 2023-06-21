<template>
    <div class=" flex w-screen h-screen justify-center">
        <h1 class="text-5xl text-yellow-500 text-decoration-line: underline">Hi</h1>
        <button class=" py-1 px-2 rounded text-center text-lg bg-fuchsia-800 text-white" @click="press">Click</button>
    </div>
</template>



<script>
import APIDataServices from '@/services/APIDataServices.js'
import { ref } from 'vue';

    export default {
        name: "HomeView",
        data(){
            return {
                role: ref(''),
            }
        },
        methods: {
            async press(){
                const response = await APIDataServices.getRoles(localStorage.getItem('Token'))
                const role = JSON.parse(JSON.stringify(response))
                console.log(role)
            }
        }
    }
    // get roles with the API
</script>