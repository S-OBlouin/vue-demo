<template>
  <div class="flex">
    <NavComponent v-if="isLogin"/>
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import NavComponent from '@/components/NavComponent.vue';

export default {
  components: { RouterView, NavComponent },
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