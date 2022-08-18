<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import store from '@/store';
import router from '@/router';
import LoadingContent from '@/components/LoadingContent.vue';

const isLoadingPosts = ref(true);
const isLoadingError = ref(false);

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

const handlePostCardClick = (id: string) => {
  router.push({name: 'post', params: {id: id}})
}
</script>


<template>
  <ul v-if="!isLoadingPosts && store.getters.posts.length !== 0">
    <div class="card mb-4 is-clickable"
    v-for="post in store.getters.posts"
    :key="post.id"
    @click="handlePostCardClick(post.id)">
      <div class="card-content">
        <div class="media">
          <div class="media-content is-clipped">
            <p class="title is-size-4">
              {{post.title}}
            </p>
            <p class="subtitle is-size-6">
              submitted by {{store.getters.author(post).username}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </ul>
  <LoadingContent v-else :is-loading-error="isLoadingError"
  :error-message="'Error loading posts'" />
</template>

<style lang="scss" scoped>
.card {
  &:hover {
    filter: brightness(0.9);
  }
}
</style>