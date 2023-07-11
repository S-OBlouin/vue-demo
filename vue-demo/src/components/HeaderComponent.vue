<template>
    <div class=" bg-yellow-600 flex justify-between h-16 flex-row-reverse">
        <div class="flex justify-center items-center absolute left-60 h-16">
            <p class=" pr-2 font-bold text-xl">{{ userStore.pageName }}</p>
        </div>
        <div class=" flex justify-center items-center absolute right-0 h-16">
            <p class=" pr-2 font-bold text-xl">{{ userStore.username }}</p>
            <img src="@/assets/img/logout.svg" alt="Logout Icon" @click="logOff" class="cursor-pointer" />
        </div>
        <div></div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'
import APIDataServices from '@/services/APIDataServices.js'
export default {
    setup () {
        const userStore = useUserStore()

        return { userStore }
    },
    name: "HeaderComponent",
    methods: {
        async logOff () {
            // const res =  await APIDataServices.logoff({
            //     username: this.userStore.username,
            //     password: this.userStore.password,
            //     companyName: this.userStore.companyName,
            //     companyId: this.userStore.companyId,
            //     allsessionclose: false
            // })
            this.userStore.$reset()
            this.$router.push({ name: 'login' })
        }
    }
}
</script>