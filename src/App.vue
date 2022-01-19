<template>
  <div class="flex flex-col md:flex-row h-screen overflow-y-auto overflow-x-hidden">
    <Header />
    <div class="px-5 flex-1 py-5">
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
