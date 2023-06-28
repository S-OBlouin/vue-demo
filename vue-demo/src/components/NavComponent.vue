<template>
    <nav class="flex flex-col bg-yellow-500 px-2 pt-2 transition-all delay-100" :class="isOpen ? 'w-56 ' : 'w-32'">
        <div class="flex justify-center items-center">
            <router-link to="/"><img src="@/assets/img/icon.png" alt="Home Icon" class=" h-14 ml-2" /></router-link>
        </div>
        <div class="flex flex-row justify-between">
            <p class="px-4 py-3 mt-3 font-semibold">Menu</p>
            <p class="material-symbols-outlined pr-2 py-3 mt-3 cursor-pointer" @click="closeMenu">menu</p>
        </div>
        <div v-for="button in buttons" class=" px-4 py-3 mt-4" :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center'">
            <router-link to="#" :class="isOpen ? '' : ' rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">Scan</router-link>
        </div>
    </nav>
</template>

<script>
    import { useUserStore } from '@/stores/UserStore'
    import { ref } from 'vue'
    export default{
        setup(){
            const userStore = useUserStore()
            return { userStore }
        },
        data(){
            return{
                buttons: [1, 2, 3, 4],
                isOpen: ref(true)
            }
        },
        methods:{
            closeMenu(){
                this.isOpen = !this.isOpen
                console.log(this.isOpen)
            }
        }
    }
</script>