<template>
  <SectionLayout :heading="t('ourClients')">
    <div class="logo-carousel">
      <div class="logo-container">
        <div v-for="(client, index) in allClients" :key="index" class="logo-item">
          <img :src="getImage(client)" :alt="`Client logo ${index + 1}`">
        </div>
      </div>
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from "@/components/layouts/SectionLayout.vue";
import {computed } from "vue";
import { getImage } from "@/utils/ImageUtils.ts";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const clients = [
  'ic_thunderbird.jpg',
  'ic_playatortuga.png',
  'ic_lefoyer.png',
  'ic_intercontinental.png',
  'ic_fuji.png',
  'ic_cordonbleu.jpg',
  'ic_caravedo.png',
  'ic_arte.jpg'
];

const allClients = computed(() => [...clients, ...clients, ...clients]);
</script>

<style scoped>
.logo-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 32px;
  animation: scroll 14s linear infinite;
  width: max-content;
  will-change: transform;
}

.logo-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.logo-item img {
  width: 150px;
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

.logo-carousel:hover .logo-container {
  animation-play-state: paused;
}

</style>