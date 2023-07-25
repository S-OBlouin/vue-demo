<template>
  <div class="flex">
    <NavComponent v-if="isLogin" class=" z-10"/>
    <div class="flex flex-grow flex-col">
      <HeaderComponent v-if="isLogin"/>
      <RouterView class="bg-gray-300"/>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue'
import NavComponent from '@/components/NavComponent.vue';

export default {
  components: { RouterView, NavComponent, HeaderComponent },
  data () {
    return {
      routeName: null
    }
  },

  computed: {
    isLogin () {
      const routeName = this.$route.name
      return !routeName.includes('login')
    }
  },
}
</script>