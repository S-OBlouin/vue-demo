<template>
    <div class=" bg-yellow-600 h-10 flex ">
        <router-link to="/"><img src="@/assets/img/icon.png" alt="Home Icon" class=" h-10 " /></router-link>
        <div class=" flex flex-row-reverse ">
            <div class=" rounded bg-white py-1 px-2 my-4 mx-4 hover:bg-slate-800 hover:text-white transition hover:delay-75"
                @click="logOut">Log Out</div>
        </div>
    </div>
</template>

<script>

export default {
    name: "HeaderComponent",
    methods: {
        logOut () {
            localStorage.removeItem('Username')
            localStorage.removeItem('Company ID')
            localStorage.removeItem('Token')
            this.$router.push({ name: 'login' })
            console.log(localStorage)
        }
    }
}
</script>