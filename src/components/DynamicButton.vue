<template>
  <div
      tabindex="0"
      role="button"
      :class="['button', {'block': isLoading}]"
  >
    <div v-if="isLoading" class="loader"></div>
    <p v-else>{{ t('send') }}</p>

  </div>
</template>

<script setup lang="ts">

import {useI18n} from "vue-i18n";

const {isLoading} = defineProps<{
  isLoading: boolean
}>()

const {t} = useI18n()

</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--darkblue);
  width: 320px;
  border-radius: 4px;
  height: 50px;
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--darkgray);
  }

  &.block {
    user-select: none;
    pointer-events: none;
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