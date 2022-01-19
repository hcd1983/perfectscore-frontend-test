<template>
<div class="user-list">
  <div class="grid grid-cols-2">
    <div class="tag" :class="{ active: tag === 'followers' }" @click="tag = 'followers'">
      Followers
    </div>
    <div class="tag" :class="{ active: tag === 'following' }" @click="tag = 'following'">
      Following
    </div>
  </div>
  <div class="pt-8 px-4 grid grid-cols-1 gap-4 text-white">
    <div v-if="!userData" class="text-white">Loading</div>
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
          :alt="name" @error="handleImageError($event, id)"
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
  </div>
</div>
</template>

<script>
import ButtonSmall from '@/components/ButtonSmall.vue';
import { users } from '../fakeData';

export default {
  name: 'Users',
  components: { ButtonSmall },
  data() {
    return {
      tag: 'followers',
      followersPage: 1,
      followers: null,
      following: null,
      users,
    };
  },
  watch: {
    tag: {
      immediate: true,
      handler(newVal) {
        if (newVal === 'followers') {
          this.fetchFollowers();
        } else {
          this.fetchFollowing();
        }
      },
    },
  },
  created() {
    // fetch('/api/users')
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log(json);
    //   });
  },
  computed: {
    userData() {
      return this.tag === 'followers' ? this.followers : this.following;
    },
  },
  methods: {
    async fetchFollowers() {
      console.log('fetchFollowers');
      const options = {
        url: '/api/users',
        method: 'GET',
        params: {
          page: 1,
          pageSize: 10,
        },
      };
      try {
        const { data } = await this.axios(options);
        this.followers = data;
      } catch (error) {
        // if I have time...
      }
    },
    async fetchFollowing() {
      const options = {
        url: '/api/users/friends',
        method: 'GET',
        params: {
          page: 1,
          pageSize: 10,
        },
      };
      try {
        const { data } = await this.axios(options);
        console.log('fff', data);
        this.following = data;
      } catch (error) {
        // if I have time...
      }
    },
    handleImageError(e, id) {
      e.target.src = `https://i.pravatar.cc/45?${id}`;
    },
  },
};
</script>

<style scoped>
.user-list {
  @apply h-screen overflow-y-scroll pt-8;
  width: 375px;
}
.tag {
  @apply font-ubuntu pb-2 font-normal text-center
  cursor-pointer border-b-2 border-transparent;
  color: #929292;
}
.tag.active {
  @apply text-white font-bold border-white;
}
</style>
