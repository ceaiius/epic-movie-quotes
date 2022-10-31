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
        <img src="/images/static.png" alt="" />
        <div>
          <h2 class="text-white text-2xl">Nino Tabagari</h2>
          <h3 class="text-input_bg text-base cursor-pointer">
            {{ $t("NewsFeed.edit_profile") }}
          </h3>
        </div>
      </div>
      <div class="ml-4 mt-6 flex gap-8 items-center text-white">
        <img class="w-6 h-6" src="/images/home-white.svg" alt="" />
        <h2 class="cursor-pointer">{{ $t("NewsFeed.news_feed") }}</h2>
      </div>
      <div class="ml-4 mt-6 flex gap-8 items-center text-white">
        <img class="w-6 h-6" src="/images/camera.svg" alt="" />
        <h2 class="cursor-pointer">{{ $t("NewsFeed.list_of_movies") }}</h2>
      </div>
    </div>
  </div>
</template>