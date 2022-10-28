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
import { onBeforeMount, onMounted, ref } from "vue";
import { useCredentials } from "@/stores/index.js";
import { useRoute } from "vue-router";
import { setJwtToken } from "../../helpers/jwt";
const credentials = useCredentials();

const username = ref(credentials.username);
onMounted(() => {
  axios.get("user").then((res) => (username.value = res.data));
});
onBeforeMount(() => {
  const route = useRoute();

  if (route.query.token) {
    setJwtToken(route.query.token, route.query.expires_in, 1000);
  }
});
console.log(username);
const handleLogout = () => {
  document.cookie = `jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  router.push({ name: "landing" });
};
</script>