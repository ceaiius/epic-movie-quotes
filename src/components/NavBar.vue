<template>
  <div>
    <nav class="px-2 sm:px-4 py-4 rounded bg-[#181624]">
      <div
        class="container flex flex-wrap justify-between items-center mx-auto"
      >
        <span
          class="
            self-center
            text-base
            font-semibold
            whitespace-nowrap
            text-brown
          "
          >Movie Quotes</span
        >

        <div id="navbar-default" class="">
          <ul class="flex p-4 rounded-lg text-white space-x-8">
            <li>
              <div>
                <img
                  src="/images/bell.svg"
                  class="w-6 h-6 relative top-2"
                  alt=""
                />
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
                  @click="changeLanguage(language.value)"
                >
                  {{ language.value }}
                </a>
              </div>
            </li>

            <li @click="isHiddenDropdown = true">
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
                  Log Out
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
import router from "../router";

const isOpenLogin = ref(false);

const isHiddenDropdown = ref(true);

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
</script>
