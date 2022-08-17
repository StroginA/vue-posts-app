import Vue from 'vue'
import VueRouter from 'vue-router'
import PostsView from '../views/PostsView.vue'
import PostView from '../views/PostView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/posts'
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostsView
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
