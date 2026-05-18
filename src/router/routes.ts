import type {RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {DEFAULT_LOCALE} from '@/config/site'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/${DEFAULT_LOCALE}`,
  },
  {
    path: '/:locale(en|fr|es)',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: `/${DEFAULT_LOCALE}`,
  },
]
