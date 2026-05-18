<template>
  <section ref="heroRef" class="hero" :class="{ 'hero--ready': isReady }">
    <div
        class="hero-media"
        :style="mediaStyle"
        aria-hidden="true"
    />
    <div class="hero-overlay" :style="overlayStyle" aria-hidden="true"/>
    <div class="hero-content" :style="contentStyle">
      <h1>{{ t('heroText') }}</h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, useTemplateRef} from 'vue'
import {getImage} from '@/utils/ImageUtils.ts'
import {useI18n} from 'vue-i18n'
import {useReducedMotion} from '@/composables/useReducedMotion'

const {t} = useI18n()
const prefersReducedMotion = useReducedMotion()
const heroRef = useTemplateRef<HTMLElement>('heroRef')
const isReady = ref(false)
const scrollY = ref(0)
const isTicking = ref(false)

const bgImage = computed(() => `url('${getImage('ic_hero_reception.jpg')}')`)

const heroProgress = computed(() => {
  if (!heroRef.value || prefersReducedMotion.value) return 0
  const height = heroRef.value.offsetHeight || window.innerHeight
  return Math.min(scrollY.value / height, 1)
})

const mediaStyle = computed(() => {
  if (prefersReducedMotion.value) {
    return {backgroundImage: bgImage.value}
  }

  const offset = scrollY.value * 0.42
  return {
    backgroundImage: bgImage.value,
    transform: `translate3d(0, ${offset}px, 0) scale(1.05)`,
  }
})

const contentStyle = computed(() => {
  if (prefersReducedMotion.value) return {}

  const offset = scrollY.value * 0.18
  const opacity = Math.max(1 - heroProgress.value * 1.15, 0)

  return {
    transform: `translate3d(0, ${-offset}px, 0)`,
    opacity,
  }
})

const overlayStyle = computed(() => {
  if (prefersReducedMotion.value) return {}

  return {
    background: `rgba(0, 0, 0, ${0.55 + heroProgress.value * 0.2})`,
  }
})

function updateScroll() {
  if (!isTicking.value) {
    isTicking.value = true
    requestAnimationFrame(() => {
      scrollY.value = window.scrollY
      isTicking.value = false
    })
  }
}

onMounted(() => {
  scrollY.value = window.scrollY
  window.addEventListener('scroll', updateScroll, {passive: true})
  requestAnimationFrame(() => {
    isReady.value = true
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style scoped>
.hero {
  width: 100%;
  height: 100vh;
  min-height: 520px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
}

.hero-media {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
  transition: background 120ms linear;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(90%, 920px);
  text-align: center;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 900ms cubic-bezier(0.22, 1, 0.36, 1);

  h1 {
    color: var(--white);
    margin: 0;
  }
}

.hero--ready .hero-content {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .hero-media {
    inset: 0;
    transform: none !important;
  }

  .hero-content {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
