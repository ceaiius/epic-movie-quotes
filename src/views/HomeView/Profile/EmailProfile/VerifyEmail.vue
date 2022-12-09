<template>
  <div></div>
</template>
  
<script setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import axios from "@/config/axios/index.js";
const route = useRoute();
onBeforeMount(() => {
  if (route.query.token) {
    sendToken();
  } else {
    router.replace({ name: "denied" });
  }
});

const sendToken = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}emails-verify`;
  axios
    .post(url, {
      token: route.query.token,
    })
    .then(() => router.replace({ name: "email_profile" }));
};
</script>