<template>
  <section
      class="hero">
    <h1 :style="{transform: `translateY(-${computedPxUnit})`}">{{t('heroText')}}</h1>
  </section>
</template>

<script setup lang="ts">

import {computed, onMounted, onUnmounted, type Ref, ref} from "vue";
import {getImage} from "@/utils/ImageUtils.ts";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const bgImage = computed(() => `url('${getImage('ic_hero_reception.jpg')}')`)
const isTicking: Ref<boolean> = ref(false)
const scrollYPosition: Ref<number> = ref(0)
const computedPxUnit = computed(() => `${scrollYPosition.value * 0.3}px`)

function updateScroll() {
  if (!isTicking.value) {
    isTicking.value = true
    requestAnimationFrame(() => {
      scrollYPosition.value = window.scrollY
      isTicking.value = false
    })
  }
}

onMounted(() => {
  scrollYPosition.value = window.scrollY
  window.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})

</script>

<style scoped>

.hero {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: v-bind(bgImage);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  scroll-behavior: smooth;
  position: relative;
  z-index: -1;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }

  h1 {
    width: 55%;
    text-align: center;
    color: var(--white);
    will-change: transform;
    z-index: 2;
  }
}

</style>