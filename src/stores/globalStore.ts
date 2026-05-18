import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Ref} from 'vue'
import type {Option} from '@/components/DropDown.vue'

function readDarkModePreference(): boolean {
  if (typeof localStorage === 'undefined') {
    return false
  }

  try {
    return JSON.parse(localStorage.getItem('darkMode') || 'false')
  } catch {
    return false
  }
}

export const useGlobalStore = defineStore('central', () => {
  const selectedLanguage = ref<'en' | 'es' | 'fr'>('en')
  const languageOptions: Ref<Option<string>[]> = ref([
    {text: 'EN', value: 'en'},
    {text: 'FR', value: 'fr'},
    {text: 'ES', value: 'es'},
  ])

  const isDarkMode = ref(readDarkModePreference())

  function applyTheme() {
    if (typeof document === 'undefined') {
      return
    }
    document.documentElement.dataset.theme = isDarkMode.value ? 'dark' : 'light'
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', String(isDarkMode.value))
    applyTheme()
  }

  return {
    selectedLanguage,
    languageOptions,
    isDarkMode,
    applyTheme,
    toggleDarkMode,
  }
})
