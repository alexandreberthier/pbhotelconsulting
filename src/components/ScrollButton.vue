<template>
  <div
      v-show="showButton"
      role="button"
      aria-label="Scroll to top"
      class="scroll-btn"
      @click="scrollToTop"
  >
    <img :src="getImage('ic_chevron_white.png')" alt="">
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, type Ref} from "vue";
import {getImage} from "@/utils/ImageUtils.ts";

const showButton: Ref<boolean> = ref(false);

function checkScroll() {
  const scrollPosition = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

  showButton.value = scrollPosition > totalHeight * 0.4;
}

function scrollToTop() {
  window.scrollTo({top: 0, behavior: "smooth"})
}

onMounted(() => {
  window.addEventListener("scroll", checkScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll)
})
</script>

<style scoped>
.scroll-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background: var(--darkblue);
  position: fixed;
  bottom: 30%;
  right: 30px;;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  transition: all 250ms ease-in-out;
  z-index: 10;


  img {
    width: 24px;
    height: 24px;
  }
}

.scroll-btn:hover {
  opacity: 0.8;
}
</style>
