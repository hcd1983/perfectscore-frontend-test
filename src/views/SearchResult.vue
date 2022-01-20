<template>
<div class="flex flex-col h-full px-5">
  <div class="max-w-725px w-full mx-auto">
    <h2
      class="text-white page-title relative cursor-pointer md:pl-1"
      @click="$router.go(-1)"
    >
      <span class="hidden md:flex absolute top-0 items-center h-full -left-9">
        <Icon type="arrow" />
      </span>
      Results
    </h2>
  </div>
  <div class="flex-1 overflow-y-scroll mt-6 pb-10 md:sticky md:top-0 ">
    <div class="grid gap-10 md:grid-cols-3 max-w-725px mx-auto">
      <div
        v-for="({image, title, author, id}, idx) in posts"
        :key="`post-${id}`"
        :ref="setPostsRef"
        class="opacity-30 transition-opacity duration-300"
      >
        <div class="image-container">
          <img
            :src="image"
            class="absolute w-full h-full inset-0 object-cover bg-gray-600"
            @load="handleImageOnLoad($event, idx)"
          />
        </div>
        <div class="text-white pt-5">
          <div class="post-title"> {{ title }}</div>
          <div class="post-subtitle">by {{ author }}</div>
        </div>
      </div>
      <template v-if="loading">
        <div v-for="({}, idx) in pageSize" :key="idx" class="placeholder animate-pulse">
          <div class="image-container bg-gray-700"/>
          <div class="text-white pt-5">
            <div class="post-title bg-gray-300 h-5 w-2/5 mb-1 rounded-sm" />
            <div class="post-subtitle bg-gray-600 h-4 w-1/5 rounded-sm" />
          </div>
        </div>
      </template>
    </div>
    <div class="max-w-725px mx-auto">
      <div v-if="page < totalPages" class="mt-10">
        <ButtonNormal @click="handleMore">More</ButtonNormal>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ButtonNormal from '../components/ButtonNormal.vue';
import Icon from '../components/Icon.vue';

export default {
  name: 'SearchResult',
  components: { Icon, ButtonNormal },
  data() {
    return {
      pageSize: 15,
      page: 1,
      keyword: null,
      posts: [],
      postsRef: [],
      loading: false,
      totalPages: 0,
    };
  },
  mounted() {
    this.pageSize = Number(this.$route.query.pageSize || this.pageSize);
    this.keyword = this.$route.query.keyword || null;
    this.getPosts();
  },
  beforeUpdate() {
    this.postsRef = [];
  },
  methods: {
    getPosts() {
      const { page, pageSize, keyword } = this;
      this.loading = true;
      return new Promise((resolve, reject) => {
        const options = {
          url: '/api/posts',
          method: 'GET',
          params: {
            page,
            pageSize,
            keyword,
          },
        };
        this.axios(options).then((res) => {
          resolve(res);
          this.loading = false;
          this.totalPages = res.data.totalPages;
          this.posts = [
            ...this.posts,
            ...res.data.data,
          ];
        }).catch((error) => {
          reject(error);
        });
      });
    },
    handleImageOnLoad(e, idx) {
      // e.target.style.opacity = 1;
      this.postsRef[idx].style.opacity = 1;
    },
    setPostsRef(el) {
      if (el) {
        this.postsRef.push(el);
      }
    },
    handleMore() {
      this.page += 1;
      this.getPosts();
    },
  },
};
</script>

<style scoped>
.image-container{
  @apply w-full h-0 relative;
  padding-top: 66.66%;
}
.post-title{
  @apply font-ubuntu;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 0.14px;
}
.post-subtitle {
  @apply text-xs;
  line-height: 1.5;
  color: #B2B2B2;
  letter-spacing: 0.37px;
}

</style>
