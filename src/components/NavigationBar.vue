<script lang="ts" setup>
import store from '@/store';
import { onMounted, ref } from 'vue';

const isLoadingUsers = ref(true);
const isLoadingError = ref(false);
const isBurgerMenuOpen = ref(false);

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

const handleNavbarBurgerClick = () => {
    isBurgerMenuOpen.value = !isBurgerMenuOpen.value;
}
</script>

<template>
    <nav class="navbar is-fixed-top has-shadow" 
    role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a role="button" 
            class="navbar-burger"
            :class="`${isBurgerMenuOpen ? 'is-active' : ''}`"
            aria-label="menu" 
            @click="handleNavbarBurgerClick"
            aria-expanded="false" data-target="navbar">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbar"
        class="navbar-menu"
        :class="`${isBurgerMenuOpen ? 'is-active' : ''}`">
            <div class="navbar-end">
                <router-link class="navbar-item"
                to="/">
                    Show all posts
                </router-link>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Users
                    </a>
                    <div class="navbar-dropdown is-right">
                        <ul v-if="!isLoadingUsers">
                            <router-link class="navbar-item"
                            v-for="user in store.getters.users"
                            :key="user.id"
                            to="/about">
                                {{user.username}}
                            </router-link>
                        </ul>
                        <span v-else-if="!isLoadingError"
                        class="icon">
                            <i class="fas fa-spinner fa-pulse"></i>
                        </span>
                        <p v-else class="has-text-danger">
                            Error loading users
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
</style>