import Vue from 'vue'
import Vuex from 'vuex'
import type { Comment, Post, User, Popup } from '../types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [] as User[],
    posts: [] as Post[],
    comments: [] as Comment[],
    popups: [] as Popup[]
  },
  getters: {
    users (state): User[] {
      return state.users
    },
    posts (state): Post[] {
      return state.posts
    },
    comments (state): Comment[] {
      return state.comments
    },
    author: (state) => (post: Post) => {
      return state.users.find((user) => user.id === post.userId);
    },
    post: (state) => (id: number) => {
      return state.posts.find(post => post.id === id);
    },
    popups (state): Popup[] {
      return state.popups
    }
  },
  mutations: {
    storeUsers (state, users) {
      state.users = users;
    },
    storePosts (state, posts) {
      state.posts = posts;
    },
    storeComments (state, comments) {
      state.comments = comments;
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
    },
    fetchPostById (context, id) {
      return new Promise<void>((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts/' +
        `${id}`)
        .then(res => {
          if (res.ok) {
            res.json()
            .then(json => {
              context.commit('storePosts', [json]);
              resolve();
            })
          } else {
            throw new Error('Error loading post')
          }
        })
        .catch(() => {
          reject();
        })
      })
    },
    fetchCommentsByPostId (context, id) {
      return new Promise<void>((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/comments?postId=' +
        `${id}`)
        .then(res => {
          if (res.ok) {
            res.json()
            .then(json => {
              context.commit('storeComments', json);
              resolve();
            })
          } else {
            throw new Error('Error loading comments')
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
