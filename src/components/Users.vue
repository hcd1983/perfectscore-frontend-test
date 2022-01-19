<template>
<div class="user-list" ref="sideBar">
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
    <div
      ref="trigger"
      class="w-full text-white"
    >
      {{ loading ? 'Loading...' : '' }}
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
      pageSize: 15,
      followers: null,
      following: null,
      followersPage: 1,
      followingPage: 1,
      loading: false,
      users,
    };
  },
  mounted() {
    const { sideBar } = this.$refs;
    Promise.all([this.getFollowers(1), this.getFollowing(1)]).then(([followers, following]) => {
      this.followers = followers.data;
      this.following = following.data;
      sideBar.addEventListener('scroll', this.handleScroll);
    });
  },
  beforeUnmount() {
    const { sideBar } = this.$refs;
    sideBar.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    userData() {
      return this.tag === 'followers'
        ? {
          ...this.followers,
          page: this.followersPage,
        } : {
          ...this.following,
          page: this.followingPage,
        };
    },
  },
  methods: {
    getFollowers(page) {
      return new Promise((resolve, reject) => {
        const options = {
          url: '/api/users',
          method: 'GET',
          params: {
            page,
            pageSize: this.pageSize,
          },
        };
        this.axios(options).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    getMoreFollowers() {
      if (this.followersPage >= this.followers.totalPages) return;
      this.followersPage += 1;
      this.loading = true;
      this.getFollowers(this.followersPage).then(({ data }) => {
        this.loading = false;
        this.followers = {
          ...data,
          data: [...this.followers.data, ...data.data],
        };
      });
    },
    getFollowing(page) {
      return new Promise((resolve, reject) => {
        const options = {
          url: '/api/users/friends',
          method: 'GET',
          params: {
            page,
            pageSize: this.pageSize,
          },
        };
        this.axios(options).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    getMoreFollowing() {
      if (this.followingPage >= this.followers.totalPages) return;
      this.followingPage += 1;
      this.loading = true;
      this.getFollowing(this.followingPage).then(({ data }) => {
        this.loading = false;
        this.following = {
          ...data,
          data: [...this.following.data, ...data.data],
        };
      });
    },
    handleScroll() {
      const { trigger } = this.$refs;
      if (trigger.getBoundingClientRect().top <= window.innerHeight) {
        const triggerFunction = this.tag === 'followers' ? this.getMoreFollowers : this.getMoreFollowing;
        triggerFunction();
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
