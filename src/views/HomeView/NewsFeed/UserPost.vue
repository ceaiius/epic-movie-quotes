<template>
  <div class="flex flex-col mt-4 justify-around items-center w-full">
    <div>
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
      <div class="w-auto flex flex-col bg-[#11101A] mt-6 rounded-xl md:mb-12">
        <div class="flex items-center gap-2 m-6 text-white w-12 h-12">
          <img src="/images/static.png" alt="" />
          <h2 class="whitespace-nowrap">Maia Nakashidze</h2>
        </div>
        <div class="m-6">
          <h2 class="text-white">
            "Follow your dream." movie - <span>Billy Eliot</span> (2000)
          </h2>
          <img class="md:max-w-3xl mt-2" src="/images/movie-image.png" alt="" />
          <div class="flex gap-6 text-white m-6">
            <div class="flex gap-2 cursor-pointer">
              2 <img src="/images/comments.svg" alt="" />
            </div>
            <div class="flex gap-2 cursor-pointer">
              10 <img src="/images/likes.svg" alt="" />
            </div>
          </div>
          <hr class="border-[#efefef4d]" />
        </div>
        <div class="m-6 flex gap-6 text-white">
          <div>
            <img src="/images/static.png" class="md:w-12 md:h-12" alt="" />
          </div>
          <div>
            <h2>Nina Baldadze</h2>
            <p class="max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque nunc vel massa facilisis consequat elit morbi
              convallis convallis. Volutpat vitae et nisl et. Adipiscing enim
              integer mi leo nisl. Arcu vitae mauris odio eget.
            </p>
            <hr class="border-[#efefef4d] mt-6" />
          </div>
        </div>
        <div>
          <div class="m-6 flex">
            <img src="/images/static.png" class="w-12 h-12" alt="" />
            <textarea
              id=""
              class="
                w-full
                bg-[#24222F]
                pt-4
                pl-4
                ml-6
                rounded-xl
                outline-none
                text-white
              "
              cols="30"
              rows="2"
              :placeholder="commentLocale"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { i18n } from "../../../i18n";
const commentLocale = computed(
  () => i18n.global.messages[i18n.global.locale].NewsFeed.write_comment
);
const searchLocale = computed(
  () => i18n.global.messages[i18n.global.locale].NewsFeed.search
);
</script>