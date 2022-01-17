<template>
  <div>
    <div class="h2 text-white">Search</div>
    <Input v-model="keyWord" />
    <div class="h2 text-white"># of results per page</div>
    <div class="h2 text-white">{{ keyWord }}</div>
    <div>
      <span>30</span> <span>result</span>
    </div>
    <slider v-model:value="perPage" />
    <ButtonNormal>Search</ButtonNormal>
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
      perPage: 15,
      keyWord: '123',
    };
  },
};
</script>
