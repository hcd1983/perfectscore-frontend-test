<template>
<div class="header">
  <div class="logo">LOGO</div>
</div>
</template>

<script>
export default {
  name: 'Header',
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
</style>
