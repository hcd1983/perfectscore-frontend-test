<template>
  <div>
    <div class="h2 text-white">Search</div>
    <Input v-model="keyWord" />
    <div class="h2 text-white"># of results per page</div>
    <div class="h2 text-white">{{ keyword }}</div>
    <div class="text-white">
      <span>30</span> <span>result</span>
    </div>
    <slider v-model:value="pageSize" />
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
    };
  },
  methods: {
    handleSubmit() {
      console.log('submit');
      this.$router.push({ name: 'search', query: { } });
    },
  },
};
</script>
