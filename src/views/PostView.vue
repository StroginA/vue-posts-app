<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import store from '@/store';
import router from '@/router';
import type { Post, User } from '@/types';
import LoadingContent from '@/components/LoadingContent.vue';

const isLoadingPost = ref(true);
const isLoadingError = ref(false);
const isLoadingComments = ref(true);
const isLoadingCommentsError = ref(false);
const postId = ref(router.currentRoute.params.id);
const post: Ref<Post> = ref(store.getters.post(parseInt(postId.value)));
const author: Ref<User> = ref(store.getters.author(post.value));

// Submit comment form model
const commentEmail: Ref<string> = ref("");
const commentTitle: Ref<string> = ref("");
const commentBody: Ref<string> = ref("");

onMounted(async () => {
    store.dispatch('fetchPostById', postId.value)
    .then(() => {
        isLoadingPost.value = false;
    })
    .catch(() => {
        isLoadingPost.value = false;
        isLoadingError.value = true;
    });
    store.dispatch('fetchCommentsByPostId', postId.value)
    .then(() => {
        isLoadingComments.value = false;
    })
    .catch(() => {
        isLoadingComments.value = false;
        isLoadingCommentsError.value = true;
    });
});

const handlePostComment = () => {
      fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify({
            postId: postId.value,
            email: commentEmail.value,
            name: commentTitle.value,
            body: commentBody.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then(res => {
        if (res.ok) {
            console.log('Comment posted')
            commentTitle.value = "";
            commentBody.value = "";
        } else {
          throw new Error('Error loading comments')
        }
      })
      .catch(() => {

      })
}     

</script>


<template>
    <div class="tile is-ancestor"
    v-if="!isLoadingPost && post">
        <div class="tile is-parent is-vertical is-4">
            <aside class="tile is-child box"
            v-if="!isLoadingPost && author">
                <h1 class="title">Author</h1>
                <p class="subtitle">{{author.username}}</p>
                <div class="is-size-6 author-info">
                    <strong>Name:</strong>
                    <p>{{author.name}}</p>
                    <strong>Email:</strong>
                    <p>{{author.email}}</p>
                    <strong>Phone:</strong>
                    <p>{{author.phone}}</p>
                    <strong>Company:</strong>
                    <div>
                        <p>{{author.company.name}}</p>
                        <p class="is-size-7">{{author.company.catchPhrase}}</p>
                        <p class="is-size-7">{{author.company.bs}}</p>
                    </div>
                    <strong>Website:</strong>
                    <p>{{author.website}}</p>
                    <strong>Address:</strong><div>
                        <p>{{author.address.zipcode}}</p>
                        <p>{{author.address.city}}</p>
                        <p>{{author.address.street}}</p>
                        <p>{{author.address.suite}}</p>
                    </div>
                </div>
            </aside>
        </div>
        <div class="tile is-parent is-vertical">
            <section class="tile is-child box">
                <h1 class="title">{{post.title}}</h1>
                <article class="post-body">{{post.body}}</article>
            </section>
            <section class="tile is-child box">
                <h1 class="title">Comments</h1>
                <ul v-if="!isLoadingComments && store.getters.comments.length !== 0">
                    <content class="media"
                    v-for="comment in store.getters.comments"
                    :key="comment.id">
                        <div class="media-content">
                            <p class="subtitle is-size-5">{{comment.email}}</p>
                            <strong>{{comment.name}}</strong>
                            <p class="comment-body">{{comment.body}}</p>
                        </div>

                    </content>
                </ul>
                <LoadingContent v-else :is-loading-error="isLoadingCommentsError"
                :error-message="'Error loading comments'" />
            </section>
            <div class="tile is-child box">
                <h1 class="title">Leave a comment...</h1>
                <div class="field">
                    <label class="label" for="commentEmail">Email</label>
                    <div class="control">
                        <input class="input" type="text" id="commentEmail"
                        v-model="commentEmail"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label" for="commentTitle">Title</label>
                    <div class="control">
                        <input class="input" type="text" id="commentTitle"
                        v-model="commentTitle"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label" for="commentBody">Comment text</label>
                    <div class="control">
                        <textarea class="textarea" id="commentBody"
                        v-model="commentBody"></textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-primary"
                        :disabled="commentEmail.length===0 ||
                        commentTitle.length===0 ||
                        commentBody.length===0"
                        @click="handlePostComment">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LoadingContent v-else :is-loading-error="isLoadingError"
    :error-message="'Error loading post'" />
</template>

<style lang="scss">
.post-body {
    // Preserve whitespace in the post body
    white-space: pre;
}
.comment-body {
    white-space: pre;
    margin-top: 1rem;
    margin-left: 1rem;
}
.author-info {
    &>* {
        margin-bottom: 1rem;
    }
}
</style>