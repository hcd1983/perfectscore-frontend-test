<template>
  <div class="flex">
    <Header />
    <div class="px-5 flex-1">
      <router-view/>
    </div>
    <div class="hidden 2xl:block">
      <Users />
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Users from './components/Users.vue';

export default {
  components: { Users, Header },
};
</script>
