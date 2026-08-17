<template>
  <div class="background">
    <SectionLayout>
      <Reveal
          class="stats-wrapper"
          direction="up"
          stagger
          :stagger-step="100"
          :threshold="0.15"
          @visible="onStatsVisible"
      >
        <div
            v-for="(stat, index) in stats"
            :key="index"
            class="stat"
        >
          <div class="number">{{ stat.startingNumber }}<span>{{ index < stats.length - 1 ? '+' : '%' }}</span></div>
          <p>{{ t(stat.text) }}</p>
        </div>
      </Reveal>
    </SectionLayout>
    <SectionLayout>
      <Reveal
          class="slider-wrapper"
          direction="up"
          :delay="160"
          :threshold="0.15"
      >
        <div
            class="slider-region"
            role="region"
            :aria-roledescription="t('a11y.carousel')"
            :aria-label="t('a11y.testimonialCarousel')"
        >
          <div class="slider-stage">
            <button
                type="button"
                class="slider-nav slider-nav--prev"
                :aria-label="t('a11y.previousTestimonial')"
                @click="prevSlide"
            >
              <span aria-hidden="true"></span>
            </button>

            <div class="embla" ref="emblaRef">
              <div class="embla-container">
                <div
                    v-for="(slide, index) in slides"
                    :key="index"
                    class="slide"
                    role="group"
                    :aria-roledescription="t('a11y.slide')"
                    :aria-label="t('a11y.testimonialSlide', { n: index + 1, total: slides.length })"
                    :aria-hidden="currentSlide !== index"
                >
                  <div class="slide-body">
                    <p class="slide-quote">{{ t(slide.text) }}</p>
                    <p class="slide-author">{{ t(slide.author) }}</p>
                    <div class="small-info">
                      <p>{{ t(slide.position) }}</p>
                      <p>{{ t(slide.resort) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
                type="button"
                class="slider-nav slider-nav--next"
                :aria-label="t('a11y.nextTestimonial')"
                @click="nextSlide"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="dots-wrapper">
            <button
                v-for="(_, index) in slides"
                :key="index"
                type="button"
                :class="['dot', { active: currentSlide === index }]"
                :aria-current="currentSlide === index ? 'true' : undefined"
                :aria-label="t('a11y.testimonialSlide', { n: index + 1, total: slides.length })"
                @click="goToSlide(index)"
            />
          </div>
        </div>
      </Reveal>
    </SectionLayout>
  </div>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/layouts/SectionLayout.vue'
import Reveal from '@/components/Reveal.vue'
import {computed, type Ref, ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useReducedMotion} from '@/composables/useReducedMotion'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

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
const prefersReducedMotion = useReducedMotion()
const statsAnimated = ref(false)
const currentSlide = ref(0)

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

function onStatsVisible(visible: boolean) {
  if (!visible || statsAnimated.value) return
  statsAnimated.value = true

  if (prefersReducedMotion.value) {
    stats.value.forEach((stat) => {
      stat.startingNumber = stat.number
    })
    return
  }

  stats.value.forEach((stat) => animateStat(stat))
}

const slides: Ref<Slide[]> = ref([
  {author: 'slideAuthor1', position: 'slidePosition1', resort: 'slideResort1', text: 'slideText1'},
  {author: 'slideAuthor2', position: 'slidePosition2', resort: 'slideResort2', text: 'slideText2'},
  {author: 'slideAuthor3', position: 'slidePosition3', resort: 'slideResort3', text: 'slideText3'},
  {author: 'slideAuthor4', position: 'slidePosition4', resort: 'slideResort4', text: 'slideText4'},
  {author: 'slideAuthor5', position: 'slidePosition5', resort: 'slideResort5', text: 'slideText5'},
  {author: 'slideAuthor6', position: 'slidePosition6', resort: 'slideResort6', text: 'slideText6'},
])

const emblaOptions = computed(() => ({
  loop: true,
  align: 'center' as const,
  skipSnaps: false,
  duration: prefersReducedMotion.value ? 0 : 22,
}))

const autoplay = Autoplay({
  delay: 5000,
  playOnInit: false,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  stopOnFocusIn: true,
  rootNode: (emblaRoot) => emblaRoot.closest('.slider-region'),
})

const [emblaRef, emblaApi] = emblaCarouselVue(emblaOptions, [autoplay])

watch(emblaApi, (api) => {
  if (!api) return

  const onSelect = () => {
    currentSlide.value = api.selectedScrollSnap()
  }

  api.on('select', onSelect)
  api.on('reInit', onSelect)
  onSelect()

  if (prefersReducedMotion.value) {
    api.plugins().autoplay?.stop()
  } else {
    api.plugins().autoplay?.play()
  }
})

watch(prefersReducedMotion, (reduced) => {
  const autoplayPlugin = emblaApi.value?.plugins().autoplay
  if (!autoplayPlugin) return
  if (reduced) autoplayPlugin.stop()
  else autoplayPlugin.play()
})

function goToSlide(index: number) {
  emblaApi.value?.scrollTo(index)
}

function nextSlide() {
  emblaApi.value?.scrollNext()
}

function prevSlide() {
  emblaApi.value?.scrollPrev()
}
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
}

.number {
  font-size: 34px;
  font-weight: bold;
  color: var(--heading);

  span {
    font-size: 18px;
  }
}

.slider-wrapper,
.slider-region {
  width: 100%;
  max-width: 100%;
}

.slider-region {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.slider-stage {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: min(720px, 100%);
}

.embla {
  overflow: hidden;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  cursor: grab;
  background: var(--bg-elevated);
  border-radius: 4px;
  touch-action: pan-y pinch-zoom;

  &:active {
    cursor: grabbing;
  }
}

.embla-container {
  display: flex;
  align-items: stretch;
  touch-action: pan-y pinch-zoom;
}

.slide {
  flex: 0 0 100%;
  min-width: 0;
  max-width: 100%;
  display: flex;
  user-select: none;
}

.slide-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 40px 20px;
  overflow-wrap: break-word;
  word-break: break-word;
}

.slide-quote,
.slide-author,
.small-info,
.small-info p {
  max-width: 100%;
  min-width: 0;
}

.slide-quote {
  font-style: italic;
  font-size: clamp(16px, 2.2vw, 20px);
  line-height: 1.45;
}

.slide-author {
  font-size: clamp(18px, 2.4vw, 24px);
  color: var(--heading);
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

.slider-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: var(--bg-elevated);
  cursor: pointer;
  padding: 0;

  span {
    width: 10px;
    height: 10px;
    border-right: 2px solid var(--heading);
    border-bottom: 2px solid var(--heading);
  }

  &:hover {
    border-color: var(--brand-teal);
  }

  &:focus-visible {
    outline: 2px solid var(--darkblue);
    outline-offset: 2px;
  }
}

.slider-nav--prev span {
  transform: rotate(135deg);
  margin-left: 4px;
}

.slider-nav--next span {
  transform: rotate(-45deg);
  margin-right: 4px;
}

.dots-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: var(--gray);
  transition: background 250ms ease-in-out, transform 250ms ease-in-out;
  cursor: pointer;

  &.active {
    background: var(--darkblue);
    transform: scale(1.2);
  }

  &:focus-visible {
    outline: 2px solid var(--darkblue);
    outline-offset: 2px;
  }
}

@media (max-width: 739px) {
  .slider-stage {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .slider-nav {
    display: none;
  }
}
</style>
