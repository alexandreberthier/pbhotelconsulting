<template>
  <div
      role="button"
      tabindex="0"
      @keydown.enter="$emit('flip')"
      class="card-wrapper"
      @click="$emit('flip')"
  >
    <div
        :class="['card-inner', {'rotate': isFlipped}]">
      <div class="front">
        <div class="image-wrapper">
          <img aria-hidden="true" :src="getImage(member.image)" alt="">
        </div>
        <h3>{{t(member.name)}}</h3>
        <p>{{t(member.position)}}</p>
        <img class="click" :src="getImage('ic_click.png')" alt="click card to see more infos">
      </div>
      <div :aria-hidden="!isFlipped" class="back">
        <p> {{t(member.desc)}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {getImage} from "@/utils/ImageUtils.ts";
import {useI18n} from "vue-i18n";
const{t} = useI18n()

export interface Member {
  image: string,
  name: string,
  position: string,
  desc: string,
}

const {member} = defineProps<{
  member: Member,
  isFlipped: boolean
}>()

</script>

<style scoped>

.card-wrapper {
  border-radius: 4px;
  flex: 1 1 340px;
  cursor: pointer;
  border: none;
  height: 400px;

  &:focus {
    outline: 2px solid var(--darkblue);
  }

  .card-inner {
    position: relative;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    transition: all 400ms ease-in-out;
    box-shadow: 0 6px 15px rgba(63, 81, 181, 0.25);

    &.rotate {
      transform: rotateY(180deg);
    }

    .front, .back {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 32px;
      padding: 30px;
      backface-visibility: hidden;
      background: linear-gradient(145deg, #fff, #f8f9fa);

    }

    .front {
      .image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }

      .click {
        width: 30px;
        height: 30p;
      }
    }

    .back {
      transform: rotateY(180deg);
    }
  }
}

</style>