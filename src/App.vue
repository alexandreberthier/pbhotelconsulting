<template>
  <div class="app">
    <nav>
      <Navbar/>
    </nav>
    <main>
      <RouterView/>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
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
    margin-top: 100px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}


</style>