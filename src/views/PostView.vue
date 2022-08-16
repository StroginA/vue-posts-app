<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import store from '@/store';
import router from '@/router';

const isLoadingPosts = ref(true);
const isLoadingError = ref(false);
const routePath = ref(router.currentRoute.fullPath)

onMounted(async () => {
    store.dispatch('fetchPosts', router.currentRoute.query.userId)
    .then(() => {
        isLoadingPosts.value = false;
    })
    .catch(() => {
        isLoadingPosts.value = false;
        isLoadingError.value = true;
    })
});

watch(routePath, () => {
    isLoadingPosts.value = true;
    store.dispatch('fetchPosts', router.currentRoute.query.userId)
    .then(() => {
        isLoadingPosts.value = false;
    })
    .catch(() => {
        isLoadingPosts.value = false;
        isLoadingError.value = true;
    })
})

</script>

<template>
  <ul v-if="!isLoadingPosts && store.getters.posts.length !== 0">
    <div class="card mb-4"
    v-for="post in store.getters.posts"
    :key="post.id"
    to="/about">
      <div class="card-content">
        <div class="media">
          <div class="media-content is-clipped">
            <p class="title is-size-4">{{post.title}}</p>
            <p class="subtitle is-size-6">
              submitted by {{store.getters.author(post).username}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </ul>
  <ul v-else>
    <span v-if="!isLoadingError"
    class="icon">
      <i class="fas fa-spinner fa-pulse"></i>
    </span>
    <p v-else class="has-text-danger">
      Error loading posts
    </p>
  </ul>
</template>

<style lang="scss" scoped>
</style>