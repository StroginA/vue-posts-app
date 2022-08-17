<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import store from '@/store';
import router from '@/router';
import type { Post } from '@/types';
import LoadingContent from '@/components/LoadingContent.vue';

const isLoadingPost = ref(true);
const isLoadingError = ref(false);
const postId = ref(router.currentRoute.params.id);
const post: Post = ref(store.getters.post(postId.value))

onMounted(async () => {
    store.dispatch('fetchPostById', postId.value)
    .then(() => {
        isLoadingPost.value = false;
    })
    .catch(() => {
        isLoadingPost.value = false;
        isLoadingError.value = true;
    })
});

</script>


<template>
    <div class="media"
    v-if="!isLoadingPost && post">
        <div class="media-content">
            <div class="content">
                <h1 class="title">{{post.title}}</h1>
                <p>{{post.body}}</p>
            </div>
        </div>
    </div>
    <LoadingContent v-else :is-loading-error="isLoadingError"
    :error-message="'Error loading post'" />
</template>