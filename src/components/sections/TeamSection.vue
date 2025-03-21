<template>
  <SectionLayout heading="Our Team">
    <div ref="cardFlex" class="card-flex">
      <TeamCard
          v-for="(member, index) in members"
          :key="index"
          @flip="setActiveIndex(index)"
          :member="member"
          :is-flipped="index === activeIndex"
          :class="['hidden', {'fadeIn': isIntersecting}]"
          :style="{ transitionDelay: (index * 120) + 'ms' }"
      />
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">

import SectionLayout from "@/components/layouts/SectionLayout.vue";
import TeamCard, {type Member} from "@/components/TeamCard.vue";
import {onBeforeUnmount, onMounted, onUnmounted, ref, type Ref, useTemplateRef} from "vue";
import ServiceCard from "@/components/ServiceCard.vue";

const cardFlex = useTemplateRef<HTMLDivElement>('cardFlex')
const activeIndex: Ref<number | null> = ref(null)
const isIntersecting = ref(false);


function setActiveIndex(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index
}

function handleClickOutside(event: Event) {
  if (cardFlex.value && !cardFlex.value.contains(event.target as Node)) {
    activeIndex.value = null
  }
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

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

  if (cardFlex.value) {
    observer.observe(cardFlex.value);
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
})

const members: Ref<Member[]> = ref([
  {
    image: 'img_team_1.jpg',
    name: 'memberName1',
    position: 'memberPosition1',
    desc: 'memberDesc1'
  },
  {
    image: 'img_team_2.jpg',
    name: 'memberName2',
    position: 'memberPosition2',
    desc: 'memberDesc2'
  },
  {
    image: 'img_team_3.jpg',
    name: 'memberName3',
    position: 'memberPosition3',
    desc: 'memberDesc3'
  },
  {
    image: 'img_team_4.jpg',
    name: 'memberName4',
    position: 'memberPosition4',
    desc: 'memberDesc4'
  },
  {
    image: 'img_team_5.jpg',
    name: 'memberName5',
    position: 'memberPosition5',
    desc: 'memberDesc5'
  },
  {
    image: 'img_team_6.jpg',
    name: 'memberName6',
    position: 'memberPosition6',
    desc: 'memberDesc6'
  }
])

</script>

<style scoped>

.card-flex {
  width: 100%;
  display: flex;
  gap: 32px;
  flex-wrap: wrap;

  .hidden {
    opacity: 0;
    transform: translateX(50%);
    transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;

    &:hover {
      box-shadow: 0 6px 50px rgba(63, 81, 181, 0.25);
    }

    &.fadeIn {
      opacity: 1;
      transform: translateX(0);
    }
  }
}



@media (max-width: 740px) {
  .card-flex {
    .hidden {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

</style>