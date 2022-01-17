<template>
<div>
  Search Result
</div>
</template>

<script>
export default {
  name: 'SearchResult',
  data() {
    return {
      pageSize: 15,
      page: 1,
      keyWord: '',
    };
  },
  methods: {
    getPosts() {
      const { page, pageSize } = this;
      return new Promise((resolve, reject) => {
        const options = {
          url: 'https://avl-frontend-exam.herokuapp.com/api/users/all',
          method: 'GET',
          params: {
            page,
            pageSize,
          },
        };
        this.$axios(options).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
