<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-start">
    <div class="flex flex-col ml-6 mt-10 flex-1">
      <div class="flex gap-4 items-center">
        <img src="/images/static.png" alt="" />
        <div>
          <h2 class="text-white text-2xl">Nino Tabagari</h2>
          <h3 class="text-input_bg text-base">Edit your profile</h3>
        </div>
      </div>
      <div class="ml-4 mt-6 flex gap-8 items-center text-white">
        <img src="/images/home.svg" alt="" />
        <h2>News Feed</h2>
      </div>
      <div class="ml-4 mt-6 flex gap-8 items-center text-white">
        <img src="/images/camera.svg" alt="" />
        <h2>List of movies</h2>
      </div>
    </div>
    <div class="flex mt-10 relative flex-col">
      <div class="flex">
        <div class="w-56 h-14 flex items-center bg-[#24222F] rounded-xl">
          <div class="flex pl-4 gap-4 cursor-pointer">
            <img src="/images/pencil.svg" alt="" />
            <h2 class="text-white">Write new quote</h2>
          </div>
        </div>

        <div class="h-[52px] flex relative ml-6">
          <div class="flex items-center">
            <img class="absolute" src="/images/search.svg" alt="" />
            <input
              class="
                w-[686px]
                text-white
                bg-transparent
                pl-10
                focus:outline-none
              "
              type="text"
              placeholder="Enter @ to search movies, Enter # to search quotes "
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
</script>