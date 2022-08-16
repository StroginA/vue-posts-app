<script lang="ts" setup>
import store from '@/store';
import { onMounted } from 'vue';


onMounted(async () => {
    store.dispatch('fetchUsers');
})
</script>

<template>
    <ul class="menu-list">
        <li>
            <router-link to="/">Show all posts</router-link>
        </li>
        <li>
            <ul v-if="store.getters.usernames.length!==0">
                <router-link v-for="username in store.getters.usernames"
                :key="store.getters.usernames.indexOf(username)"
                to="/about">
                    {{username}}
                </router-link>
            </ul>
            <ul v-else>
                <span class="icon">
                    <i class="fas fa-spinner fa-pulse"></i>
                    Loading users...
                </span>
                <p>Loading users...</p>
            </ul>
        </li>
    </ul>
</template>