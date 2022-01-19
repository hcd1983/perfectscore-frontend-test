<template>
  <div>
    <div class="h2 text-white">Search</div>
    <Input class="mt-4" placeholder="keyword" v-model="keyword" />
    <div class="h2 text-white mt-7"># of results per page</div>
    <div class="text-white mt-4">
      <span class="text-5xl mr-2.5 font-bold">{{ total }}</span> <span>result</span>
    </div>
    <slider class="mt-5" v-model:value="pageSize" />
    <ButtonNormal @click="handleSubmit">Search</ButtonNormal>
  </div>
</template>

<script>
import ButtonNormal from '@/components/ButtonNormal.vue';
import Input from '@/components/Input.vue';
import Slider from '@/components/Slider.vue';

export default {
  name: 'HomeView',
  components: {
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
      this.$router.push({ name: 'search', query: { pageSize, keyword } });
    },
  },
};
</script>
