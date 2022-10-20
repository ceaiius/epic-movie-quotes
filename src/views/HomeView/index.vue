<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>News feed</div>
  <form @submit.prevent="handleLogout">
    <button>Log out</button>
  </form>
  <h1>{{ username }}</h1>
</template>

<script setup>
import router from "../../router";

import axios from "@/config/axios/index.js";
import { onMounted, ref } from "vue";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();

const username = ref(credentials.username);
onMounted(() => {
  axios.get("user").then((res) => (username.value = res.data));
});
console.log(username);
const handleLogout = () => {
  document.cookie = `jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  router.push({ name: "landing" });
};
</script>