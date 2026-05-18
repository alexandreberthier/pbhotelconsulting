<template>
  <button
      type="button"
      class="card-wrapper"
      :aria-expanded="isFlipped"
      :aria-label="isFlipped ? t('a11y.hideMemberDetails') : t('a11y.showMemberDetails')"
      @click="$emit('flip')"
  >
    <div :class="['card-inner', { rotate: isFlipped }]">
      <div class="front">
        <div class="image-wrapper">
          <img aria-hidden="true" :src="getImage(member.image)" alt="">
        </div>
        <h3>{{ t(member.name) }}</h3>
        <p>{{ t(member.position) }}</p>
        <img class="click" aria-hidden="true" :src="getImage('ic_click.png')" alt="">
      </div>
      <div :hidden="!isFlipped" class="back">
        <p>{{ t(member.desc) }}</p>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import {getImage} from '@/utils/ImageUtils.ts'
import {useI18n} from 'vue-i18n'

export interface Member {
  image: string
  name: string
  position: string
  desc: string
}

defineProps<{
  member: Member
  isFlipped: boolean
}>()

defineEmits<{
  flip: []
}>()

const {t} = useI18n()
</script>

<style scoped>
.card-wrapper {
  border-radius: 4px;
  flex: 1 1 320px;
  cursor: pointer;
  border: none;
  height: 430px;
  background: transparent;
  padding: 0;
  text-align: inherit;

  &:focus-visible {
    outline: 2px solid var(--darkblue);
    outline-offset: 2px;
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
      background: linear-gradient(145deg, var(--bg-card-start), var(--bg-card-end));
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
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }

      .click {
        width: 30px;
        height: 30px;
      }
    }

    .back {
      transform: rotateY(180deg);
    }
  }
}
</style>
