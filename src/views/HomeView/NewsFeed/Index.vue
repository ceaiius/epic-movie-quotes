<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-start">
    <div class="lg:flex flex-col ml-6 mt-10 flex-1 hidden">
      <div class="flex gap-4 items-center">
        <img src="/images/static.png" alt="" />
        <div>
          <h2 class="text-white text-2xl">{{ username }}</h2>
          <h3 class="text-input_bg text-base cursor-pointer">
            {{ $t("NewsFeed.edit_profile") }}
          </h3>
        </div>
      </div>
      <div class="ml-4 mt-6 flex gap-8 items-center text-white">
        <img src="/images/home.svg" alt="" />
        <h2 class="cursor-pointer">{{ $t("NewsFeed.news_feed") }}</h2>
      </div>
      <div class="ml-4 mt-6 flex gap-8 items-center text-white">
        <img src="/images/camera.svg" alt="" />
        <h2 class="cursor-pointer">{{ $t("NewsFeed.list_of_movies") }}</h2>
      </div>
    </div>
    <div class="flex lg:mt-10 mt-0 relative flex-col">
      <div class="flex">
        <div
          class="
            lg:w-56
            w-full
            lg:h-14
            h-32
            flex
            items-center
            bg-[#24222F]
            md:rounded-xl
            rounded-none
          "
        >
          <div class="flex pl-8 md:pl-4 gap-4 cursor-pointer">
            <img src="/images/pencil.svg" alt="" />
            <h2 class="text-white">{{ $t("NewsFeed.write_new_quote") }}</h2>
          </div>
        </div>

        <div class="h-[52px] lg:flex hidden relative ml-6">
          <div class="flex items-center">
            <img class="absolute" src="/images/search.svg" alt="" />
            <input
              class="w-[686px] text-white bg-transparent pl-10 outline-none"
              type="text"
              :placeholder="searchLocale"
            />
            <hr class="border-[#efefef4d] mt-6" />
          </div>
        </div>
      </div>

      <UserPost />
    </div>
    <div class="flex-1"></div>
  </div>
</template>

<script setup>
import UserPost from "./UserPost.vue";
import axios from "@/config/axios/index.js";
import { computed, onMounted, ref } from "vue";
import { i18n } from "../../../i18n";
import { useCredentials } from "@/stores/index.js";

const credentials = useCredentials();
const searchLocale = computed(
  () => i18n.global.messages[i18n.global.locale].NewsFeed.search
);

const username = ref(credentials.username);
onMounted(() => {
  axios.get("user").then((res) => (username.value = res.data));
});
</script>