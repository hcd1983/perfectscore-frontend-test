<template>
<div class="hidden 2xl:block">
  <div class="user-list" ref="sideBar">
    <div class="bg-dark sticky top-0 z-10 pt-8">
      <div class="grid grid-cols-2">
        <div class="tag" :class="{ active: tag === 'followers' }" @click="tag = 'followers'">
          Followers
        </div>
        <div class="tag" :class="{ active: tag === 'following' }" @click="tag = 'following'">
          Following
        </div>
      </div>
    </div>
    <UserList
      v-if="tag === 'followers'"
      ref="followersRef"
      :user-data="followers"
      :loading="loading"
    />
    <UserList
      v-if="tag === 'following'"
      ref="followingRef"
      :user-data="following"
      :loading="loading"
    />
  </div>
</div>
</template>

<script>
import { users } from '../fakeData';
import UserList from '../components/UserList.vue';

export default {
  name: 'Users',
  components: { UserList },
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
      if (this.loading) return;
      const { trigger } = this.tag === 'followers' ? this.$refs.followersRef.$refs : this.$refs.followingRef.$refs;
      if (trigger.getBoundingClientRect().top <= window.innerHeight) {
        const triggerFunction = this.tag === 'followers' ? this.getMoreFollowers : this.getMoreFollowing;
        triggerFunction();
      }
    },
  },
};
</script>

<style scoped>
.user-list {
  @apply h-screen overflow-y-scroll;
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
