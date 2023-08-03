<template>
    <div class="flex flex-col flex-grow">
        <!-- <HeaderComponent /> -->

        <div class=" flex flex-col items-center justify-center flex-grow">
            <h1 class="text-5xl text-decoration-line: underline bg-white rounded px-1 pb-1">
                Role : {{ roleName[0] }}</h1>
            <button class=" py-1 px-2 rounded text-center text-lg bg-fuchsia-800 text-white mt-2"
                @click="press">Click</button>
        </div>
    </div>
</template>



<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import APIDataServices from '@/services/APIDataServices.js'
import { useUserStore } from '@/stores/UserStore';
import { ref } from 'vue';

export default {
    components: { HeaderComponent },
    name: "HomeView",
    setup () {
        const userStore = useUserStore()

        return { userStore }
    },
    data () {
        return {
            roleName: ref(''),
        }
    },
    methods: {
        async press () {
            let response = await APIDataServices.getRoles(this.userStore.token)
            const role = JSON.parse(JSON.stringify(response))
            this.roleName = role.data
            console.log(this.userStore.token)
        },
    }
}
    // get roles with the API
</script>