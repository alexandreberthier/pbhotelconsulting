<template>
  <section class="content">
    <h2 v-if="heading">{{heading}}</h2>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">

const {heading} = defineProps<{
  heading?: string
}>()

</script>

<style scoped>

.content {
  width: calc(100% - 54px);
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