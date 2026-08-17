<template>
  <section class="content" :aria-labelledby="heading ? headingId : undefined">
    <h2 v-if="heading" :id="headingId" class="section-heading">{{ heading }}</h2>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import {useId} from 'vue'

const {heading} = defineProps<{
  heading?: string
}>()

const headingId = useId()
</script>

<style scoped>
.content {
  width: min(calc(100% - 54px), 100%);
  max-width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

@media (min-width: 740px) {
  .content {
    width: 660px;
    gap: 60px;
  }
}

@media (min-width: 1200px) {
  .content {
    width: 1050px;
    gap: 90px;
  }
}

@media (min-width: 1440px) {
  .content {
    width: 1250px;
    gap: 120px;
  }
}
</style>
