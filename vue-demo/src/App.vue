<template>
  <div class=" bg-gray-400 ">
    <div class=" flex w-screen h-screen justify-center">
      <form class="mt-40 h-52 w-56 flex-col flex bg-white shadow-xl items-center justify-center">
        <div>KROTON AML Log In</div>
        <select v-model="selected" class="mb-3 mt-3 px-1 ">
          <option disabled selected>Choose a bank</option>
          <option v-for="company in companies">{{ company }}</option>
        </select>
        <label>
          <input type="text" v-model="username" placeholder="Username"
            class="block flex-1 border border-gray-500 py-1.5 pl-1 bg-white mb-3 rounded">
        </label>
        <label>
          <input type="text" v-model="password" placeholder="Password"
            class="block flex-1 border border-gray-500 py-1.5 pl-1 bg-white mb-3 rounded">
        </label>
        <button @click.prevent="logIn" class=" bg-green-300 rounded w-20 text-center">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  data () {
    return {
      selected: ref(''),
      companies: ['Bank of ABC', 'Real Bank', 'CIBS'],
      username: ref(''),
      password: ref(''),
    }
  },
  methods: {
    logIn () {
      console.log(this.username)
    }
  }
}

</script>



