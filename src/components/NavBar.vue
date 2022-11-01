<template>
  <div>
    <nav class="px-2 sm:px-4 py-4 rounded bg-[#181624]">
      <div
        class="container flex flex-wrap justify-between items-center mx-auto"
      >
        <span
          class="
            lg:block
            hidden
            self-center
            text-base
            font-semibold
            whitespace-nowrap
            text-brown
          "
          >{{ $t("NewsFeed.movie_quotes") }}</span
        >

        <teleport to="body">
          <dialog-modal
            v-if="isHamburgerClicked"
            top="top-1/3"
            @close="isHamburgerClicked = false"
          >
            <HamburgerMenu />
          </dialog-modal>
        </teleport>

        <span @click="isHamburgerClicked = true">
          <img
            src="/images/hamburger.svg"
            class="inline-flex items-center rounded-lg lg:hidden cursor-pointer"
            alt=""
          />
        </span>

        <teleport to="body">
          <dialog-modal v-if="isSearchClicked" @close="isSearchClicked = false">
            <SearchDialog @close-search="isSearchClicked = false" />
          </dialog-modal>
        </teleport>

        <div id="navbar-default" class="">
          <ul class="flex p-4 rounded-lg text-white space-x-8">
            <li class="lg:hidden block" @click="isSearchClicked = true">
              <img
                class="w-6 h-6 relative top-2 cursor-pointer"
                src="/images/search.svg"
                alt=""
              />
            </li>
            <li>
              <div class="relative">
                <img
                  src="/images/bell.svg"
                  class="w-6 h-6 relative top-2 cursor-pointer"
                  alt=""
                />
                <div
                  class="
                    w-6
                    h-6
                    bg-default_red
                    rounded-[50%]
                    absolute
                    top-0
                    left-3
                    flex
                    justify-center
                    items-center
                    text-sm
                  "
                >
                  0
                </div>
              </div>
            </li>

            <li class="mt-2" @click="toggleLanguageSelect">
              <a class="flex justify-center items-center gap-2"
                >{{ activeLanguage }}

                <span><img src="/images/arrow.svg" alt="" /></span
              ></a>
              <div v-if="!isHiddenDropdown">
                <a
                  v-for="language in filteredLanguage"
                  :key="language.value"
                  class="absolute"
                  @click="changeLanguage(language.value), changeLocale()"
                >
                  {{ language.value }}
                </a>
              </div>
            </li>

            <li class="lg:block hidden" @click="isHiddenDropdown = true">
              <form @submit.prevent="handleLogout">
                <button
                  type="submit"
                  class="
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
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { setJwtToken } from "../helpers/jwt";
import DialogModal from "./DialogModal.vue";
import HamburgerMenu from "../views/HomeView/NewsFeed/HamburgerMenu.vue";
import SearchDialog from "../views/HomeView/NewsFeed/SearchDialog.vue";
import { i18n } from "../i18n";
import router from "../router";

const isHamburgerClicked = ref(false);
const isSearchClicked = ref(false);

const isOpenLogin = ref(false);

const isHiddenDropdown = ref(true);

const handleLogout = () => {
  document.cookie = `jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  router.push({ name: "landing" });
};

onBeforeMount(() => {
  const route = useRoute();

  if (route.query.token) {
    setJwtToken(route.query.token, route.query.expires_in, 1000);
  }
});

const changeLocale = () => {
  i18n.global.locale = activeLanguage.value;
};

const activeLanguage = ref("En");
const languages = [
  {
    value: "En",
  },
  {
    value: "Ka",
  },
];
const filteredLanguage = computed(() => {
  return languages.filter((language) => language.value != activeLanguage.value);
});

const changeLanguage = (lang) => {
  activeLanguage.value = lang;
};
const toggleLanguageSelect = () => {
  isHiddenDropdown.value = !isHiddenDropdown.value;
};
</script>
