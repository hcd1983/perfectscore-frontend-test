<template>
<div class="header">
  <div class="md:hidden">
    <div v-if="$route.name === 'home'" class="logo">LOGO</div>
    <router-link v-else to="/" class="h2 text-white">
      <span class="inline-block mr-3">
        <Icon type="arrow" />
      </span>
      Home page
    </router-link>
  </div>
  <div class="flex items-center h-full flex-col hidden md:block">
    <div class="logo">LOGO</div>
    <router-link
      to="/"
      class="mt-10 flex flex-col items-center"
    >
      <Icon type="paper" :active="['home', 'search'].includes($route.name)" />
      <div
        class="text-white text-xs mt-0.5"
        :class="{invisible : !['home', 'search'].includes($route.name)}">
        Home
      </div>
    </router-link>
    <router-link
      to="/tags"
      v-slot="{ isActive }"
      class="mt-10 flex flex-col items-center"
    >
      <Icon type="paper" :active="isActive" />
      <div class="text-white text-xs mt-0.5" :class="{invisible : !isActive}">Tags</div>
    </router-link>
  </div>
</div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'Header',
  components: { Icon },
};
</script>

<style scoped>
.logo{
  @apply font-ubuntu font-bold inline-block;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height */
  letter-spacing: -0.05em;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(to right, #FFD25F, #FF5C01);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header{
  @apply flex justify-start px-5 items-center flex-shrink-0;
  height: 70px;
}

@screen md {
  .header {
    @apply h-full w-20 p-0 justify-center pt-9;
    background-color: #1B1B1B;
  }
}
</style>
