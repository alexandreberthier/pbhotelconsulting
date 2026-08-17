<template>
  <button
      :type="buttonType"
      :class="['button', { block: isLoading }]"
      :disabled="isLoading"
      :aria-label="isLoading ? t('a11y.sendingMessage') : t('a11y.sendMessage')"
  >
    <div v-if="isLoading" class="loader" aria-hidden="true"></div>
    <p v-else>{{ t('send') }}</p>
  </button>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'

const {isLoading, buttonType = 'button'} = defineProps<{
  isLoading: boolean
  buttonType?: 'button' | 'submit'
}>()

const {t} = useI18n()
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--cta-bg);
  width: 320px;
  border-radius: 4px;
  height: 50px;
  cursor: pointer;
  border: none;
  transition: all 250ms ease-in-out;

  &:focus-visible {
    outline: 2px solid var(--darkgray);
    outline-offset: 2px;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  p {
    color: white;
  }

  .loader {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top: 3px solid var(--white);
    border-bottom: 3px solid var(--white);
    animation: rotate 700ms infinite linear;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
</style>
