<template>
  <div class="pt-8 px-4 grid grid-cols-1 gap-4 text-white pb-10">
    <div v-if="!userData" class="text-white">Loading...</div>
    <div
      v-else
      v-for="{ id, name, username, avatar, isFollowing } in userData.data"
      :key="`followers-${id}`"
      class="py-0.5 flex items-center"
    >
      <div class="w-10 h-10 border-light-gray border rounded-md overflow-hidden">
        <img
          class="object-cover w-full h-full"
          :src="avatar"
        />
      </div>
      <div class="text-white ml-4 flex-1">
        <div>{{ name }}</div>
        <div class="opacity-50 text-sm">@{{ username }}</div>
      </div>
      <div>
        <ButtonSmall v-if="!isFollowing">Follow</ButtonSmall>
        <ButtonSmall v-else type="contained">Following</ButtonSmall>
      </div>
    </div>
    <div
      ref="trigger"
      class="text-white text-lg text-center animate-pulse"
    >
      {{ loading ? 'Loading...' : '' }}
    </div>
  </div>
</template>

<script>
import ButtonSmall from './ButtonSmall.vue';

export default {
  components: { ButtonSmall },
  name: 'UserList',
  props: {
    userData: Object,
    loading: Boolean,
  },
};
</script>

<style scoped>

</style>
