<template>
  <StaticLayout :heading="t('aboutUs')">
    <div class="flex-container">
      <div
          ref="textRef"
          class="text reveal reveal--left"
          :class="{ 'is-visible': isTextVisible }"
      >
        <p>{{ t('aboutText1') }}</p>
        <p>{{ t('aboutText2') }}</p>
        <p>{{ t('aboutText3') }}</p>
        <p>{{ t('aboutText4') }}</p>
      </div>
      <div
          ref="imageRef"
          class="image reveal reveal--up"
          :class="{ 'is-visible': isImageVisible }"
      >
        <img :src="getImage('ic_about.png')" :alt="t('a11y.aboutImage')">
      </div>
    </div>
  </StaticLayout>
</template>

<script setup lang="ts">
import StaticLayout from '@/components/layouts/SectionLayout.vue'
import {useI18n} from 'vue-i18n'
import {getImage} from '@/utils/ImageUtils.ts'
import {useTemplateRef} from 'vue'
import {useScrollReveal} from '@/composables/useScrollReveal'

const {t} = useI18n()
const textRef = useTemplateRef<HTMLElement>('textRef')
const imageRef = useTemplateRef<HTMLElement>('imageRef')
const {isVisible: isTextVisible} = useScrollReveal(textRef, {threshold: 0.2})
const {isVisible: isImageVisible} = useScrollReveal(imageRef, {threshold: 0.2})
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  .text {
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      transition:
        transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 700ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    &:not(.is-visible) p {
      opacity: 0;
      transform: translateX(-32px);
    }

    &.is-visible p {
      opacity: 1;
      transform: translateX(0);

      &:nth-child(1) { transition-delay: 0ms; }
      &:nth-child(2) { transition-delay: 120ms; }
      &:nth-child(3) { transition-delay: 240ms; }
      &:nth-child(4) { transition-delay: 360ms; }
    }
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

    .text {
      gap: 16px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .text:not(.is-visible) p {
    opacity: 1;
    transform: none;
  }
}
</style>
