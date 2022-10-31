<template>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          nunc vel massa facilisis consequat elit morbi convallis convallis.
          Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu
          vitae mauris odio eget.
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
</template>

<script setup>
import { computed } from "vue";
import { i18n } from "../../../i18n";
const commentLocale = computed(
  () => i18n.global.messages[i18n.global.locale].NewsFeed.write_comment
);
</script>