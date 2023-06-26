<template>
    <div class="flex flex-col w-screen h-screen">

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
    }
}
    // get roles with the API
</script>