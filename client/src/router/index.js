import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import myRouter from './my'
import searchRouter from './search'
import adminRouter from './admin'

Vue.use(VueRouter)

const routes = [
    // path: '/about',
    // name: 'about',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    movieRouter,
    cinemaRouter,
    myRouter,
    searchRouter,
    adminRouter,
    {
      path: '/*',
      redirect: '/movie' 
    }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'MOVI',
  routes
})

export default router
