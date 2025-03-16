import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    }
  ],
  scrollBehavior(to, from , savedPosition){
    if(savedPosition){
      return savedPosition
    }

    if(to.hash) {
      const element = document.querySelector(to.hash)
      if(element) {
        const offset = 100;
        const elPosition = element.getBoundingClientRect().top + window.scrollY - offset

        return  {
          top: elPosition,
          behavior: "smooth"
        }
      }
    }

    return  {
      top: 0,
      behavior: "smooth"
    }
  }
})

export default router
