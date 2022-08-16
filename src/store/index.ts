import Vue from 'vue'
import Vuex from 'vuex'
import type { User } from '../types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [] as User[]
  },
  getters: {
    users (state) {
      return state.users
    }
  },
  mutations: {
    storeUsers (state, users) {
      state.users = users;
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
    }
  },
  modules: {
  }
})
