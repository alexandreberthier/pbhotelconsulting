<template>
  <div class="app">
    <a class="skip-link" href="#main-content">{{ t('a11y.skipToContent') }}</a>
    <header class="site-header">
      <Navbar/>
    </header>
    <main id="main-content" tabindex="-1">
      <RouterView/>
      <ScrollButton/>
      <Toast/>
    </main>
    <footer>
      <Footer id="contact"/>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/sections/Footer.vue'
import ScrollButton from '@/components/ScrollButton.vue'
import Toast from '@/components/Toast.vue'
import {useSeo} from '@/composables/useSeo'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
useSeo()
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: clip;

  .skip-link {
    position: absolute;
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: 100;
    padding: 12px 20px;
    background: var(--darkblue);
    color: var(--white);
    text-decoration: none;
    border-radius: 4px;

    &:focus {
      left: 16px;
      top: 16px;
      width: auto;
      height: auto;
    }
  }

  .site-header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 30;
  }

  main {
    margin: 80px 0 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:focus {
      outline: none;
    }
  }
}

@media (min-width: 1200px) {
  .app main {
    margin-top: 100px;
  }
}
</style>
