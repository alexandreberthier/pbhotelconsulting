import {onBeforeUnmount, onMounted, type Ref, ref} from 'vue'
import {useReducedMotion} from '@/composables/useReducedMotion'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollReveal(
  targetRef: Ref<HTMLElement | null>,
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

  onMounted(() => {
    if (prefersReducedMotion.value) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          isVisible.value = true
          if (triggerOnce) {
            observer?.unobserve(entry.target)
          }
        })
      },
      {threshold, rootMargin},
    )

    if (targetRef.value) {
      observer.observe(targetRef.value)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return {isVisible, prefersReducedMotion}
}
