<template>
  <div></div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { setJwtToken } from "../../helpers/jwt";
import router from "../../router";
onBeforeMount(() => {
  const route = useRoute();

  if (route.query.token) {
    setJwtToken(route.query.token, route.query.expires_in, 1000);
  }
  router.replace({ name: "home" });
});
</script>