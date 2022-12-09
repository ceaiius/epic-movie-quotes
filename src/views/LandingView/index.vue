<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div
    class="
      h-screen
      relative
      bg-fixed bg-gradient-to-tr
      from-black_bg
      to-[#08080D]
    "
    :class="onBlurBackground"
  >
    <nav class="px-2 sm:px-4 py-4 rounded">
      <div
        class="
          container
          flex
          sm:flex-wrap sm:justify-between
          items-center
          mx-auto
        "
      >
        <span
          class="
            self-center
            text-base
            font-semibold
            whitespace-nowrap
            text-brown
          "
          >{{ $t("landing_page.movie_quotes") }}</span
        >

        <div id="navbar-default" class="">
          <ul class="flex p-4 rounded-lg text-white space-x-8">
            <li class="mt-2" @click="toggleLanguageSelect">
              <a class="flex justify-center items-center gap-2"
                >{{ activeLanguage }}

                <span><img src="/images/arrow.svg" alt="arrow icon" /></span
              ></a>
              <div v-if="!isHiddenDropdown">
                <a
                  v-for="language in filteredLanguage"
                  :key="language.value"
                  class="absolute"
                  @click="
                    changeLanguage(language.value),
                      (localeDefault = !localeDefault),
                      setLanguage(),
                      changeLocale()
                  "
                >
                  {{ language.value }}
                </a>
              </div>
            </li>
            <li class="hidden md:block" @click="isHiddenDropdown = true">
              <button
                type="button"
                class="
                  focus:outline-none
                  text-white
                  bg-default_red
                  w-28
                  h-10
                  font-medium
                  rounded-md
                  text-sm
                "
                @click="credentials.isOpenRegister = true"
              >
                {{ $t("landing_page.sign_up") }}
              </button>
            </li>
            <li @click="isHiddenDropdown = true">
              <button
                type="button"
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
                @click="credentials.isOpenLogin = true"
              >
                {{ $t("landing_page.log_in") }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <teleport to="body">
      <dialog-modal
        v-if="credentials.isOpenRegister"
        @close="credentials.isOpenRegister = false"
      >
        <RegistrationForm
          @open-login="
            (credentials.isOpenRegister = false),
              (credentials.isOpenLogin = true)
          "
          @close-dialog="credentials.isOpenRegister = false"
        />
      </dialog-modal>
    </teleport>

    <teleport to="body">
      <dialog-modal
        v-if="credentials.isOpenLogin"
        @close="credentials.isOpenLogin = false"
      >
        <LoginForm
          @open-registration="
            (credentials.isOpenRegister = true),
              (credentials.isOpenLogin = false)
          "
          @close-dialog="credentials.isOpenLogin = false"
        />
      </dialog-modal>
    </teleport>

    <teleport to="body">
      <dialog-modal
        v-if="credentials.isOpenResetPassword"
        @close="credentials.isOpenResetPassword = false"
      >
        <ResetPassword
          @back-to-login="
            (credentials.isOpenResetPassword = false),
              (credentials.isOpenLogin = true)
          "
        />
      </dialog-modal>
    </teleport>

    <teleport to="body">
      <dialog-modal v-if="emailValidated" @close="closeSuccess">
        <ValidationSucessfull @close-validation-successful="closeSuccess" />
      </dialog-modal>
    </teleport>

    <div
      class="flex flex-col items-center justify-center"
      @click="isHiddenDropdown = true"
    >
      <header>
        <h1
          class="
            text-brown
            md:text-4xl
            lg:text-6xl
            font-bold
            text-center
            md:leading-relaxed
            text-xl
            whitespace-nowrap
            mt-52
          "
        >
          {{ $t("landing_page.find_any_quote_in") }} <br />
          {{ $t("landing_page.millions_of_movie_lines") }}
        </h1>
      </header>
      <button
        type="button"
        class="
          text-white
          bg-default_red
          w-28
          h-10
          font-medium
          rounded-md
          text-sm
          mt-6
        "
        @click="credentials.isOpenRegister = true"
      >
        {{ $t("landing_page.get_started") }}
      </button>
    </div>
  </div>
  <div class="hidden lg:block">
    <div
      class="bg-fixed h-screen bg-[url('/images/image1.png')] flex items-center"
    >
      <div class="ml-52 flex flex-col gap-4">
        <span class="relative top-large_dash_top right-large_dash_right"
          ><img src="/images/line.svg" alt="line icon"
        /></span>

        <h1 class="text-white lg:text-5xl text-sm flex">
          “ {{ $t("landing_page.you_have_to_leave_something") }}<br />
          {{ $t("landing_page.behind_to_go_forward") }}”
        </h1>

        <h2 class="text-grey text-3xl">
          {{ $t("landing_page.interstellar") }}, 2014
        </h2>
      </div>
    </div>

    <div
      class="bg-fixed h-screen bg-[url('/images/image3.png')] flex items-center"
    >
      <div class="ml-52 flex flex-col gap-4">
        <span class="relative top-large_dash_top right-large_dash_right"
          ><img src="/images/line.svg" alt="line icon"
        /></span>

        <h1 class="text-white lg:text-5xl text-sm flex">
          {{ $t("landing_page.i_think_we_re_just_gonna_have") }},
          <br />
          {{ $t("landing_page.to_be_secretly_in_love_with_each_other") }}
          <br />
          {{ $t("landing_page.and_leave_it_that") }}
        </h1>

        <h2 class="text-grey text-3xl">
          {{ $t("landing_page.the_royal_tenenbaums") }}, 2001
        </h2>
      </div>
    </div>
    <div
      class="bg-fixed h-screen bg-[url('/images/image2.png')] flex items-center"
    >
      <div class="ml-52 flex flex-col gap-4">
        <span class="relative top-large_dash_top right-large_dash_right"
          ><img src="/images/line.svg" alt="line image"
        /></span>

        <h1 class="text-white lg:text-5xl text-sm flex">
          “{{ $t("landing_page.I_see_in_your_eyes_the_same") }} <br />
          {{ $t("landing_page.fear_that_would_take_the") }} <br />
          {{ $t("landing_page.heart_of_me") }}”
        </h1>

        <h2 class="text-grey text-3xl">
          {{ $t("landing_page.the_lord_of_the_rings") }}, 2003
        </h2>
      </div>
    </div>
  </div>
  <div class="block lg:hidden">
    <div class="flex flex-col justify-center items-center">
      <img src="/images/image1.png" alt="interstellar icon" />
      <div class="absolute">
        <span class="relative top-small_dash_top right-small_dash_right"
          ><img src="/images/small-line.png" alt="small line image"
        /></span>
        <h1 class="text-white text-xl flex">
          “ {{ $t("landing_page.you_have_to_leave_something") }}<br />
          {{ $t("landing_page.behind_to_go_forward") }}”
        </h1>

        <h2 class="text-grey text-lg">
          {{ $t("landing_page.interstellar") }}, 2014
        </h2>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <img src="/images/image3.png" alt="royal tenenbaums image" />
      <div class="absolute">
        <span class="relative top-small_dash_top right-small_dash_right"
          ><img src="/images/small-line.png" alt="small line image"
        /></span>
        <h1 class="text-white text-xl flex">
          {{ $t("landing_page.i_think_we_re_just_gonna_have") }},
          <br />
          {{ $t("landing_page.to_be_secretly_in_love") }}

          <br />
          {{ $t("landing_page.and_leave_it_that") }}
        </h1>

        <h2 class="text-grey text-lg">
          {{ $t("landing_page.the_royal_tenenbaums") }}, 2001
        </h2>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <img src="/images/image2.png" alt="lord of the rings image" />
      <div class="absolute">
        <span class="relative top-small_dash_top right-small_dash_right"
          ><img src="/images/small-line.png" alt="small line icon"
        /></span>
        <h1 class="text-white text-xl flex">
          “{{ $t("landing_page.I_see_in_your_eyes_the_same") }} <br />
          {{ $t("landing_page.fear_that_would_take_the") }} <br />
          {{ $t("landing_page.heart_of_me") }}”
        </h1>

        <h2 class="text-grey text-lg">
          {{ $t("landing_page.the_lord_of_the_rings") }}, 2003
        </h2>
      </div>
    </div>
  </div>

  <footer class="p-4 bg-gradient-to-tr from-[#181623] to-[#191725]">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
      >© 2022 <a>{{ $t("landing_page.movie_quotes") }}</a
      >. {{ $t("landing_page.all_rights_reserved") }}
    </span>
  </footer>
</template>



<script setup>
import { computed, onMounted, ref } from "vue";
import DialogModal from "@/components/DialogModal.vue";
import RegistrationForm from "@/views/LandingView/RegistrationForm.vue";
import LoginForm from "@/views/LandingView/LoginForm.vue";
import ResetPassword from "@/views/LandingView/notifications/ResetPassword.vue";
import { useRoute } from "vue-router";
import { i18n } from "@/i18n";
import { setLocale } from "@vee-validate/i18n";
import router from "@/router";
import ValidationSucessfull from "@/views/LandingView/notifications/ValidationSucessfull.vue";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();

const isHiddenDropdown = ref(true);
const localeDefault = ref(true);
const emailValidated = ref(false);

const closeSuccess = () => {
  emailValidated.value = false;

  router.push({ name: "landing" });
};

const changeLocale = () => {
  i18n.global.locale = activeLanguage.value;
};

const setLanguage = () => {
  if (localeDefault.value == true) {
    setLocale("en");
  } else if (localeDefault.value == false) {
    setLocale("ka");
  }
};
const onBlurBackground = computed(() => {
  return credentials.isOpenRegister ||
    credentials.isOpenLogin ||
    credentials.isOpenResetPassword
    ? "blur-[2px]"
    : "blur-none";
});

onMounted(() => {
  const route = useRoute();

  if (route.query.token && route.query.token !== "verified") {
    credentials.isOpenResetPassword = true;
  }
  if (route.query.token == "verified") {
    emailValidated.value = true;
  }
});

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


