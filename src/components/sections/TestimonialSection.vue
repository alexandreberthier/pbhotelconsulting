<template>
  <div ref="sectionRef" class="background">
    <SectionLayout>
      <div
          class="stats-wrapper reveal reveal--up"
          :class="{ 'is-visible': isVisible }"
      >
        <div
            v-for="(stat, index) in stats"
            :key="index"
            class="stat"
            :style="{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }"
        >
          <div class="number">{{ stat.startingNumber }}<span>{{ index < stats.length - 1 ? '+' : '%' }}</span></div>
          <p>{{ t(stat.text) }}</p>
        </div>
      </div>
    </SectionLayout>
    <SectionLayout>
      <div
          class="slider-wrapper reveal reveal--up"
          :class="{ 'is-visible': isVisible }"
          :style="{ transitionDelay: isVisible ? '200ms' : '0ms' }"
      >
        <div class="slider-inner" ref="sliderRef">
          <div
              v-for="(slide, index) in slides"
              :key="index"
              class="slide"
          >
            <p>{{ t(slide.text) }}</p>
            <p>{{ t(slide.author) }}</p>
            <div class="small-info">
              <p>{{ t(slide.position) }}</p>
              <p>{{ t(slide.resort) }}</p>
            </div>
          </div>
        </div>
        <div class="dots-wrapper" role="tablist">
          <button
              v-for="(_, index) in slides"
              :key="index"
              type="button"
              role="tab"
              :aria-selected="currentSlide === index"
              :class="['dot', { active: currentSlide === index }]"
              :aria-label="t('a11y.testimonialSlide', { n: index + 1, total: slides.length })"
              @click="goToSlide(index)"
          />
        </div>
      </div>
    </SectionLayout>
  </div>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/layouts/SectionLayout.vue'
import {onBeforeUnmount, onMounted, ref, type Ref, useTemplateRef, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useScrollReveal} from '@/composables/useScrollReveal'

interface Stat {
  startingNumber: number
  number: number
  text: string
}

interface Slide {
  text: string
  author: string
  position: string
  resort: string
}

const {t} = useI18n()
const sectionRef = useTemplateRef<HTMLElement>('sectionRef')
const {isVisible} = useScrollReveal(sectionRef, {threshold: 0.15})
const statsAnimated = ref(false)

const stats = ref<Stat[]>([
  {startingNumber: 0, number: 35, text: 'yearsExperience'},
  {startingNumber: 0, number: 80, text: 'happyCustomers'},
  {startingNumber: 0, number: 95, text: 'successRate'},
])

function animateStat(stat: Stat) {
  const duration = 2000
  const frameRate = 20
  const totalFrames = duration / frameRate
  const increment = stat.number / totalFrames
  let currentFrame = 0
  const intervalId = setInterval(() => {
    currentFrame++
    stat.startingNumber = Math.floor(increment * currentFrame)
    if (currentFrame >= totalFrames) {
      stat.startingNumber = stat.number
      clearInterval(intervalId)
    }
  }, frameRate)
}

watch(isVisible, (visible) => {
  if (!visible || statsAnimated.value) return
  statsAnimated.value = true
  stats.value.forEach((stat) => animateStat(stat))
})

const sliderRef = ref<HTMLElement | null>(null)
const currentSlide = ref(0)
let autoplayInterval: number | null = null

function goToSlide(index: number) {
  if (!sliderRef.value) return
  currentSlide.value = index
  const slideWidth = sliderRef.value.clientWidth
  sliderRef.value.scrollLeft = index * slideWidth
  resetAutoplayTimer()
}

function nextSlide() {
  goToSlide((currentSlide.value + 1) % slides.value.length)
}

function resetAutoplayTimer() {
  if (autoplayInterval) clearInterval(autoplayInterval)
  autoplayInterval = window.setInterval(nextSlide, 5000)
}

function handleScroll() {
  if (!sliderRef.value) return
  const slideWidth = sliderRef.value.clientWidth
  const index = Math.round(sliderRef.value.scrollLeft / slideWidth)
  if (currentSlide.value !== index) {
    currentSlide.value = index
    resetAutoplayTimer()
  }
}

onMounted(() => {
  if (sliderRef.value) {
    sliderRef.value.addEventListener('scroll', handleScroll, {passive: true})
    resetAutoplayTimer()
  }
})

onBeforeUnmount(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
  sliderRef.value?.removeEventListener('scroll', handleScroll)
})

const slides: Ref<Slide[]> = ref([
  {author: 'slideAuthor1', position: 'slidePosition1', resort: 'slideResort1', text: 'slideText1'},
  {author: 'slideAuthor2', position: 'slidePosition2', resort: 'slideResort2', text: 'slideText2'},
  {author: 'slideAuthor3', position: 'slidePosition3', resort: 'slideResort3', text: 'slideText3'},
  {author: 'slideAuthor4', position: 'slidePosition4', resort: 'slideResort4', text: 'slideText4'},
  {author: 'slideAuthor5', position: 'slidePosition5', resort: 'slideResort5', text: 'slideText5'},
  {author: 'slideAuthor6', position: 'slidePosition6', resort: 'slideResort6', text: 'slideText6'},
])
</script>

<style scoped>
.background {
  width: 100%;
  max-width: 100%;
  background: var(--bg-surface);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  gap: 60px;
  overflow-x: clip;
}

.stats-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  width: 100%;
}

.stat {
  flex: 1 1 160px;
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal:not(.is-visible) .stat {
  opacity: 0;
  transform: translateY(28px);
}

.reveal.is-visible .stat {
  opacity: 1;
  transform: translateY(0);
}

.number {
  font-size: 34px;
  font-weight: bold;
  color: var(--darkblue);

  span {
    font-size: 18px;
  }
}

.slider-wrapper {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  flex-direction: column;
  display: flex;
  gap: 32px;
  align-items: center;
  transition:
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal:not(.is-visible).slider-wrapper {
  opacity: 0;
  transform: translateY(32px);
}

.reveal.is-visible.slider-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.slider-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  cursor: pointer;
  width: 100%;
  max-width: min(600px, 100%);
  background: var(--bg-elevated);
  padding: 50px 10px;
  border-radius: 4px;
  -ms-overflow-style: none;
}

.slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  min-width: 0;

  > p:nth-child(1) {
    font-style: italic;
  }

  > p:nth-child(2) {
    font-size: clamp(22px, 4vw, 30px);
    color: var(--darkblue);
  }
}

.small-info {
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    font-size: 16px;

    &:nth-child(1) {
      color: var(--text-muted);
      font-weight: bold;
    }
  }
}

.slider-inner::-webkit-scrollbar {
  display: none;
}

.dots-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: var(--gray);
  transition: all 250ms ease-in-out;
  cursor: pointer;

  &.active {
    background: var(--darkblue);
  }

  &:focus-visible {
    outline: 2px solid var(--darkblue);
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal:not(.is-visible) .stat,
  .reveal:not(.is-visible).slider-wrapper {
    opacity: 1;
    transform: none;
  }
}
</style>
