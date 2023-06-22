<template>
  <div class=" bg-[url('@/assets/img/bg.jpg')] bg-cover">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
export default {
  components: { RouterView }
}



</script>



