<template>
  <div
    class="
      lg:hidden
      flex-col flex-1
      bg-form_bg
      w-screen
      h-96
      relative
      -top-10
      md:rounded-xl
      rounded-none
    "
  >
    <div class="p-6">
      <div class="flex gap-4 items-center">
        <img
          :class="
            isActive('profile') ? 'border rounded-full border-red-500' : ''
          "
          src="/images/static.png"
          alt=""
        />
        <div>
          <h2 class="text-white text-2xl">{{ username }}</h2>
          <h3 class="text-input_bg text-base cursor-pointer">
            <router-link :to="{ name: 'profile' }"
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
      <div>
        <form @submit.prevent="handleLogout">
          <button
            type="submit"
            class="
              mt-10
              ml-4
              focus:outline-none
              text-white
              border border-white
              w-28
              h-10
              font-medium
              rounded-md
              text-sm
            "
            @click="isOpenLogin = true"
          >
            {{ $t("NewsFeed.log_out") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import router from "../../../router";
const username = ref("");
onMounted(() => {
  axios.get("user").then((res) => (username.value = res.data.username));
});
const isActive = (name) => {
  return name === useRouter().currentRoute.value.name;
};

const handleLogout = () => {
  document.cookie = `jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  router.push({ name: "landing" });
};
</script>