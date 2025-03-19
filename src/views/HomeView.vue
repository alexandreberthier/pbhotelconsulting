<template>
  <div class="section-wrapper">
    <HeroSection id="hero"/>
    <AboutSection id="about"/>
    <ServicesSection id="services"/>
    <ClientMarqueeSection/>
    <TestimonialSection/>
    <TeamSection id="team"/>
  </div>
</template>

<script setup lang="ts">

import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import ServicesSection from "@/components/sections/ServicesSection.vue";
import ClientMarqueeSection from "@/components/sections/ClientMarqueeSection.vue";
import TestimonialSection from "@/components/sections/TestimonialSection.vue";
import TeamSection from "@/components/sections/TeamSection.vue";

</script>

<style scoped>

.section-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 90px;
}

@media (min-width: 740px) {
  .section-wrapper {
    gap: 110px;
  }
}

@media (min-width: 1200px) {
  .section-wrapper {
    gap: 120px;
  }
}

@media (min-width: 1440px) {
  .section-wrapper {
    gap: 160px;
  }
}


</style>