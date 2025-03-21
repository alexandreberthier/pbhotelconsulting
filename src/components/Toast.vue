<template>
  <div class="toast-wrapper">
    <TransitionGroup name="toast">
      <div
          v-for="(toast, index) in toasts"
          :key="toast.id"
          aria-live="assertive"
          role="alert"
          class="toast"
      >
        <div class="content">
          <div
              class="color"
              :style="{ background: toast.type === 'success' ? '#4caf50' : '#f44336' }">
          </div>
          <div class="icon-wrapper">
            <img
                aria-hidden="true"
                :src="getImage(toast.type === 'success' ? 'ic_success.png' : 'ic_error.png')"
                alt=""
            >
          </div>
          <div class="text">
            <p>{{ toast.type === 'success' ? 'Success' : 'Error' }}</p>
            <p>{{ toast.message }}</p>
          </div>
          <img
              class="close-icon"
              :src="getImage('ic_close.png')"
              aria-hidden="true"
              alt="close toast"
          >
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import {getImage} from "@/utils/ImageUtils.ts";
import {toasts} from "@/utils/useToast.ts";

</script>

<style scoped>

.toast-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: fixed;
  right: 20px;
  z-index: 10;
  top: 300px;

  .toast {
    background: linear-gradient(145deg, #fff, #f8f9fa);
    width: fit-content;
    height: 60px;
    box-shadow: 0 6px 15px rgba(63, 81, 181, 0.25);
    border-radius: 4px;
    display: flex;
    position: relative;
    overflow: hidden;
    align-items: center;
    padding: 0 35px;
    cursor: pointer;

    .content {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 16px;

      .color {
        position: absolute;
        height: 100%;
        background: var(--green);
        width: 20px;
        left: 0;
      }

      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 32px;
          height: 32px;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: 4px;

        p {
          &:nth-child(1) {
            font-size: 18px;
          }

          &:nth-child(2) {
            font-size: 14px;
          }
        }
      }

      .close-icon {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 10px;
        right: 10px;
      }

    }
  }
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(50%);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

</style>