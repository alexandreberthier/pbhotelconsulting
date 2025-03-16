import {defineStore} from "pinia";
import {ref} from "vue";
import type {Ref} from "vue";
import type {Option} from "@/components/DropDown.vue";

export const useGlobalStore = defineStore('central', () => {

    const selectedLanguage = ref<"en" | "es" | "fr">("en");
    const languageOptions: Ref<Option<string>[]> = ref([
        {
            text: 'EN',
            value: 'en'
        },
        {
            text: 'FR',
            value: 'fr'
        },
        {
            text: 'ES',
            value: 'es'
        }
    ])

    const isDarkMode = ref(JSON.parse(localStorage.getItem('darkMode') || 'false'));


    function toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value
        localStorage.setItem('darkMode', String(isDarkMode.value))
        document.documentElement.dataset.theme = isDarkMode.value ? 'dark': 'light'
    }


    return {
        selectedLanguage, languageOptions,isDarkMode,  toggleDarkMode
    }
})