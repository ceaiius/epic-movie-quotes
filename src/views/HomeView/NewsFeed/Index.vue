<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-start min-h-screen">
    <div class="lg:flex flex-col ml-6 mt-10 hidden">
      <div class="flex gap-4 items-center">
        <img
          :class="[
            isActive('google_profile')
              ? 'border rounded-full border-red-500'
              : '',
            isActive('email_profile')
              ? 'border rounded-full border-red-500'
              : '',
          ]"
          src="/images/static.png"
          alt=""
        />
        <div>
          <h2 class="text-white text-2xl">{{ credentials.user_name }}</h2>
          <h3 class="text-input_bg text-base cursor-pointer">
            <router-link
              :to="{ name: googleUser ? 'google_profile' : 'email_profile' }"
              ><h2 class="cursor-pointer">
                {{ $t("NewsFeed.edit_profile") }}
              </h2></router-link
            >
          </h3>
        </div>
      </div>
      <div class="ml-4 mt-6 flex gap-8 items-center text-white">
        <img
          class="w-8 h-8"
          :src="
            isActive('news-feed')
              ? '/images/home.svg'
              : '/images/home-white.svg'
          "
          alt=""
        />

        <router-link :to="{ name: 'news-feed' }">
          <h2 class="cursor-pointer">{{ $t("NewsFeed.news_feed") }}</h2>
        </router-link>
      </div>
      <div class="ml-4 mt-6 flex gap-8 items-center text-white">
        <img
          :src="
            isActive('list-of-movies')
              ? '/images/camera-white.png'
              : '/images/camera.svg'
          "
          alt=""
        />
        <router-link :to="{ name: 'list-of-movies' }"
          ><h2 class="cursor-pointer">
            {{ $t("NewsFeed.list_of_movies") }}
          </h2></router-link
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import { onMounted, ref } from "vue";
import { useCredentials } from "@/stores/index.js";
import { useRouter } from "vue-router";
const credentials = useCredentials();
const googleUser = ref(false);
onMounted(() => {
  axios.get("user").then((res) => {
    credentials.user_name = res.data.username;
    credentials.user_id = res.data.id;
    if (res.data.email_verified_at == null) {
      googleUser.value = true;
    } else {
      googleUser.value = false;
    }
  });
});

const isActive = (name) => {
  return name === useRouter().currentRoute.value.name;
};
</script>