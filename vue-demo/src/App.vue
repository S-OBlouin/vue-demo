<template>
  <div class="flex">
    <NavComponent v-if="isLogin"/>
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';
import NavComponent from '@/components/NavComponent.vue';

export default {
  components: { RouterView, HeaderComponent, NavComponent },
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