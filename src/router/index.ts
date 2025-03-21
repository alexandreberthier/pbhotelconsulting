import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'PB Hotel Consulting – Global Hospitality Strategy & Development',
        description: 'PB Hotel Consulting offers over 35 years of international experience in hotel management, development, marketing, and recruitment. We provide expert consulting for hotels, resorts, and tourism projects.'
      }
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

router.beforeEach((to, from, next) => {
  const defaultTitle = 'PB Hotel Consulting';

  if (to.meta?.title) {
    document.title = to.meta.title as string;
  } else {
    document.title = defaultTitle;
  }

  const description = to.meta?.description as string;
  const metaDescription = document.querySelector('meta[name="description"]');

  if (metaDescription && description) {
    metaDescription.setAttribute('content', description);
  } else if (description) {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = description;
    document.head.appendChild(meta);
  }

  next()
});

export default router
