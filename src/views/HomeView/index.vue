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
import axios from "@/config/axios/index.js";
import { onMounted, ref } from "vue";
import { useCredentials } from "@/stores/index.js";

import NavBar from "../../components/NavBar.vue";
import NewsFeed from "../HomeView/NewsFeed/Index.vue";

const credentials = useCredentials();

const username = ref(credentials.username);
onMounted(() => {
  axios.get("user").then((res) => (username.value = res.data));
});
</script>