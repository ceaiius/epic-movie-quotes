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
            <h2 class="text-white" @click="openQuote = true">
              {{ $t("NewsFeed.write_new_quote") }}
            </h2>
          </div>
        </div>

        <teleport to="body">
          <dialog-modal v-if="openQuote" @close="openQuote = false">
            <QuoteDialog
              @update-quotes="getQuotes"
              @close-popup="openQuote = false"
            />
          </dialog-modal>
        </teleport>

        <div class="h-[52px] lg:flex hidden relative ml-6">
          <div class="flex items-center">
            <img class="absolute" src="/images/search.svg" alt="" />
            <input
              v-model="inputValue"
              class="w-[686px] text-white bg-transparent pl-10 outline-none"
              type="text"
              :placeholder="searchLocale"
            />
            <hr class="border-[#efefef4d] mt-6" />
          </div>
        </div>
      </div>
      <div
        v-for="item in searched"
        :key="item.id"
        class="w-auto flex flex-col bg-[#11101A] mt-6 rounded-xl md:mb-12"
      >
        <div>
          <div class="flex items-center gap-2 m-6 text-white w-12 h-12">
            <img src="/images/static.png" alt="" />
            <h2 class="whitespace-nowrap">{{ item.author.username }}</h2>
          </div>
          <div class="m-6">
            <h2 class="text-white">
              "{{ i18n.global.locale == "En" ? item.name.en : item.name.ka }}" -
              <span>{{
                i18n.global.locale == "En"
                  ? item.movies.name.en
                  : item.movies.name.ka
              }}</span>
              {{ item.movies.year }}
            </h2>
            <div class="flex justify-center mt-2">
              <img
                class="md:max-w-3xl mt-2"
                :src="url_thumbnail + item.thumbnail"
                alt=""
              />
            </div>

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
        </div>

        <div class="m-6 flex gap-6 relative text-white">
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
import { computed, onMounted, ref } from "vue";
import { i18n } from "../../../i18n";
import axios from "@/config/axios/index.js";
import DialogModal from "../../../components/DialogModal.vue";
import QuoteDialog from "./Dialogs/QuoteDialog.vue";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
const url = import.meta.env.VITE_API_BASE_URL + "quotes";
const openQuote = ref(false);
const inputValue = ref("");
const commentLocale = computed(
  () => i18n.global.messages[i18n.global.locale].NewsFeed.write_comment
);
const searchLocale = computed(
  () => i18n.global.messages[i18n.global.locale].NewsFeed.search
);
const data = ref([]);
const searched = computed(() => {
  if (inputValue.value || credentials.quote_search) {
    return data.value.filter((item) => {
      if (
        i18n.global.locale == "En" &&
        (inputValue.value.charAt(0) == "@" ||
          credentials.quote_search.charAt(0) == "@")
      ) {
        return item.movies.name.en
          .toLowerCase()
          .includes(
            inputValue.value.toLowerCase().replace("@", "") ||
              credentials.quote_search.toLowerCase().replace("@", "")
          );
      } else if (
        i18n.global.locale == "En" &&
        (inputValue.value.charAt(0) == "#" ||
          credentials.quote_search.charAt(0) == "#")
      ) {
        return item.name.en
          .toLowerCase()
          .includes(
            inputValue.value.toLowerCase().replace("#", "") ||
              credentials.quote_search.toLowerCase().replace("#", "")
          );
      } else if (
        i18n.global.locale == "Ka" &&
        (inputValue.value.charAt(0) == "@" ||
          credentials.quote_search.charAt(0) == "@")
      ) {
        return item.movies.name.ka.includes(
          inputValue.value.replace("@", "") ||
            credentials.quote_search.replace("@", "")
        );
      } else if (
        i18n.global.locale == "Ka" &&
        (inputValue.value.charAt(0) == "#" ||
          credentials.quote_search.charAt(0) == "#")
      ) {
        return item.name.ka.includes(
          inputValue.value.replace("#", "") ||
            credentials.quote_search.replace("#", "")
        );
      } else if (i18n.global.locale == "En") {
        return item.name.en
          .toLowerCase()
          .includes(
            inputValue.value.toLowerCase() ||
              credentials.quote_search.toLowerCase()
          );
      } else if (i18n.global.locale == "Ka") {
        return item.name.ka
          .toLowerCase()
          .includes(inputValue.value.toLowerCase() || credentials.quote_search);
      }
    });
  } else {
    return data.value;
  }
});
onMounted(() => {
  getQuotes();
});
const getQuotes = () => {
  axios.get(url).then((res) => {
    data.value = res.data;
    console.log(res.data);
  });
};
</script>