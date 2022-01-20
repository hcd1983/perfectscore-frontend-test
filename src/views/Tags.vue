<template>
  <div class="flex flex-col h-full px-5">
    <div class="max-w-845px w-full mx-auto">
      <h2 class="text-white page-title relative">
        Tags
      </h2>
    </div>
    <div class="flex-1 overflow-y-scroll mt-6 pb-10 md:sticky md:top-0 ">
      <div class="grid gap-10 md:grid-cols-3 max-w-845px mx-auto">
        <div
          v-for="({id, name, count}) in tags"
          :key="`tag-${id}`"
          class="opacity-100 transition-opacity duration-300"
        >
          {{ name }} - {{ count }}
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
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tags',
  data() {
    return {
      pageSize: 15,
      page: 1,
      keyword: null,
      tags: [],
      loading: false,
      totalPages: 0,
    };
  },
  mounted() {
    this.getTags();
  },
  beforeUpdate() {
    this.postsRef = [];
  },
  methods: {
    getTags() {
      const { page, pageSize, keyword } = this;
      this.loading = true;
      return new Promise((resolve, reject) => {
        const options = {
          url: '/api/tags',
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
          this.tags = [
            ...this.tags,
            ...res.data.data,
          ];
        }).catch((error) => {
          reject(error);
        });
      });
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
