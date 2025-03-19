<template>
  <div
      role="button"
      tabindex="0"
      @click="$emit('toggle')"
      :aria-expanded="isOpen"
      class="card-wrapper">
    <div class="visible">
      <div class="icon-wrapper">
        <img aria-hidden="true" :src="getImage(service.image)" alt="">
      </div>
      <h3>{{ t(service.title) }}</h3>
      <p>{{ t(service.subHeader) }}</p>
    </div>
    <p
        :class="['hidden', {'grow': isOpen}]">{{t(service.info) }}
    </p>
    <div class="chevron-wrapper">
      <img :class="{'rotate': isOpen}" :src="getImage('ic_chevron.png')" alt="Toggle additional information">
    </div>
  </div>
</template>

<script setup lang="ts">

import {getImage} from "@/utils/ImageUtils.ts";
import {useI18n} from "vue-i18n";

export interface Service {
  id: number,
  image: string,
  title: string,
  subHeader: string,
  info: string
}

const {service, isOpen} = defineProps<{
  service: Service,
  isOpen: boolean
}>()

const {t} = useI18n();
</script>

<style scoped>

.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: linear-gradient(145deg, #fff, #f8f9fa);
  border-radius: 4px;
  box-shadow: 0 6px 15px rgba(63, 81, 181, 0.25);
  flex: 1 1 340px;
  cursor: pointer;
  padding: 30px;
  border: none;

  &:focus {
    outline: 2px solid var(--darkblue);
  }


  .visible {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;


    h3 {
      min-height: 85px;
    }

    p {
      min-height: 70px;
    }

    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
      }
    }
  }

  .chevron-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      transition:  all 250ms ease-in-out;

      &.rotate {
        transform: rotate(180deg);
      }
    }
  }

  .hidden {
    text-align: center;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 400ms ease-in-out, opacity 300ms ease-in-out;

    &.grow {
      max-height: 300px;
      opacity: 1;
    }
  }
}

@media (min-width: 1200px) {
  .card-wrapper {
    max-width: 396px;
  }
}

</style>