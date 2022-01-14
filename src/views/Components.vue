<template>
<div class="max-w-2xl mx-auto">
  <h1 class="text-white">Component</h1>
  <h2 class="text-white">Button</h2>
  <div>
    <ButtonNormal>Button</ButtonNormal>
  </div>
  <div>
    <ButtonSmall>Button</ButtonSmall>
    <ButtonSmall type="contained">Button</ButtonSmall>
  </div>
  <div>
    <Input placeholder="keyword" />
  </div>
  <div class="mt-10">
    <Slider />
  </div>
</div>
</template>

<script>
import ButtonNormal from '../components/ButtonNormal.vue';
import ButtonSmall from '../components/ButtonSmall.vue';
import Input from '../components/Input.vue';
import Slider from '../components/Slider.vue';

export default {
  name: 'Components',
  components: {
    ButtonNormal, ButtonSmall, Input, Slider,
  },
};
</script>

<style scoped>

</style>
