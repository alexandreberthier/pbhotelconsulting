<template>
  <StaticLayout :heading="t('aboutUs')">
    <div class="flex-container">
      <div
          ref="textRef"
          :class="['text', {'fadeIn': isTextIntersecting}]">
        <p>{{ t('aboutText1') }}</p>
        <p>{{ t('aboutText2') }}</p>
        <p>{{ t('aboutText3') }}</p>
        <p>{{ t('aboutText4') }}</p>
      </div>
      <div
          ref="imageRef"
          :class="['image', {'fadeIn': isImageIntersecting}]">
        <img :src="getImage('ic_about.png')" alt="About us image">
      </div>
    </div>
  </StaticLayout>
</template>

<script setup lang="ts">
import StaticLayout from "@/components/layouts/SectionLayout.vue";
import { useI18n } from "vue-i18n";
import { getImage } from "@/utils/ImageUtils.ts";
import { onMounted, onBeforeUnmount, ref } from "vue";

const { t } = useI18n();

const textRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);
const isTextIntersecting = ref(false);
const isImageIntersecting = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === textRef.value && entry.isIntersecting) {
        isTextIntersecting.value = true;
        observer?.unobserve(entry.target);
      }
      if (entry.target === imageRef.value && entry.isIntersecting) {
        isImageIntersecting.value = true;
        observer?.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
  });

  if (textRef.value) observer.observe(textRef.value);
  if (imageRef.value) observer.observe(imageRef.value);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
})
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
    will-change: opacity, transform;

    p {
      transform: translateX(-100%);
      opacity: 0;
      transition: transform 800ms ease-out, opacity 800ms ease-in;
    }

    &.fadeIn {
      p {
        transform: translateX(0%);
        opacity: 1;

        &:nth-child(1) {
          transition-delay: 0s;
        }

        &:nth-child(2) {
          transition-delay: 0.2s;
        }

        &:nth-child(3) {
          transition-delay: 0.4s;
        }

        &:nth-child(4) {
          transition-delay: 0.6s;
        }
      }
    }
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 4px;
    opacity: 0;
    transform: translateY(100px);
    transition: transform 1200ms ease-out, opacity 1200ms ease-in;
    will-change: opacity, transform;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
    }

    &.fadeIn {
      opacity: 1;
      transform: translateY(0);
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

@media (min-width: 1440px) {
  .flex-container {
    gap: 90px;
  }
}
</style>