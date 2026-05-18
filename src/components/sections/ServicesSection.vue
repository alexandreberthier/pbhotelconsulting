<template>
  <SectionLayout :heading="t('ourServices')">
    <div
        ref="servicesContainerRef"
        class="services-flex"
        :class="['reveal', 'reveal--left', { 'is-visible': isVisible }]"
    >
      <ServiceCard
          v-for="(service, index) in services"
          :key="index"
          @toggle="toggleInfo(service.id)"
          :service="service"
          :is-open="activeIndex === service.id"
          class="service-card-item"
          :style="{ transitionDelay: isVisible ? `${index * 90}ms` : '0ms' }"
      />
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/layouts/SectionLayout.vue'
import ServiceCard, {type Service} from '@/components/ServiceCard.vue'
import {ref, type Ref, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useScrollReveal} from '@/composables/useScrollReveal'

const {t} = useI18n()
const activeIndex: Ref<number | null> = ref(null)
const servicesContainerRef = useTemplateRef<HTMLElement>('servicesContainerRef')
const {isVisible} = useScrollReveal(servicesContainerRef, {threshold: 0.12})

function toggleInfo(id: number) {
  activeIndex.value = activeIndex.value === id ? null : id
}

const services: Ref<Service[]> = ref([
  {id: 1, image: 'ic_invest.png', title: 'serviceCardTitle1', subHeader: 'serviceCardSubTitle1', info: 'serviceCardInfo1'},
  {id: 2, image: 'ic_concept.png', title: 'serviceCardTitle2', subHeader: 'serviceCardSubTitle2', info: 'serviceCardInfo2'},
  {id: 3, image: 'ic_profitability.png', title: 'serviceCardTitle3', subHeader: 'serviceCardSubTitle3', info: 'serviceCardInfo3'},
  {id: 4, image: 'ic_visibility.png', title: 'serviceCardTitle4', subHeader: 'serviceCardSubTitle4', info: 'serviceCardInfo4'},
  {id: 5, image: 'ic_quality.png', title: 'serviceCardTitle5', subHeader: 'serviceCardSubTitle5', info: 'serviceCardInfo5'},
  {id: 6, image: 'ic_undercover.png', title: 'serviceCardTitle6', subHeader: 'serviceCardSubTitle6', info: 'serviceCardInfo6'},
  {id: 7, image: 'ic_humanressources.png', title: 'serviceCardTitle7', subHeader: 'serviceCardSubTitle7', info: 'serviceCardInfo7'},
  {id: 8, image: 'ic_audit.png', title: 'serviceCardTitle8', subHeader: 'serviceCardSubTitle8', info: 'serviceCardInfo8'},
])
</script>

<style scoped>
.services-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}

.service-card-item {
  transition:
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 250ms ease-in-out;
}

.reveal:not(.is-visible) .service-card-item {
  opacity: 0;
  transform: translateY(24px);
}

.reveal.is-visible .service-card-item {
  opacity: 1;
  transform: translateY(0);
}

.service-card-item:hover {
  box-shadow: 0 6px 50px rgba(63, 81, 181, 0.25);
}

@media (prefers-reduced-motion: reduce) {
  .reveal:not(.is-visible) .service-card-item {
    opacity: 1;
    transform: none;
  }
}
</style>
