<template>
  <section class="hero" :aria-labelledby="headingId">
    <div class="hero-inner">
      <Reveal class="hero-copy" direction="up">
        <p class="hero-kicker">{{ t('heroKicker') }}</p>
        <h1 :id="headingId">{{ t('heroText') }}</h1>
        <p class="hero-lead">{{ t('heroSubText') }}</p>
        <router-link
            class="hero-cta"
            :to="{ name: 'home', params: { locale: currentLocale }, hash: '#contact' }"
        >
          {{ t('getInTouch') }}
        </router-link>
      </Reveal>
      <Reveal class="hero-visual" direction="up" :delay="140">
        <div class="hero-visual-frame">
          <img
              :src="getImage('ic_hero.jpg')"
              :alt="t('a11y.heroImage')"
          >
        </div>
      </Reveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useId} from 'vue'
import Reveal from '@/components/Reveal.vue'
import {getImage} from '@/utils/ImageUtils.ts'
import {useI18n} from 'vue-i18n'
import {useAppLocale} from '@/composables/useAppLocale'

const {t} = useI18n()
const {currentLocale} = useAppLocale()
const headingId = useId()
</script>

<style scoped>
.hero {
  width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  background: var(--bg-hero);
  padding: calc(var(--header-height) + 32px) 0 48px;
  isolation: isolate;
}

.hero-inner {
  width: min(calc(100% - 40px), 1250px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 640px;

  h1 {
    color: var(--heading);
    font-size: clamp(32px, 5vw, 52px);
    line-height: 1.15;
  }
}

.hero-kicker {
  margin: 0;
  color: var(--brand-teal);
  font-size: clamp(13px, 1.4vw, 15px);
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.hero-lead {
  margin: 0;
  color: var(--text-muted);
  font-size: clamp(17px, 2vw, 20px);
  line-height: 1.5;
  max-width: 38ch;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 14px 28px;
  background: var(--cta-bg);
  color: var(--white);
  border-radius: 4px;
  font-size: clamp(16px, 1.6vw, 18px);
  transition: background 200ms ease-in-out, opacity 200ms ease-in-out;

  &:hover {
    opacity: 0.88;
  }

  &:focus-visible {
    outline: 2px solid var(--brand-teal);
    outline-offset: 3px;
  }
}

.hero-visual {
  width: 100%;
  max-width: 560px;
  position: relative;
}

.hero-visual-frame {
  position: relative;
  z-index: 1;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 18px 40px var(--brand-shadow);

  img {
    display: block;
    width: 100%;
    height: min(42vh, 380px);
    object-fit: cover;
    object-position: center 40%;
  }
}

.hero-visual::before {
  content: '';
  position: absolute;
  inset: 16px -12px -12px 16px;
  border: 2px solid var(--brand-teal);
  border-radius: 10px;
  z-index: 0;
}

@media (min-width: 740px) {
  .hero {
    padding: calc(var(--header-height) + 40px) 0 56px;
  }

  .hero-visual-frame img {
    height: min(46vh, 440px);
  }
}

@media (min-width: 1200px) {
  .hero-inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 72px;
  }

  .hero-copy {
    flex: 1 1 48%;
    gap: 20px;
  }

  .hero-visual {
    flex: 1 1 44%;
    max-width: 560px;
  }

  .hero-visual-frame img {
    height: min(62vh, 520px);
  }
}
</style>
