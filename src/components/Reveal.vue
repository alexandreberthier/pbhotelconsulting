<template>
  <component
      :is="as"
      ref="rootRef"
      class="reveal"
      :class="revealClass"
      :style="revealStyle"
  >
    <slot :visible="isVisible"/>
  </component>
</template>

<script setup lang="ts">
import {computed, useTemplateRef, watch} from 'vue'
import {useScrollReveal} from '@/composables/useScrollReveal'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade'

const {
  as = 'div',
  direction = 'up',
  stagger = false,
  staggerStep = 90,
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
  delay = 0,
} = defineProps<{
  as?: keyof HTMLElementTagNameMap
  direction?: RevealDirection
  stagger?: boolean
  staggerStep?: number
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}>()

const emit = defineEmits<{
  visible: [value: boolean]
}>()

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const {isVisible, prefersReducedMotion} = useScrollReveal(rootRef, {
  threshold,
  rootMargin,
  triggerOnce: once,
})

watch(isVisible, (visible) => emit('visible', visible))

const revealClass = computed(() => ({
  'reveal--visible': isVisible.value,
  'is-visible': isVisible.value,
  'reveal--stagger': stagger,
  'reveal--reduced': prefersReducedMotion.value,
  [`reveal--${direction}`]: direction !== 'fade',
  'reveal--fade': direction === 'fade',
}))

const revealStyle = computed(() => ({
  '--reveal-delay': `${delay}ms`,
  '--reveal-stagger-step': `${staggerStep}ms`,
}))

defineExpose({
  el: rootRef,
  isVisible,
})
</script>

<style scoped>
.reveal:not(.reveal--stagger) {
  opacity: 0;
  transform: translate3d(0, 28px, 0);
  transition:
    opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

.reveal--left:not(.reveal--stagger) {
  transform: translate3d(-40px, 0, 0);
}

.reveal--right:not(.reveal--stagger) {
  transform: translate3d(40px, 0, 0);
}

.reveal--down:not(.reveal--stagger) {
  transform: translate3d(0, -28px, 0);
}

.reveal--fade:not(.reveal--stagger) {
  transform: none;
}

.reveal--visible:not(.reveal--stagger),
.reveal--reduced:not(.reveal--stagger) {
  opacity: 1;
  transform: none;
}

.reveal--stagger :slotted(*) {
  opacity: 0;
  transform: translate3d(0, 24px, 0);
  transition:
    opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 250ms ease-in-out;
  transition-delay: 0ms;
}

.reveal--stagger.reveal--left :slotted(*) {
  transform: translate3d(-32px, 0, 0);
}

.reveal--stagger.reveal--right :slotted(*) {
  transform: translate3d(32px, 0, 0);
}

.reveal--stagger.reveal--visible :slotted(*),
.reveal--stagger.reveal--reduced :slotted(*) {
  opacity: 1;
  transform: none;
}

.reveal--stagger.reveal--visible :slotted(*:nth-child(1)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 0); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(2)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 1); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(3)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 2); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(4)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 3); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(5)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 4); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(6)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 5); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(7)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 6); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(8)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 7); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(9)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 8); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(10)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 9); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(11)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 10); }
.reveal--stagger.reveal--visible :slotted(*:nth-child(12)) { transition-delay: calc(var(--reveal-delay, 0ms) + var(--reveal-stagger-step, 90ms) * 11); }

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal--stagger :slotted(*) {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

@media (scripting: none) {
  .reveal,
  .reveal--stagger :slotted(*) {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
