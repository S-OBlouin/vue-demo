<template>
  <div class=" bg-[url('@/assets/img/bg.jpg')] bg-cover">
    <div class=" flex w-screen h-screen justify-center">
      <form class="mt-40 h-72 w-80 flex-col flex bg-white shadow-xl items-center justify-center rounded">
        <div class=" text-3xl">H3M Log In</div>
        <div v-if="error" class=" text-red-600 mt-2"> {{ error }}</div>
        <select v-model="selected" class="mb-5 mt-5 px-1 w-52">
          <option disabled selected>Choose a bank</option>
          <option v-for="company in companies">{{ company.companyName }}</option>
        </select>
        <label>
          <input type="text" v-model="username" placeholder="Username"
            class="block flex-1 border border-gray-500 py-1.5 pl-1 bg-white mb-5 rounded">
        </label>
        <label>
          <input type="password" v-model="password" placeholder="Password"
            class="block flex-1 border border-gray-500 py-1.5 pl-1 bg-white mb-4 rounded">
        </label>
        <button @click.prevent="logIn" class=" bg-green-300 rounded w-20 text-center text-lg">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import APIDataServices from '@/services/APIDataServices.js'
import { useUserStore } from '@/stores/UserStore';
export default {
  name: "LoginView",

  setup () {
    const userStore = useUserStore()

    return { userStore }
  },
  data () {
    return {
      selected: ref(''),
      companies: [],
      username: ref(''),
      password: ref(''),
      companyId: ref(''),
      error: ref(''),
    }
  },
  async mounted () {
    try {
      const response = await APIDataServices.getCompanies();
      this.companies = response.data
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async logIn () {
      const comapnyFind = this.companies.find(company => company.companyName == this.selected)
      const company = JSON.parse(JSON.stringify(comapnyFind))
      this.companyId = company.companyId
      try {
        const response = await APIDataServices.login({
          username: this.username,
          password: this.password,
          companyid: this.companyId,
          companyname: this.selected,
          allsessionclose: true,
        })
        if (response.data.accessToken) {
          this.userStore.username = this.username
          this.userStore.companyId = this.companyId
          this.userStore.token = response.data.accessToken
          this.$router.push({ name: "home" })
        }
      } catch (error) {
        this.error = 'Your username or password is incorrect'
        console.error(error)
      }
    }
  }
} 
</script>