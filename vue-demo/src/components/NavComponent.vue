<template>
    <nav class="flex flex-col bg-yellow-500 px-2 pt-2 transition-all delay-100" :class="isOpen ? 'w-56 ' : 'w-32'">
        <div class="flex justify-center items-center">
            <router-link to="/"><img src="@/assets/img/icon.png" alt="Home Icon" class=" h-14 ml-2" /></router-link>
        </div>
        <div class="flex flex-row justify-between">
            <p class="px-4 py-3 mt-3 font-semibold">Menu</p>
            <p class="material-symbols-outlined pr-2 py-3 mt-3 cursor-pointer" @click="closeMenu">menu</p>
        </div>
        <div v-for="button in buttons">
            <div v-if="button == 19" class=" px-4 py-3 mt-4"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                <router-link to="#"
                    :class="isOpen ? '' : ' rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">Know
                    Your Customer</router-link>
            </div>
            <div v-if="button == 1 || button == 16" class=" px-4 py-3 mt-4"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                <router-link to="#"
                    :class="isOpen ? '' : ' rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">Active
                    Learner</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'
import APIDataServices from '@/services/APIDataServices.js'
export default {
    setup () {
        const userStore = useUserStore()
        return { userStore }
    },
    data () {
        return {
            buttons: [],
            buttonVisibility: [],
            isOpen: ref(true)
        }
    },
    async mounted () {
        try {
            if (this.userStore.token) {
                const response = await APIDataServices.getButtonVisibility(this.userStore.token)
                this.buttons = JSON.parse(JSON.stringify(response.data))
                console.log(this.buttons)
            }
        } catch (error) {
            console.error(error)
        }
    },
    computed () {

    },
    methods: {
        closeMenu () {
            this.isOpen = !this.isOpen
            console.log(this.isOpen)
        }
    }
}
</script>