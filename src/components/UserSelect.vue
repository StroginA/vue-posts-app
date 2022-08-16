<script lang="ts" setup>
import store from '@/store';
import { onMounted, ref } from 'vue';

const isLoadingUsers = ref(true);
const isLoadingError = ref(false);

onMounted(async () => {
    store.dispatch('fetchUsers')
    .then(() => {
        isLoadingUsers.value = false;
    })
    .catch(() => {
        isLoadingUsers.value = false;
        isLoadingError.value = true;
    })
});

</script>

<template>
    <ul class="menu-list">
        <li>
            <router-link to="/">Show all posts</router-link>
        </li>
        <li>
            <!-- 
                If loading done and no error, display users/lack of users.
                Else display loading/error message as appropriate.
            -->
            <ul v-if="!isLoadingUsers && store.getters.users.length !== 0">
                <router-link v-for="user in store.getters.users"
                :key="user.id"
                to="/about">
                    {{user.username}}
                </router-link>
            </ul>
            <ul v-else>
                <span v-if="!isLoadingError"
                class="icon">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
                <p v-else class="has-text-danger">
                    Error loading users
                </p>
            </ul>
        </li>
    </ul>
</template>