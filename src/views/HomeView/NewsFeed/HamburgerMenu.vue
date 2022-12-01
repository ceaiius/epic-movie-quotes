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
          :class="[
            isActive('google_profile')
              ? 'border rounded-full border-red-500'
              : '',
            isActive('email_profile')
              ? 'border rounded-full border-red-500'
              : '',
          ]"
          class="
            w-20
            h-20
            object-cover
            rounded-full
            lg:mt-0 lg:translate-y-[-50%]
            translate-y-0
          "
          :src="thumbnail(credentials.avatar)"
          alt=""
        />
        <div>
          <h2 class="text-white text-2xl">{{ username }}</h2>
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
import axios from "@/config/axios/jwt.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import router from "../../../router";
import { useAuthStore } from "@/stores/auth";
import { useCredentials } from "@/stores/index.js";
import { thumbnail } from "../../../helpers/thumbnail";
const credentials = useCredentials();
const username = ref("");
const authStore = useAuthStore();
const googleUser = ref(false);

onMounted(() => {
  axios.get("user").then((res) => {
    username.value = res.data.username;
    credentials.avatar = res.data.thumbnail;
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

const handleLogout = async () => {
  try {
    await axios.get("logout");
    authStore.authenticated = false;
  } catch (err) {
    console.log(err);
  } finally {
    router.push({ name: "landing" });
  }
};
</script>