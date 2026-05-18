<template>
  <button
      type="button"
      role="switch"
      :aria-checked="globalStore.isDarkMode"
      :aria-label="t('a11y.toggleDarkMode')"
      @click="globalStore.toggleDarkMode()"
      :class="['toggle-wrapper', { toggled: globalStore.isDarkMode }]"
  >
    <span class="circle" aria-hidden="true">
      <img
          :src="getImage(globalStore.isDarkMode ? 'ic_moon.png' : 'ic_sun.png')"
          alt=""
      >
    </span>
  </button>
</template>

<script setup lang="ts">
import {getImage} from '@/utils/ImageUtils.ts'
import {useGlobalStore} from '@/stores/globalStore.ts'
import {useI18n} from 'vue-i18n'

const globalStore = useGlobalStore()
const {t} = useI18n()
</script>

<style scoped>
.toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  width: 56px;
  min-width: 56px;
  border-radius: 24px;
  padding: 5px;
  cursor: pointer;
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  transition: all 150ms ease-in-out;
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid var(--pink);
    outline-offset: 2px;
  }

  .circle {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to top, var(--orange) 0%, var(--bg-elevated) 90%);
    transition: transform 150ms ease-in-out;

    img {
      width: 22px;
      height: 22px;
    }
  }

  &.toggled {
    justify-content: flex-end;
    background: #333;

    .circle {
      background: linear-gradient(to top, #555 0%, #bbb 90%);
    }
  }
}
</style>
