<template>
  <div class=" bg-gray-400 ">
    <div class=" flex w-screen h-screen items-center justify-center">
      <form class="mt-4 h-60 flex-row">
        <select v-model="selected">
          <option disabled selected>Choose a bank</option>
          <option v-for="company in companies">{{ company }}</option>
        </select>
        <label>
          <input type="text" v-model="username" placeholder="Username">
        </label>
        <label>
          <input type="text" v-model="password" placeholder="Password">
        </label>
        <button @click="logIn">Log In</button>
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
      companies: [1, 2, 3],
      username: ref(''),
      password: ref(''),
    }
  },
  logIn () {
    console.log('allo')
  }
}

</script>



