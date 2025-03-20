<template>
  <div aria-label="Main navigation" :class="['nav-wrapper', { shrink: isScrolling }]">
    <router-link class="left" :to="{name: 'home'}">
      <img :src="getImage('ic_pb_logo.png')" alt="Logo, back to start">
    </router-link>
    <div class="right">
      <ul :id="'navigation-menu'" role="menu" class="links" :class="{ 'show': showMenu }">
        <li
            @click="closeMenu"
            v-for="(link, index) in navLinks" :key="index" role="menuitem">
          <router-link :to="{ name: link.route, hash: link.hash }">
            <span>{{ t(link.text) }}</span>
          </router-link>
        </li>
      </ul>
      <div class="selection">
        <LightToggle v-if="false"/>
        <DropDown
            v-model:selected-value="globalStore.selectedLanguage"
            :options="globalStore.languageOptions"
        />
      </div>
      <button
          @click="toggleMenu"
          :class="['burger-menu', { rotate: showMenu }]"
          :aria-expanded="showMenu"
          aria-controls="navigation-menu"
          aria-label="Navigation umschalten"
      >
        <span aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DropDown from "@/components/DropDown.vue";
import {useGlobalStore} from "@/stores/globalStore.ts";
import LightToggle from "@/components/LightToggle.vue";
import {onMounted, onUnmounted, ref, type Ref} from "vue";
import {getImage} from "@/utils/ImageUtils.ts";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";

interface Link {
  route: string,
  text: string,
  hash?: string
}

const {t} = useI18n()

const globalStore = useGlobalStore();

const showMenu: Ref<boolean> = ref(false)

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function closeMenu() {
  showMenu.value = false
}

const navLinks: Ref<Link[]> = ref([

  {
    route: 'home',
    text: 'about',
    hash: '#about'
  },
  {
    route: 'home',
    text: 'services',
    hash: '#services'
  },
  {
    route: 'home',
    text: 'team',
    hash: '#team'
  },
  {
    route: 'home',
    text: 'contact',
    hash: '#contact'
  }
])

const isScrolling: Ref<boolean> = ref(false);
const prevYPosition: Ref<number> = ref(0);
const scrollYPosition: Ref<number> = ref(0);
const isTicking: Ref<boolean> = ref(false);
const scrollTimeout: Ref<number | null> = ref(null);

function checkScroll() {
  if (!isTicking.value) {
    isTicking.value = true;
    requestAnimationFrame(() => {
      scrollYPosition.value = window.scrollY;
      if (scrollYPosition.value > prevYPosition.value) {
        isScrolling.value = true;
      }
      prevYPosition.value = scrollYPosition.value;

      if (scrollTimeout.value !== null) {
        clearTimeout(scrollTimeout.value);
      }

      scrollTimeout.value = window.setTimeout(() => {
        isScrolling.value = false;
      }, 200);

      isTicking.value = false;
    })
  }
}

onMounted(() => {
  prevYPosition.value = window.scrollY;
  window.addEventListener("scroll", checkScroll)
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll)
  if (scrollTimeout.value !== null) {
    clearTimeout(scrollTimeout.value)
  }
})
</script>

<style scoped>
.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  background: var(--white);
  height: 100px;
  width: 100%;
  transition: all 250ms ease-in-out;

  &.shrink {
    height: 50px;
  }

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      width: 180px;
      height: auto;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    width: 100%;

    .links {
      margin: 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--white);
      width: 100%;
      height: 100%;
      z-index: 10;
      display: flex;
      flex-direction: column;
      padding: 100px;
      gap: 32px;
      transition: all 250ms ease-in-out;
      opacity: 0;
      transform: translateX(-100%);

      li {
        all: unset;
      }

      a {
        span {
          font-size: 36px;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            background: var(--darkgray);
            height: 3px;
            width: 0;
            bottom: 0;
            left: 0;
            transition: all 250ms ease-in-out;
          }
        }

        &:hover {
          span {
            &:after {
              width: 100%;
            }
          }
        }
      }

      &.show {
        opacity: 1;
        transform: translateX(0);
      }

    }

    .selection {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .burger-menu {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      border: 1px solid var(--gray);
      border-radius: 4px;
      cursor: pointer;
      z-index: 20;
      background: var(--white);
      flex-shrink: 0;

      span {
        background: var(--darkblue);
        height: 3px;
        width: 90%;
        position: relative;
        transition: all 250ms ease-in-out;

        &:after, &:before {
          content: '';
          position: absolute;
          background: var(--darkblue);
          height: 3px;
          width: 100%;
          transition: all 250ms ease-in-out;
        }

        &:after {
          top: 9px;
          left: 0;
        }

        &:before {
          top: -9px;
          left: 0;
        }

      }

      &.rotate {
        span {
          background: transparent;

          &:after {
            top: 0;
            transform: rotate(45deg);
          }

          &:before {
            top: 0;
            transform: rotate(-45deg);
          }

        }
      }
    }
  }
}

@media (min-width: 740px) {
  .nav-wrapper {
    padding: 8px 20px;

    .left {
      img {
        width: 200px;
        height: auto;
      }
    }

    .right {
      gap: 16px;

      .links {
        a {
          span {
            font-size: 38px;
          }
        }
      }

      .selection {
        gap: 16px;
      }
    }
  }
}

@media (min-width: 1200px) {
  .nav-wrapper {
    padding: 12px 28px;

    .left {
      width: 50%;

      img {
        width: 220px;
      }
    }

    .right {
      gap: 16px;
      width: 40%;
      justify-content: space-between;

      .links {
        position: static;
        width: unset;
        height: unset;
        padding: 0;
        opacity: 1;
        flex-direction: row;
        gap: 60px;

        a {
          span {
            font-size: 28px;
          }
        }
      }

      .selection {
        gap: 16px;
      }

      .burger-menu {
        display: none;
      }
    }
  }
}

</style>
