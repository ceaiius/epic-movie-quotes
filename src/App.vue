<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

watch(
  () => route.name,
  async () => {
    document.title = (await route.meta.title) || "Epic Movie Qoutes";
  }
);
</script>
