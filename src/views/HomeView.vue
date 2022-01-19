<template>
  <div class="h-full flex flex-col justify-between md:max-w-725px md:mx-auto md:w-full">
    <div class="px-5 md:px-0">
      <div class="h2 text-white">Search</div>
      <Input class="mt-4" placeholder="keyword" v-model="keyword" />
      <div class="h2 text-white mt-7"># of results per page</div>
      <div class="text-white mt-4">
        <span class="text-5xl mr-2.5 font-bold">{{ total }}</span> <span>result</span>
      </div>
      <slider class="mt-5" v-model:value="pageSize" />
    </div>
    <div class="flex-1 px-5 flex pb-6 md:pb-11 md:px-0">
      <ButtonNormal class="self-end w-full" @click="handleSubmit">Search</ButtonNormal>
    </div>
    <div class="nav flex items-center justify-center md:hidden">
        <router-link
          to="/"
          v-slot="{ isActive }"
          class="mr-50px"
        >
          <Icon type="paper" :active="isActive"  />
        </router-link>
        <router-link
          to="/tags"
          v-slot="{ isActive }"
        >
          <Icon type="paper" :active="isActive"  />
        </router-link>
    </div>
  </div>
</template>

<script>
import ButtonNormal from '@/components/ButtonNormal.vue';
import Input from '@/components/Input.vue';
import Slider from '@/components/Slider.vue';
import Icon from '../components/Icon.vue';

export default {
  name: 'HomeView',
  components: {
    Icon,
    ButtonNormal,
    Input,
    Slider,
  },
  data() {
    return {
      pageSize: 15,
      keyword: '',
      total: 30,
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      const { pageSize, keyword } = this;
      this.$router.push({
        name: 'search',
        query: {
          pageSize,
          keyword: keyword || null,
        },
      });
    },
  },
};
</script>
<style scoped>
.nav {
  height: 66px;
  background-color: rgba(0,0,0,.8);
}
</style>
