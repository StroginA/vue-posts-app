import Vue from 'vue'
import VueRouter from 'vue-router'
import PostView from '../views/PostView.vue'
import AboutView from '../views/AboutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/posts'
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = new VueRouter({
  routes
})

export default router
