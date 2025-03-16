import './assets/main.css'

import {createApp, watch} from 'vue'
import { createPinia } from 'pinia'
import {i18n} from "@/translations/i18n.ts";

import App from './App.vue'
import router from './router'
import {useGlobalStore} from "@/stores/globalStore.ts";

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')

const globalStore = useGlobalStore()

i18n.global.locale = globalStore.selectedLanguage;


watch(
    () => globalStore.selectedLanguage,
    (newLocale) => {
        i18n.global.locale = newLocale;
    }
)
