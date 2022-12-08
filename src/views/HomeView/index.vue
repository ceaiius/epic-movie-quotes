<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="
      w-screen
      h-auto
      bg-gradient-to-t
      from-[#181623]
      via-[#191725]
      to-[#0D0B14]
    "
  >
    <NavBar />
    <NewsFeed />
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import NewsFeed from "@/views/HomeView/NewsFeed/Index.vue";
</script>