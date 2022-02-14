<template>
<button>
  <slot />
</button>
</template>

<script>
export default {
  name: 'ButtonNormal',
};
</script>
<style scoped>
button {
  @apply text-sm bg-white text-dark flex items-center block
  justify-center bg-white uppercase font-bold cursor-pointer
  border-solid border-white border
  hover:bg-transparent hover:text-white;
  padding: 11px 14px;
  border-radius: 4px;
  max-width: 345px;
}
</style>
