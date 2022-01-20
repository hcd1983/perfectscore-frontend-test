<template>
  <div ref="tags" class="flex flex-col h-full">
    <div class="max-w-846px w-full mx-auto px-6">
      <h2 class="text-white page-title relative">
        Tags
      </h2>
    </div>
    <div class="flex-1 overflow-y-scroll mt-6 pb-10 px-6 md:sticky md:top-0" ref="tagContent">
      <div
        class="tags-container max-w-846px mx-auto flex flex-wrap gap-x-6 gap-y-9 justify-between"
      >
        <div
          v-for="({id, name, count}, idx) in tags"
          :key="`tag-${id}`"
          class="tag transition-opacity duration-500 ease-in opacity-0"
          :style="{
            'transition-delay' : `${100 * (idx % pageSize) + 1}ms`
          }"
        >
          <div class="w-150px h-150px relative rounded-10px overflow-x-hidden px-2.5 py-3.5 flex">
            <div class="absolute inset-0 bg-white opacity-6" />
            <div
              class="text-white border-4 border-white
              rounded-lg self-end py-1 px-2.5 text-2xl max-w-full truncate"
            >
              {{ name }}
            </div>
          </div>
          <div class="mt-2.5 w-150px">
            <div class="text-white truncate">{{ name }}</div>
            <div class="text-tag-gray text-xs">{{ count }} Results</div>
          </div>
        </div>
        <template v-if="loading">
          <div
            v-for="({}, idx) in pageSize"
            :key="`placeholder-${idx}`"
            class="animate-pulse"
          >
            <div class="w-150px h-150px relative rounded-10px overflow-x-hidden px-2.5 py-3.5 flex">
              <div class="absolute inset-0 bg-white opacity-10" />
            </div>
            <div class="mt-2.5 w-150px">
              <div class="text-white text-sm truncate h-6 bg-white w-2/3 opacity-30 rounded-md" />
              <div class="bg-tag-gray w-1/3 h-5 mt-1 opacity-30 rounded-md"></div>
            </div>
          </div>
        </template>
      </div>
      <div
        ref="trigger"
        class="text-white text-lg text-center animate-pulse"
      >
        {{ loading ? 'Loading...' : '' }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tags',
  data() {
    return {
      pageSize: 12,
      page: 1,
      keyword: null,
      tags: [],
      loading: false,
      totalPages: 0,
    };
  },
  mounted() {
    const { tagContent } = this.$refs;
    this.getTags().then(() => {
      tagContent.addEventListener('scroll', this.handleScroll);
    });
  },
  beforeUnmount() {
    const { tagContent } = this.$refs;
    tagContent.removeEventListener('scroll', this.handleScroll);
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
          this.handleTagLoad();
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
      if (this.page >= this.totalPages) return;
      this.page += 1;
      this.getTags();
    },
    handleTagLoad() {
      this.$nextTick(() => {
        const el = this.$refs.tags;
        const tags = el.querySelectorAll('.tag');
        setTimeout(() => {
          for (let i = 0; i < tags.length; i += 1) {
            tags[i].style.opacity = 1;
          }
        }, 100);
      });
    },
    handleScroll() {
      if (this.loading) return;
      const { trigger } = this.$refs;
      if (trigger.getBoundingClientRect().top <= window.innerHeight) {
        this.handleMore();
      }
    },
  },
};
</script>

<style scoped>
.tags-container:after{
  @apply flex-auto;
  content: "";
}
.opacity-6 {
  opacity: .06;
}

.rounded-10px {
  border-radius: 10px;
}

</style>
