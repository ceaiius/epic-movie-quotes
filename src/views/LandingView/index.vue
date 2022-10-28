<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div
    class="
      h-screen
      relative
      bg-fixed bg-gradient-to-tr
      from-[#11101A]
      to-[#08080D]
    "
    :class="onBlurBackground"
  >
    <nav class="px-2 sm:px-4 py-4 rounded">
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
                  @click="
                    changeLanguage(language.value),
                      (localeDefault = !localeDefault),
                      setLanguage()
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
                  bg-red
                  w-28
                  h-10
                  font-medium
                  rounded-md
                  text-sm
                "
                @click="isOpenRegister = true"
              >
                Sign Up
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
                @click="isOpenLogin = true"
              >
                Log In
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <teleport to="body">
      <dialog-modal v-if="isOpenRegister" @close="isOpenRegister = false">
        <RegistrationForm
          @open-login="(isOpenRegister = false), (isOpenLogin = true)"
          @close-dialog="isOpenRegister = false"
        />
      </dialog-modal>
    </teleport>

    <teleport to="body">
      <dialog-modal v-if="isOpenLogin" @close="isOpenLogin = false">
        <LoginForm
          @open-registration="(isOpenRegister = true), (isOpenLogin = false)"
          @close-dialog="isOpenLogin = false"
        />
      </dialog-modal>
    </teleport>

    <teleport to="body">
      <dialog-modal v-if="canResetPassword" @close="canResetPassword = false">
        <ResetPassword
          @back-to-login="(canResetPassword = false), (isOpenLogin = true)"
        />
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
            text-2xl
            whitespace-nowrap
            mt-52
          "
        >
          Find any quote in <br />
          millions of movie lines
        </h1>
      </header>
      <button
        type="button"
        class="text-white bg-red w-28 h-10 font-medium rounded-md text-sm mt-6"
        @click="isOpenRegister = true"
      >
        Get Started
      </button>
    </div>
  </div>
  <div class="hidden lg:block">
    <div
      class="bg-fixed h-screen bg-[url('images/image1.png')] flex items-center"
    >
      <div class="ml-52 flex flex-col gap-4">
        <span class="relative top-large_dash_top right-large_dash_right"
          ><img src="/images/line.svg" alt=""
        /></span>

        <h1 class="text-white lg:text-5xl text-sm flex">
          “You have to leave something <br />
          behind to go forward”
        </h1>

        <h2 class="text-grey text-3xl">Interstellar, 2014</h2>
      </div>
    </div>

    <div
      class="bg-fixed h-screen bg-[url('images/image3.png')] flex items-center"
    >
      <div class="ml-52 flex flex-col gap-4">
        <span class="relative top-large_dash_top right-large_dash_right"
          ><img src="/images/line.svg" alt=""
        /></span>

        <h1 class="text-white lg:text-5xl text-sm flex">
          I think we’re just gonna have <br />
          to be secretly in love with earch other <br />
          and leave it that
        </h1>

        <h2 class="text-grey text-3xl">The Royal Tenenbaums, 2001</h2>
      </div>
    </div>
    <div
      class="bg-fixed h-screen bg-[url('images/image2.png')] flex items-center"
    >
      <div class="ml-52 flex flex-col gap-4">
        <span class="relative top-large_dash_top right-large_dash_right"
          ><img src="/images/line.svg" alt=""
        /></span>

        <h1 class="text-white lg:text-5xl text-sm flex">
          “I see in your eyes the same <br />
          fear that would take the <br />
          heart of me....”
        </h1>

        <h2 class="text-grey text-3xl">The Lord of the Rings, 2003</h2>
      </div>
    </div>
  </div>
  <div class="block lg:hidden">
    <div class="flex flex-col justify-center items-center">
      <img src="images/image1.png" alt="" />
      <div class="absolute">
        <span class="relative top-small_dash_top right-small_dash_right"
          ><img src="images/small-line.png" alt=""
        /></span>
        <h1 class="text-white text-xl flex">
          “You have to leave something <br />
          behind to go forward”
        </h1>

        <h2 class="text-grey text-lg">Interstellar, 2014</h2>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <img src="images/image3.png" alt="" />
      <div class="absolute">
        <span class="relative top-small_dash_top right-small_dash_right"
          ><img src="images/small-line.png" alt=""
        /></span>
        <h1 class="text-white text-xl flex">
          I think we’re just gonna have <br />
          to be secretly in love <br />
          with earch other and <br />
          leave it that
        </h1>

        <h2 class="text-grey text-lg">The Royal Tenenbaums, 2001</h2>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <img src="images/image2.png" alt="" />
      <div class="absolute">
        <span class="relative top-small_dash_top right-small_dash_right"
          ><img src="images/small-line.png" alt=""
        /></span>
        <h1 class="text-white text-xl flex">
          “I see in your eyes the same <br />
          fear that would take the <br />
          heart of me....”
        </h1>

        <h2 class="text-grey text-lg">The Lord of the Rings, 2003</h2>
      </div>
    </div>
  </div>

  <footer class="p-4 bg-gradient-to-tr from-[#181623] to-[#191725]">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
      >© 2022 <a>MOVIE QUOTES</a>. ALL RIGHTS RESERVED
    </span>
  </footer>
</template>



<script setup>
import { computed, onMounted, ref } from "vue";
import DialogModal from "@/components/DialogModal.vue";
import RegistrationForm from "./RegistrationForm.vue";
import LoginForm from "./LoginForm.vue";
import ResetPassword from "./notifications/ResetPassword.vue";
import { useRoute } from "vue-router";

import { setLocale } from "@vee-validate/i18n";

const isOpenRegister = ref(false);
const isOpenLogin = ref(false);
const canResetPassword = ref(false);
const isHiddenDropdown = ref(true);
const localeDefault = ref(true);

const setLanguage = () => {
  console.log(localeDefault.value);
  if (localeDefault.value == true) {
    setLocale("en");
  } else if (localeDefault.value == false) {
    setLocale("ka");
  }
};
const onBlurBackground = computed(() => {
  return isOpenRegister.value || isOpenLogin.value || canResetPassword.value
    ? "blur-[2px]"
    : "blur-none";
});

onMounted(() => {
  const route = useRoute();

  if (route.query.token) {
    canResetPassword.value = true;
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


