<template>
<div :class="{'contained' : type === 'contained' }">
  <slot />
</div>
</template>

<script>
export default {
  name: 'ButtonSmall',
  props: {
    type: {
      type: String,
      default() {
        return 'outline';
      },
    },
  },
};
</script>
<style scoped>
div {
  @apply bg-transparent flex items-center justify-center w-max cursor-pointer
  font-open-sans font-semibold text-sm text-white font-bold
  border-solid border-white border rounded-full
  hover:bg-white hover:text-dark;
  padding: 8px 10px;
}

div.contained {
  @apply bg-white text-dark
  hover:bg-transparent hover:text-white;
  padding: 6px;
}

div.contained:hover {
  padding: 8px 10px;
}
</style>
