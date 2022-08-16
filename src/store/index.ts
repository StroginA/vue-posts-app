import Vue from 'vue'
import { prototype } from 'vue/types/umd'
import Vuex from 'vuex'
import type { Post, User } from '../types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [] as User[],
    posts: [] as Post[]
  },
  getters: {
    users (state) {
      return state.users
    },
    posts (state) {
      return state.posts
    },
    author: (state) => (post: Post) => {
      return state.users.find((user) => user.id === post.userId);
    }
  },
  mutations: {
    storeUsers (state, users) {
      state.users = users;
    },
    storePosts (state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    fetchUsers (context) {
      return new Promise<void>((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users/')
        .then(res => {
          if (res.ok) {
            res.json()
            .then(json => {
              context.commit('storeUsers', json);
              resolve();
            })
          } else {
            throw new Error('Error loading users')
          }
        })
        .catch(() => {
          reject();
        })
      })
    },
    fetchPosts (context, userId?) {
      return new Promise<void>((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts/' +
        `${userId ? `?userId=${userId}` : ''}`)
        .then(res => {
          if (res.ok) {
            res.json()
            .then(json => {
              context.commit('storePosts', json);
              resolve();
            })
          } else {
            throw new Error('Error loading posts')
          }
        })
        .catch(() => {
          reject();
        })
      })
    }
  },
  modules: {
  }
})
