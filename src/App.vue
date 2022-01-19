<template>
  <div class="flex flex-col md:flex-row h-screen overflow-y-auto overflow-x-hidden">
    <Header />
    <div class="flex-1 md:pt-24">
      <router-view v-slot="{ Component, route }">
        <keep-alive include="HomeView">
          <component :is="Component" :pp="route" />
        </keep-alive>
      </router-view>
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
