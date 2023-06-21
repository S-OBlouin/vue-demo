<template>
  <div class=" bg-[url('@/assets/img/bg.jpg')]">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
export default {
    components: { RouterView }
} 



</script>



