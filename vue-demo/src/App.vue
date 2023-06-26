<template>
  <div v-if="isLogin">
    <HeaderComponent />
  </div>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  components: { RouterView, HeaderComponent },
  data () {
    return {
      routeName: ''
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