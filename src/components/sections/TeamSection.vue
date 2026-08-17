<template>
  <SectionLayout :heading="t('team')">
    <Reveal
        ref="cardReveal"
        class="card-flex"
        direction="up"
        stagger
        :threshold="0.12"
    >
      <TeamCard
          v-for="(member, index) in members"
          :key="index"
          @flip="setActiveIndex(index)"
          :member="member"
          :is-flipped="index === activeIndex"
          class="team-card-item"
      />
    </Reveal>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/layouts/SectionLayout.vue'
import Reveal from '@/components/Reveal.vue'
import TeamCard, {type Member} from '@/components/TeamCard.vue'
import {onMounted, onUnmounted, ref, type Ref, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const cardReveal = useTemplateRef<{ el: HTMLElement | null }>('cardReveal')
const activeIndex: Ref<number | null> = ref(null)

function setActiveIndex(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index
}

function handleClickOutside(event: Event) {
  const el = cardReveal.value?.el
  if (el && !el.contains(event.target as Node)) {
    activeIndex.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const members: Ref<Member[]> = ref([
  {image: 'img_team_1.jpeg', name: 'memberName1', position: 'memberPosition1', desc: 'memberDesc1'},
  {image: 'img_team_2.jpg', name: 'memberName2', position: 'memberPosition2', desc: 'memberDesc2'},
  {image: 'img_team_3.jpg', name: 'memberName3', position: 'memberPosition3', desc: 'memberDesc3'},
  {image: 'img_team_4.jpg', name: 'memberName4', position: 'memberPosition4', desc: 'memberDesc4'},
  {image: 'img_team_5.jpg', name: 'memberName5', position: 'memberPosition5', desc: 'memberDesc5'},
  {image: 'img_team_6.jpg', name: 'memberName6', position: 'memberPosition6', desc: 'memberDesc6'},
])
</script>

<style scoped>
.card-flex {
  width: 100%;
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.team-card-item:hover {
  box-shadow: 0 6px 50px var(--brand-shadow);
}
</style>
