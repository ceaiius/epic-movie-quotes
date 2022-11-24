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
          <dialog-modal v-if="isQuoteSearch" @close="isQuoteSearch = false">
            <SearchDialog @close-search="isQuoteSearch = false" />
          </dialog-modal>
        </teleport>

        <teleport to="body">
          <dialog-modal v-if="isMovieSearch" @close="isMovieSearch = false">
            <SearchDialogMovie @close-search="isMovieSearch = false" />
          </dialog-modal>
        </teleport>

        <div id="navbar-default" class="">
          <ul class="flex p-4 rounded-lg text-white space-x-8">
            <li
              :class="hideSearch ? 'hidden' : ''"
              class="lg:hidden block"
              @click="
                routeIsMovie ? (isMovieSearch = true) : (isQuoteSearch = true)
              "
            >
              <img
                class="w-6 h-6 relative top-2 cursor-pointer"
                src="/images/search.svg"
                alt=""
              />
            </li>
            <li>
              <div class="relative" @click="openNotifications = true">
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
                  {{ credentials.count }}
                </div>
                <teleport to="body">
                  <dialog-modal
                    v-if="openNotifications"
                    top="lg:-translate-x-1/4 lg:-translate-y-1/3 lg:top-1/4 lg:mt-0 mt-28"
                    @close="openNotifications = false"
                  >
                    <NotificationDialog />
                  </dialog-modal>
                </teleport>
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
import { computed, onMounted, ref } from "vue";
import axios from "@/config/axios/jwt.js";
import { useRouter } from "vue-router";

import DialogModal from "./DialogModal.vue";
import HamburgerMenu from "../views/HomeView/NewsFeed/HamburgerMenu.vue";
import SearchDialog from "../views/HomeView/NewsFeed/Dialogs/SearchQuote.vue";
import SearchDialogMovie from "../views/HomeView/NewsFeed/Dialogs/SearchMovie.vue";
import NotificationDialog from "./NotificationDialog.vue";
import { useAuthStore } from "@/stores/auth";

import { i18n } from "../i18n";
import router from "../router";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
const authStore = useAuthStore();
const openNotifications = ref(false);
const routeIsMovie = ref(false);
const routeIsQuote = ref(false);
const hideSearch = ref(false);
router.beforeEach((from) => {
  if (from.name == "news-feed") {
    routeIsQuote.value = true;
    routeIsMovie.value = false;
    hideSearch.value = false;
  } else if (from.name == "list-of-movies") {
    routeIsQuote.value = false;
    routeIsMovie.value = true;
    hideSearch.value = false;
  } else {
    hideSearch.value = true;
  }
});

const isHamburgerClicked = ref(false);
const isQuoteSearch = ref(false);
const isMovieSearch = ref(false);
const notifications = ref([]);
const isOpenLogin = ref(false);

const isHiddenDropdown = ref(true);

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

onMounted(() => {
  const router = useRouter();
  handleNotifications();
  handleCount();
  if (router.currentRoute.value.name == "news-feed") {
    routeIsQuote.value = true;
    hideSearch.value = false;
  } else if (router.currentRoute.value.name == "list-of-movies") {
    routeIsMovie.value = true;
    hideSearch.value = false;
  } else if (
    router.currentRoute.value.name !== "list-of-movies" ||
    router.currentRoute.value.name !== "news-feed"
  ) {
    hideSearch.value = true;
  }
});

const handleCount = () => {
  const url_notifications = `${
    import.meta.env.VITE_API_BASE_URL
  }notifications-count`;
  axios.get(url_notifications).then((res) => {
    credentials.count = res.data;
  });
};

const handleNotifications = async () => {
  const url_notifications = `${import.meta.env.VITE_API_BASE_URL}notifications`;
  axios.get(url_notifications).then((res) => {
    notifications.value = res.data;
  });
};

setTimeout(() => {
  window.Echo.private("like-notification." + credentials.user_id).listen(
    ".notify-like",

    () => {
      handleNotifications();
      handleCount();
    }
  );
}, 500);

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
