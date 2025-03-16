<template>
  <div
      tabindex="0"
      role="switch"
      :aria-checked="globalStore.isDarkMode"
      aria-label="Toggle darkMode"
      @keydown.enter="globalStore.toggleDarkMode()"
      @click="globalStore.toggleDarkMode()"
      :class="['toggle-wrapper', { toggled: globalStore.isDarkMode }]"
  >
    <div class="circle">
      <img
          aria-hidden="true"
          :src="getImage(globalStore.isDarkMode ? 'ic_moon.png' : 'ic_sun.png')"
          alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {getImage} from "@/utils/ImageUtils.ts";
import {useGlobalStore} from "@/stores/globalStore.ts";

const globalStore = useGlobalStore()

</script>

<style scoped>
.toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: start;
  background: var(--white);
  height: 40px;
  width: fit-content;
  border-radius: 24px;
  padding: 5px;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
  background: var(--lightgray);

  &:focus {
    outline: 2px solid var(--pink);
  }

  .circle {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    background: linear-gradient(
        to top,
        var(--orange) 0%,
        #ffffff 90%
    );

    img {
      width: 25px;
      height: 25px;
    }
  }

  &.toggled {
    justify-content: end;
    box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.3);
    background: #333;
    opacity: 0.7;

    .circle {
      background: linear-gradient(
          to top,
          #555 0%,
          #bbb 90%
      );
    }
  }
}


</style>
