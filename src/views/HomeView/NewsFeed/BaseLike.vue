<template>
  <img :src="liked ? '/images/red-like.svg' : '/images/likes.svg'" alt="" />
</template>

<script setup>
import axios from "@/config/axios/index.js";

import { onMounted } from "vue";
import { ref } from "vue";
const props = defineProps(["id"]);
const liked = ref(false);
onMounted(() => {
  axios
    .post("check", {
      quote_id: props.id,
    })
    .then((res) => (liked.value = res.data));
});
window.Echo.channel(`like-channel`).listen(".add-like", (e) => {
  if (e.like.quote_id == props.id) {
    axios
      .post("check", {
        quote_id: props.id,
      })
      .then((res) => (liked.value = res.data));
  }
});
</script>