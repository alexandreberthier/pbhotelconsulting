import {onMounted, onUnmounted, ref} from 'vue'

function canUseMatchMedia(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
}

export function useReducedMotion() {
  const prefersReducedMotion = ref(
    canUseMatchMedia()
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  let mediaQuery: MediaQueryList | null = null

  function update() {
    prefersReducedMotion.value = mediaQuery?.matches ?? false
  }

  onMounted(() => {
    if (!canUseMatchMedia()) return

    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    mediaQuery.addEventListener('change', update)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', update)
  })

  return prefersReducedMotion
}
