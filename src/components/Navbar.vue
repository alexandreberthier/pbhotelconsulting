<template>
  <nav :aria-label="t('a11y.mainNavigation')" class="nav-wrapper">
    <router-link class="left" :to="{ name: 'home', params: { locale: currentLocale } }">
      <img :src="getImage('ic_pb_logo.png')" :alt="t('a11y.logoHome')">
    </router-link>
    <div class="right">
      <ul
          id="navigation-menu"
          class="links"
          :class="{ show: showMenu }"
      >
        <li
            v-for="(link, index) in navLinks"
            :key="index"
            class="nav-link-item"
            @click="closeMenu"
        >
          <router-link :to="{ name: link.route, params: { locale: currentLocale }, hash: link.hash }">
            <span>{{ t(link.text) }}</span>
          </router-link>
        </li>
      </ul>
      <div class="nav-actions" :class="{ 'nav-actions--visible': showMenu }">
        <LightToggle/>
        <DropDown
            v-model:selected-value="globalStore.selectedLanguage"
            :options="globalStore.languageOptions"
            compact
            :drop-up="isMobileLayout"
        />
      </div>
      <button
          type="button"
          @click="toggleMenu"
          :class="['burger-menu', { rotate: showMenu }]"
          :aria-expanded="showMenu"
          aria-controls="navigation-menu"
          :aria-label="showMenu ? t('a11y.closeNavigation') : t('a11y.toggleNavigation')"
      >
        <span aria-hidden="true"></span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import DropDown from '@/components/DropDown.vue'
import {useGlobalStore} from '@/stores/globalStore.ts'
import LightToggle from '@/components/LightToggle.vue'
import {computed, onMounted, onUnmounted, ref, type Ref, watch} from 'vue'
import {getImage} from '@/utils/ImageUtils.ts'
import {useI18n} from 'vue-i18n'
import {useAppLocale} from '@/composables/useAppLocale'

interface Link {
  route: string
  text: string
  hash?: string
}

const {t} = useI18n()
const globalStore = useGlobalStore()
const showMenu: Ref<boolean> = ref(false)
const isMobileLayout = ref(false)
const {currentLocale} = useAppLocale()

let mobileMediaQuery: MediaQueryList | null = null

function updateMobileLayout() {
  isMobileLayout.value = mobileMediaQuery?.matches ?? false
}

onMounted(() => {
  mobileMediaQuery = window.matchMedia('(max-width: 1199px)')
  updateMobileLayout()
  mobileMediaQuery.addEventListener('change', updateMobileLayout)
})

onUnmounted(() => {
  mobileMediaQuery?.removeEventListener('change', updateMobileLayout)
})

const navLinks: Ref<Link[]> = ref([
  {route: 'home', text: 'about', hash: '#about'},
  {route: 'home', text: 'services', hash: '#services'},
  {route: 'home', text: 'team', hash: '#team'},
  {route: 'home', text: 'contact', hash: '#contact'},
])

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function closeMenu() {
  showMenu.value = false
}

watch(showMenu, (isOpen) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<style scoped>
.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: var(--nav-bg);
  min-height: 72px;
  width: 100%;
  max-width: 100%;

  .left {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    align-items: center;
    z-index: 21;

    img {
      width: clamp(110px, 36vw, 160px);
      height: auto;
      max-width: 100%;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 0 0 auto;
    z-index: 21;

    .links {
      margin: 0;
      padding: 0;
      list-style: none;
      position: fixed;
      inset: 0;
      background: var(--nav-bg);
      z-index: 10;
      display: flex;
      flex-direction: column;
      padding: 88px 24px 120px;
      gap: 28px;
      transition: opacity 250ms ease-in-out, visibility 250ms ease-in-out;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      overflow-y: auto;
      overflow-x: hidden;

      &.show {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
    }

    .nav-link-item {
      display: block;
    }

    .nav-link-item a span {
      font-size: clamp(28px, 7vw, 36px);
      position: relative;
      display: inline-block;

      &:after {
        content: '';
        position: absolute;
        background: var(--darkgray);
        height: 3px;
        width: 0;
        bottom: 0;
        left: 0;
        transition: width 250ms ease-in-out;
      }
    }

    .nav-link-item a:hover span:after {
      width: 100%;
    }

    .nav-actions {
      display: none;
      position: fixed;
      left: 24px;
      right: 24px;
      bottom: max(24px, env(safe-area-inset-bottom));
      z-index: 20;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding-top: 20px;
      border-top: 1px solid var(--border-color);
      overflow: visible;
    }

    .nav-actions--visible {
      display: flex;
    }

    .burger-menu {
      position: relative;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      width: 44px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      cursor: pointer;
      background: var(--nav-bg);
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      span {
        background: var(--darkblue);
        height: 3px;
        width: 22px;
        position: relative;
        transition: all 250ms ease-in-out;

        &:after,
        &:before {
          content: '';
          position: absolute;
          left: 0;
          background: var(--darkblue);
          height: 3px;
          width: 22px;
          transition: all 250ms ease-in-out;
        }

        &:after {
          top: 8px;
        }

        &:before {
          top: -8px;
        }
      }

      &.rotate {
        border-color: var(--darkblue);

        span {
          background: transparent;

          &:after {
            top: 0;
            transform: rotate(45deg);
          }

          &:before {
            top: 0;
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
}

@media (min-width: 740px) {
  .nav-wrapper {
    padding: 8px 20px;
    min-height: 88px;

    .left img {
      width: clamp(140px, 22vw, 200px);
    }

    .right .burger-menu {
      height: 48px;
      width: 48px;
    }
  }
}

@media (min-width: 1200px) {
  .nav-wrapper {
    padding: 12px 28px;
    min-height: 100px;

    .left {
      width: auto;
      flex: 0 0 auto;

      img {
        width: 220px;
      }
    }

    .right {
      flex: 1;
      gap: 20px;
      justify-content: flex-end;
      align-items: center;

      .links {
        position: static;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0;
        gap: clamp(20px, 3vw, 48px);
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        overflow: visible;
        background: transparent;
      }

      .nav-link-item a span {
        font-size: clamp(20px, 1.6vw, 28px);
      }

      .nav-actions {
        display: flex;
        position: static;
        left: auto;
        right: auto;
        bottom: auto;
        flex: 0 0 auto;
        padding-top: 0;
        border-top: none;
        gap: 10px;
      }

      .nav-actions--visible {
        display: flex;
      }

      .burger-menu {
        display: none;
      }
    }
  }
}
</style>
