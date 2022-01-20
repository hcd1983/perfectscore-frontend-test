<template>
  <div class="flex flex-col md:flex-row h-screen overflow-y-auto overflow-x-hidden">
    <Header />
    <div class="flex-1 md:pt-24 overflow-hidden">
      <router-view v-slot="{ Component }">
        <keep-alive include="HomeView,Tags">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <router-view v-slot="{ Component }" name="users">
      <keep-alive include="HomeView">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Users from './views/Users.vue';

export default {
  components: { Users, Header },
};
</script>
