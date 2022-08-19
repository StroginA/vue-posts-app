import store from '@/store'
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

router.beforeEach((to, _, next) => {
  // Create a notification according to the destination route
  let popupMessage: string = ""
  switch (to.name) {
    case 'posts': {
      const authorId: number = parseInt(`${
        typeof to.query.userId === 'string' ?
        to.query.userId :
        "-1"
        }`);
      popupMessage = `
      ${to.query.userId ?
      "Now viewing posts by " + store.getters.user(authorId).username :
      "Now viewing all posts"
      }
      `;
      break;
    }
    case 'post': {
      /* 
      Fetching author's name and post title would be
      unwieldy in current implementation
      */
      const postId: number = parseInt(to.params.id);
      popupMessage = `Now viewing post number ${postId}`;
      break;
    }
    default: {
      // Do nothing if route is unrecognized
      popupMessage = "";
    }
  }
  if (popupMessage) {
    store.dispatch('createPopup', {
      message: popupMessage,
      color: 'is-info'
    });
  }

  next()
})

export default router
