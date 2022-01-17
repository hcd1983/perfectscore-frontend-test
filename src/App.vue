<template>
  <Header />
  <div class="px-5">
    <router-view/>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';

export default {
  components: { Header },
};
</script>
