<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col mt-10 items-center gap-20 w-full">
    <h2 class="text-white lg:block hidden">{{ $t("Profile.my_profile") }}</h2>
    <div class="flex w-full h-full lg:h-auto items-center justify-center">
      <div
        class="
          lg:w-2/3
          relative
          lg:rounded-2xl
          w-full
          h-full
          lg:h-[535px]
          flex
          justify-center
          text-center
          bg-black_bg
        "
      >
        <div class="flex flex-col gap-20">
          <div class="flex flex-col items-center">
            <img
              class="w-24 mt-20 lg:mt-0 lg:translate-y-[-50%] translate-y-0"
              src="/images/static.png"
              alt=""
            />
            <h2 class="text-white">{{ $t("Profile.upload_new_photo") }}</h2>
          </div>
          <div class="flex flex-col gap-20">
            <div
              class="
                flex
                items-center
                flex-col
                lg:flex-row
                gap-6
                relative
                w-80
                lg:w-96
              "
            >
              <h2 class="absolute -top-10 left-0 text-white">
                {{ $t("Profile.username") }}
              </h2>
              <input
                id="username"
                v-model="username"
                class="bg-input_bg w-full text-sm h-10 p-2 border-2 rounded"
                :readonly="isNotEditable"
              />
              <label
                class="lg:absolute lg:-right-20 text-white cursor-pointer"
                for="username"
                @click="isNotEditable = !isNotEditable"
                >{{ $t("Profile.edit") }}</label
              >
            </div>
            <hr class="border-[#efefef4d]" />
            <div class="flex flex-col items-center relative gap-6 w-80 lg:w-96">
              <label class="text-white absolute -top-10 left-0" for="email">{{
                $t("Profile.email")
              }}</label>
              <input
                id="email"
                v-model="email"
                class="bg-input_bg w-full text-sm h-10 p-2 border-2 rounded"
                readonly
              />

              <button
                type="button"
                class="
                  text-white
                  bg-default_red
                  w-40
                  h-10
                  font-medium
                  rounded-md
                  text-sm
                "
                :hidden="isNotEditable"
                @click="isOpenRegister = true"
              >
                {{ $t("MovieList.save_changes") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import axios from "@/config/axios/index.js";
import { i18n } from "../../../i18n";
const username = ref();
const email = ref();
const isNotEditable = ref(true);

onBeforeMount(() => {
  axios.get("user").then((res) => {
    email.value = res.data.email;
    username.value = res.data.username;
  });
});
</script>
