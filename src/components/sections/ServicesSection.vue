<template>
  <SectionLayout :heading="t('ourServices')">
    <Reveal
        class="services-flex"
        direction="up"
        stagger
        :threshold="0.12"
    >
      <ServiceCard
          v-for="(service, index) in services"
          :key="index"
          @toggle="toggleInfo(service.id)"
          :service="service"
          :is-open="activeIndex === service.id"
          class="service-card-item"
      />
    </Reveal>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/layouts/SectionLayout.vue'
import Reveal from '@/components/Reveal.vue'
import ServiceCard, {type Service} from '@/components/ServiceCard.vue'
import {ref, type Ref} from 'vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const activeIndex: Ref<number | null> = ref(null)

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

.service-card-item:hover {
  box-shadow: 0 6px 50px var(--brand-shadow);
}
</style>
