<template>
  <StaticLayout :heading="t('aboutUs')">
    <div class="flex-container">
      <Reveal class="text" direction="left" stagger :stagger-step="120" :threshold="0.2">
        <p>{{ t('aboutText1') }}</p>
        <p>{{ t('aboutText2') }}</p>
        <p>{{ t('aboutText3') }}</p>
        <p>{{ t('aboutText4') }}</p>
      </Reveal>
      <Reveal class="image" direction="up" :threshold="0.2">
        <img :src="getImage('ic_about.png')" :alt="t('a11y.aboutImage')">
      </Reveal>
    </div>
  </StaticLayout>
</template>

<script setup lang="ts">
import StaticLayout from '@/components/layouts/SectionLayout.vue'
import Reveal from '@/components/Reveal.vue'
import {useI18n} from 'vue-i18n'
import {getImage} from '@/utils/ImageUtils.ts'

const {t} = useI18n()
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 4px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
}

@media (min-width: 740px) {
  .flex-container {
    flex-direction: row;

    .text, .image {
      flex: 1;
    }
  }
}

@media (min-width: 1200px) {
  .flex-container {
    gap: 90px;
  }

  .text {
    gap: 16px;
  }
}
</style>
