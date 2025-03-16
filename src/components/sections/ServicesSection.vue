<template>
  <SectionLayout :heading="t('ourServices')">
    <div class="services-flex" ref="servicesContainerRef">
      <ServiceCard
          v-for="(service, index) in services"
          :key="index"
          @toggle="toggleInfo(service.id)"
          :service="service"
          :is-open="activeIndex === service.id"
          :class="['hidden', {'fadeIn': isIntersecting}]"
          :style="{ transitionDelay: (index * 120) + 'ms' }"
      />
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from "@/components/layouts/SectionLayout.vue";
import ServiceCard, {type Service} from "@/components/ServiceCard.vue";
import {onMounted, onBeforeUnmount, ref, type Ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const activeIndex: Ref<number | null> = ref(null);
const servicesContainerRef = ref<HTMLElement | null>(null);
const isIntersecting = ref(false);

function toggleInfo(id: number) {
  activeIndex.value = activeIndex.value === id ? null : id;
}

const services: Ref<Service[]> = ref([
  {
    id: 1,
    image: 'ic_invest.png',
    title: 'serviceCardTitle1',
    subHeader: 'serviceCardSubTitle1',
    info: 'serviceCardInfo1'
  },
  {
    id: 2,
    image: 'ic_concept.png',
    title: 'serviceCardTitle2',
    subHeader: 'serviceCardSubTitle2',
    info: 'serviceCardInfo2'
  },
  {
    id: 3,
    image: 'ic_profitability.png',
    title: 'serviceCardTitle3',
    subHeader: 'serviceCardSubTitle3',
    info: 'serviceCardInfo3'
  },
  {
    id: 4,
    image: 'ic_visibility.png',
    title: 'serviceCardTitle4',
    subHeader: 'serviceCardSubTitle4',
    info: 'serviceCardInfo4'
  },
  {
    id: 5,
    image: 'ic_quality.png',
    title: 'serviceCardTitle5',
    subHeader: 'serviceCardSubTitle5',
    info: 'serviceCardInfo5'
  },
  {
    id: 6,
    image: 'ic_undercover.png',
    title: 'serviceCardTitle6',
    subHeader: 'serviceCardSubTitle6',
    info: 'serviceCardInfo6'
  },
  {
    id: 7,
    image: 'ic_humanressources.png',
    title: 'serviceCardTitle7',
    subHeader: 'serviceCardSubTitle7',
    info: 'serviceCardInfo7'
  },
  {
    id: 8,
    image: 'ic_audit.png',
    title: 'serviceCardTitle8',
    subHeader: 'serviceCardSubTitle8',
    info: 'serviceCardInfo8'
  }
])

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isIntersecting.value = true;
        observer?.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  if (servicesContainerRef.value) {
    observer.observe(servicesContainerRef.value);
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
})
</script>

<style scoped>

.services-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;

  .hidden {
    opacity: 0;
    transform: translateX(-100%);
    transition: all 500ms ease-in-out;

    &.fadeIn {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

@media (max-width: 740px) {
  .services-flex {
    .hidden {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

</style>