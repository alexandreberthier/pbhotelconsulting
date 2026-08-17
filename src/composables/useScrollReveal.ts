import {onBeforeUnmount, onMounted, type Ref, ref, watch} from 'vue'
import {useReducedMotion} from '@/composables/useReducedMotion'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

function canObserve(): boolean {
  return typeof window !== 'undefined' && 'IntersectionObserver' in window
}

export function useScrollReveal(
  targetRef: Ref<HTMLElement | null | undefined>,
  options: ScrollRevealOptions = {},
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -8% 0px',
    triggerOnce = true,
  } = options

  const isVisible = ref(false)
  const prefersReducedMotion = useReducedMotion()
  let observer: IntersectionObserver | null = null
  let boundEl: HTMLElement | null = null

  function show() {
    isVisible.value = true
    if (triggerOnce) {
      teardownObserver()
    }
  }

  function teardownObserver() {
    observer?.disconnect()
    observer = null
  }

  function unbind() {
    teardownObserver()
    boundEl?.removeEventListener('focusin', show)
    boundEl = null
  }

  function bind(el: HTMLElement | null | undefined) {
    unbind()

    if (!el) return

    boundEl = el
    el.addEventListener('focusin', show)

    if (prefersReducedMotion.value || !canObserve()) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show()
            return
          }

          if (!triggerOnce) {
            isVisible.value = false
          }
        })
      },
      {threshold, rootMargin},
    )

    observer.observe(el)
  }

  onMounted(() => {
    watch(
      [targetRef, prefersReducedMotion],
      () => bind(targetRef.value),
      {immediate: true, flush: 'post'},
    )
  })

  onBeforeUnmount(() => {
    unbind()
  })

  return {isVisible, prefersReducedMotion}
}
