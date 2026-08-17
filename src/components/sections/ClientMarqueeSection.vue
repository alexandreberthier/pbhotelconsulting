<template>
  <SectionLayout :heading="t('ourClients')">
    <Reveal
        class="logo-carousel"
        direction="up"
        :threshold="0.1"
        role="region"
        :aria-label="t('a11y.clientLogos')"
    >
      <ul class="sr-only">
        <li v-for="client in clients" :key="client.file">{{ client.name }}</li>
      </ul>
      <div
          class="logo-container"
          aria-hidden="true"
          :class="{ 'logo-container--static': prefersReducedMotion }"
      >
        <div v-for="(client, index) in allClients" :key="index" class="logo-item">
          <img :src="getImage(client.file)" alt="">
        </div>
      </div>
    </Reveal>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/layouts/SectionLayout.vue'
import Reveal from '@/components/Reveal.vue'
import {computed} from 'vue'
import {getImage} from '@/utils/ImageUtils.ts'
import {useI18n} from 'vue-i18n'
import {useReducedMotion} from '@/composables/useReducedMotion'

interface Client {
  file: string
  name: string
}

const {t} = useI18n()
const prefersReducedMotion = useReducedMotion()

const clients: Client[] = [
  {file: 'ic_blue.jpeg', name: 'Blue'},
  {file: 'ic_hilton.jpeg', name: 'Hilton'},
  {file: 'ic_melia.jpeg', name: 'Meliá'},
  {file: 'ic_suneo.jpeg', name: 'Suneo'},
  {file: 'ic_thunderbird.jpg', name: 'Thunderbird'},
  {file: 'ic_playatortuga.png', name: 'Playa Tortuga'},
  {file: 'ic_lefoyer.png', name: 'Le Foyer'},
  {file: 'ic_intercontinental.png', name: 'InterContinental'},
  {file: 'ic_fuji.png', name: 'Fuji'},
  {file: 'ic_cordonbleu.jpg', name: 'Le Cordon Bleu'},
  {file: 'ic_caravedo.png', name: 'Caravedo'},
  {file: 'ic_arte.jpg', name: 'Arte'},
]

const allClients = computed(() => [...clients, ...clients, ...clients])
</script>

<style scoped>
.logo-carousel {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 32px;
  animation: scroll 25s linear infinite;
  width: max-content;
  will-change: transform;
}

.logo-carousel:hover .logo-container,
.logo-carousel:focus-within .logo-container {
  animation-play-state: paused;
}

.logo-container--static {
  animation: none;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  will-change: auto;
}

.logo-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.logo-item img {
  width: min(150px, 28vw);
  height: auto;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-container {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    will-change: auto;
  }
}
</style>
