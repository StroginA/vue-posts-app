import Vue from 'vue'
import Vuex from 'vuex'
import type { User } from '../types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [] as User[],
  },
  getters: {
    usernames (state) {
      return state.users.map((user) => user.username)
    }
  },
  mutations: {
    storeUsers (state, users) {
      state.users = users;
    }
  },
  actions: {
    async fetchUsers (context) {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const usersJson = await response.json();
      context.commit('storeUsers', usersJson);
      console.log('Users fetched');
    }
  },
  modules: {
  }
})
