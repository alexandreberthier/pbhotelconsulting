<template>
  <button
      v-show="showButton"
      type="button"
      :aria-label="t('a11y.scrollToTop')"
      class="scroll-btn"
      @click="scrollToTop"
  >
    <img :src="getImage('ic_chevron_white.png')" alt="" aria-hidden="true">
  </button>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref, type Ref} from 'vue'
import {getImage} from '@/utils/ImageUtils.ts'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const showButton: Ref<boolean> = ref(false)

function checkScroll() {
  const scrollPosition = window.scrollY
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight
  showButton.value = scrollPosition > totalHeight * 0.4
}

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.scroll-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background: var(--darkblue);
  position: fixed;
  bottom: 30%;
  right: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  transition: all 250ms ease-in-out;
  z-index: 10;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid var(--white);
    outline-offset: 2px;
  }
}
</style>
