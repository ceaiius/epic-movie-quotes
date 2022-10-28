<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-screen h-screen bg-gradient-to-tr from-[#191725] to-[#0D0B14]">
    <NavBar />
  </div>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import { onMounted, ref } from "vue";
import { useCredentials } from "@/stores/index.js";

import NavBar from "../../components/NavBar.vue";

const credentials = useCredentials();

const username = ref(credentials.username);
onMounted(() => {
  axios.get("user").then((res) => (username.value = res.data));
});
</script>