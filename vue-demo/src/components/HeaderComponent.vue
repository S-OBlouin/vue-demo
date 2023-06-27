<template>
    <div class=" bg-yellow-600 flex justify-between h-16">
        <div class="flex justify-center items-center">
            <router-link to="/"><img src="@/assets/img/icon.png" alt="Home Icon" class=" h-14 ml-2" /></router-link>
            <p class="pl-4 font-bold text-xl">Kroton™ AML Platform</p>
        </div>
        <div class=" flex flex-row-reverse justify-center items-center">
            <img src="@/assets/img/logout.svg" alt="Logout Icon" @click="logOut" class="cursor-pointer" />
            <p class=" pr-2 font-bold text-xl">{{ userStore.username }}</p>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore'
export default {
    setup () {
        const userStore = useUserStore()
        return { userStore }
    },
    name: "HeaderComponent",
    methods: {
        logOut () {
            this.userStore.$reset()
            this.$router.push({ name: 'login' })
        }
    }
}
</script>