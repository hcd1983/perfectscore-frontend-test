<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
export default {
  name: 'Input',
  props: {
    modelValue: String,
  },
};
</script>

<style scoped>
input {
  @apply outline-none focus:outline-none
  bg-transparent w-full text-sm
  ;
  border: 3px solid rgba(255, 255, 255, .5);
  border-radius: 6px;
  padding: 20px 18px 19px;
  color: rgba(255, 255, 255, .3);
}

input::placeholder{
  color: rgba(255, 255, 255, .3);
}
input:focus{
  @apply text-white;
  border-color: #FF9B33;
}
</style>
