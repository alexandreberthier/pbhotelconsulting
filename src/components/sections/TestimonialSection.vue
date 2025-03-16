<template>
  <div class="background">
    <SectionLayout>
      <div class="stats-wrapper" ref="statsContainer">
        <div
            v-for="(stat, index) in stats"
            :key="index"
            class="stat">
          <div class="number">{{ stat.startingNumber }}<span>{{ index < stats.length - 1 ? '+' : '%' }}</span></div>
          <p>{{ t(stat.text) }}</p>
        </div>
      </div>
    </SectionLayout>
    <SectionLayout>
      <div class="slider-wrapper">
        <div class="slider-inner" ref="sliderRef">
          <div
              v-for="(slide, index) in slides"
              :key="index"
              class="slide">
            <p>{{ t(slide.text) }}</p>
            <p>{{ t(slide.author) }}</p>
            <div class="small-info">
              <p>{{ t(slide.position) }}</p>
              <p>{{ t(slide.resort) }}</p>
            </div>
          </div>
        </div>
        <div class="dots-wrapper">
          <div
              v-for="(_, index) in slides"
              :key="index"
              :class="['dot', { active: currentSlide === index }]"
              @click="goToSlide(index)">
          </div>
        </div>
      </div>
    </SectionLayout>
  </div>
</template>

<script setup lang="ts">
import SectionLayout from "@/components/layouts/SectionLayout.vue";
import {ref, onMounted, onBeforeUnmount, type Ref} from "vue";
import {useI18n} from "vue-i18n";

interface Stat {
  startingNumber: number;
  number: number;
  text: string;
}

interface Slide {
  text: string,
  author: string,
  position: string,
  resort: string
}

const {t} = useI18n()
const stats = ref<Stat[]>([
  {startingNumber: 0, number: 35, text: 'yearsExperience'},
  {startingNumber: 0, number: 80, text: 'happyCustomers'},
  {startingNumber: 0, number: 95, text: 'successRate'}
])

const statsContainer = ref<HTMLElement | null>(null);

function animateStat(stat: Stat) {
  const duration = 2000;
  const frameRate = 20;
  const totalFrames = duration / frameRate;
  const increment = stat.number / totalFrames;
  let currentFrame = 0;
  const intervalId = setInterval(() => {
    currentFrame++;
    stat.startingNumber = Math.floor(increment * currentFrame);
    if (currentFrame >= totalFrames) {
      stat.startingNumber = stat.number;
      clearInterval(intervalId);
    }
  }, frameRate);
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.value.forEach(stat => animateStat(stat));
        observer.unobserve(entry.target)
      }
    })
  }, {threshold: 0.2});

  if (statsContainer.value) {
    observer.observe(statsContainer.value);
  }

  if (sliderRef.value) {
    sliderRef.value.addEventListener('scroll', handleScroll);
    resetAutoplayTimer();
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }

  if (sliderRef.value) {
    sliderRef.value.removeEventListener('scroll', handleScroll);
  }
})

const sliderRef = ref<HTMLElement | null>(null);
const currentSlide = ref(0);
let autoplayInterval: number | null = null;

function goToSlide(index: number) {
  if (sliderRef.value) {
    currentSlide.value = index;
    const slideWidth = sliderRef.value.clientWidth;
    sliderRef.value.scrollLeft = index * slideWidth;
    resetAutoplayTimer();
  }
}

function nextSlide() {
  const nextIndex = (currentSlide.value + 1) % slides.value.length;
  goToSlide(nextIndex);
}

function resetAutoplayTimer() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
  autoplayInterval = window.setInterval(nextSlide, 5000);
}

function handleScroll() {
  if (sliderRef.value) {
    const slideWidth = sliderRef.value.clientWidth;
    const scrollPosition = sliderRef.value.scrollLeft;
    const index = Math.round(scrollPosition / slideWidth);

    if (currentSlide.value !== index) {
      currentSlide.value = index;
      resetAutoplayTimer();
    }
  }
}


const slides: Ref<Slide[]> = ref([
  {
    author: "slideAuthor1",
    position: "slidePosition1",
    resort: "slideResort",
    text: "slideText1"
  },
  {
    author: "slideAuthor2",
    position: "slidePosition2",
    resort: "slideResort2",
    text: "slideText2"
  },
  {
    author: "slideAuthor3",
    position: "slidePosition3",
    resort: "slideResort3",
    text: "slideText3"
  },
  {
    author: "slideAuthor4",
    position: "slidePosition4",
    resort: "slideResort4",
    text: "slideText4"
  },
  {
    author: "slideAuthor5",
    position: "slidePosition5",
    resort: "slideResort5",
    text: "slideText5"
  },
  {
    author: "slideAuthor6",
    position: "slidePosition6",
    resort: "slideResort6",
    text: "slideText6"
  }
])


</script>

<style scoped>
.background {
  width: 100%;
  background: var(--lightgray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  gap: 60px;

  .stats-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
    width: 100%;

    .stat {
      flex: 1 0 300px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .number {
        font-size: 34px;
        font-weight: bold;

        span {
          font-size: 18px;
        }
      }
    }
  }

  .slider-wrapper {
    width: 100%;
    overflow-x: hidden;
    flex-direction: column;
    display: flex;
    gap: 32px;
    align-items: center;

    .slider-inner {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: scroll;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      cursor: pointer;
      width: 100%;
      background: var(--white);
      padding: 50px 10px;
      border-radius: 4px;
      max-width: 600px;
      -ms-overflow-style: none;

      .slide {
        flex: 1 0 100%;
        scroll-snap-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 16px;

        > p:nth-child(1) {
          font-style: italic;
        }

        > p:nth-child(2) {
          font-size: 30px ;
          color: var(--darkblue)
        }

        .small-info {
          display: flex;
          flex-direction: column;
          gap: 4px;

          p {
            font-size: 16px;

            &:nth-child(1) {
              color: var(--dark);
              font-weight: bold;
            }
          }
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

      .dot {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--darkgray);
        transition: all 250ms ease-in-out;
        cursor: pointer;

        &.active {
          background: var(--darkblue);
        }
      }
    }
  }
}

</style>