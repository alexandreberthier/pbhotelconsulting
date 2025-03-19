<template>
  <div class="app">
    <nav>
      <Navbar/>
    </nav>
    <main>
      <RouterView/>
    </main>
    <footer>
      <Footer id="contact"/>
    </footer>
  </div>
</template>

<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/sections/Footer.vue";
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;

  nav {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 30;
  }

  main {
    margin: 120px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}


</style>