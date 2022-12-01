<template>
  <div>
    <div
      v-if="isNotLogged"
      class="
        flex flex-col
        items-center
        bg-form_bg
        md:w-input_width md:h-fit
        pb-12
        w-screen
        h-screen
        md:rounded-xl
        rounded-none
        justify-center
      "
    >
      <div>
        <img
          class="block md:hidden absolute left-10 cursor-pointer"
          src="/images/back-arrow.svg"
          alt=""
          @click="$emit('closeDialog')"
        />
      </div>
      <div class="text-center pt-12">
        <h1 class="text-white text-3xl">
          {{ $t("LoginForm.log_in_your_account") }}
        </h1>
        <h3 class="text-grey_text text-base pt-2">
          {{ $t("LoginForm.welcome_back") }}
        </h3>
      </div>
      <div class="w-96">
        <Form class="pl-4" @submit="handleLogin">
          <div class="flex flex-col pt-6 relative">
            <label for="email" class="text-white text-base pb-2">{{
              $t("LoginForm.email")
            }}</label>
            <Field v-slot="{ meta, field }" name="email" rules="required|email">
              <input
                v-model="email"
                class="bg-input_bg text-sm h-10 p-2 border-2 rounded"
                :class="[
                  meta.valid && meta.touched ? 'border-green-500' : '',
                  !meta.valid && meta.touched ? ' border-red-500' : '',
                ]"
                type="email"
                v-bind="field"
                :placeholder="placeholderEmail"
              />
              <span>
                <img
                  :class="[
                    meta.valid && meta.touched ? 'block' : 'hidden',
                    !meta.valid && meta.touched ? 'hidden' : 'block',
                  ]"
                  class="w-6 h-6 absolute top-16 right-2"
                  src="/images/valid.svg"
                  alt=""
                />
                <img
                  :class="[
                    meta.valid && meta.touched ? 'hidden' : 'block',
                    !meta.valid && meta.touched ? 'block' : 'hidden',
                  ]"
                  class="w-6 h-6 absolute top-16 right-2"
                  src="/images/invalid.svg"
                  alt=""
                />
              </span>
            </Field>

            <ErrorMessage
              class="text-default_red text-sm -bottom-6 absolute"
              name="email"
            />
            <p
              v-if="error"
              class="
                text-default_red
                whitespace-nowrap
                text-center text-sm
                -bottom-6
                absolute
              "
            >
              {{ $t("LoginForm.wrong_email_or_password") }}
            </p>
          </div>
          <div class="flex flex-col pt-10 relative">
            <label
              for="exampleInputPassword1"
              class="text-white text-base pb-2"
              >{{ $t("LoginForm.password") }}</label
            >
            <Field
              v-slot="{ meta, field }"
              name="password"
              rules="required|min:8|max:15"
            >
              <input
                v-bind="field"
                v-model="password"
                :class="[
                  meta.valid && meta.touched ? ' border-green-500' : '',
                  !meta.valid && meta.touched ? ' border-red-500' : '',
                ]"
                :type="[showPassword ? 'text' : 'password']"
                class="bg-input_bg text-sm h-10 p-2 border-2 rounded"
                :placeholder="placeholderPassword"
              />
            </Field>
            <span @click="showPassword = !showPassword">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                :class="[showPassword ? 'block' : 'hidden']"
                class="
                  w-6
                  h-6
                  absolute
                  top-20
                  right-2
                  cursor-pointer
                  fill-transparent
                  stroke-[#7F8487]
                "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                :class="[showPassword ? 'hidden' : 'block']"
                class="
                  w-6
                  h-6
                  absolute
                  top-20
                  right-2
                  cursor-pointer
                  stroke-[#7F8487]
                "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </span>
            <ErrorMessage
              class="text-default_red whitespace-nowrap text-sm relative top-2"
              name="password"
            />
          </div>
          <div class="flex items-center mt-2 gap-2">
            <input
              id="default-checkbox"
              v-model="remember"
              name="remember"
              type="checkbox"
              true-value="yes"
              false-value="no"
              class="w-4 h-4 bg-gray-100 rounded"
            />
            <label for="default-checkbox" class="text-white text-base"
              >{{ $t("LoginForm.remember_me") }}
            </label>
            <a
              class="ml-10 text-link underline cursor-pointer"
              @click="(isOpenForgotPassword = true), (isNotLogged = false)"
              >{{ $t("LoginForm.forgot_password") }}</a
            >
          </div>

          <div class="whitespace-nowrap mt-4">
            <span v-if="errorInput" class="text-default_red text-sm absolute">{{
              errorMessage
            }}</span>
          </div>

          <button
            type="submit"
            class="
              text-white
              bg-default_red
              w-full
              h-12
              font-medium
              rounded-md
              text-sm
              mt-8
            "
          >
            {{ $t("LoginForm.sign_in") }}
          </button>
        </Form>
        <form :action="url">
          <button
            class="
              flex
              justify-center
              items-center
              gap-2
              mt-6
              ml-4
              focus:outline-none
              text-white
              border border-white
              w-google_input_width
              h-12
              font-medium
              rounded-md
              text-sm
            "
            type="submit"
          >
            <span><img src="/images/google.svg" alt="" /></span
            >{{ $t("LoginForm.sign_in_google") }}
          </button>
        </form>
        <p class="text-center pt-4 text-grey_text">
          {{ $t("LoginForm.no_account") }}
          <a
            class="text-link cursor-pointer underline"
            @click="$emit('openRegistration')"
            >{{ $t("LoginForm.sign_up") }}</a
          >
        </p>
      </div>
    </div>
    <teleport to="body">
      <dialog-modal
        v-if="isOpenForgotPassword"
        @close="
          (isOpenForgotPassword = false), (credentials.isOpenLogin = false)
        "
      >
        <ForgotPassword
          @back-to-login="
            (isOpenForgotPassword = false), (credentials.isOpenLogin = true)
          "
          @open-password-sent="handleForgotPassword"
        />
      </dialog-modal>
    </teleport>
    <teleport to="body">
      <dialog-modal
        v-if="isOpenPasswordSent"
        @close="(isOpenPasswordSent = false), (credentials.isOpenLogin = false)"
      >
        <PasswordSent
          @skip="(isOpenPasswordSent = false), (credentials.isOpenLogin = true)"
          @close-password-sent="
            (isOpenPasswordSent = false), (credentials.isOpenLogin = false)
          "
        />
      </dialog-modal>
    </teleport>
  </div>
</template>

<script setup>
import axios from "@/config/axios/jwt.js";
import { Field, Form, ErrorMessage } from "vee-validate";
import DialogModal from "@/components/DialogModal.vue";
import ForgotPassword from "./notifications/ForgotPassword.vue";
import { computed, ref } from "vue";

import router from "../../router";
import PasswordSent from "./notifications/PasswordSent.vue";
import { useCredentials } from "@/stores/index.js";
import { i18n } from "../../i18n";
import { useAuthStore } from "@/stores/auth";
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["openRegistration", "closeDialog"]);
const authStore = useAuthStore();
const error = ref(false);
const email = ref("");
const password = ref("");
const errorInput = ref(false);
const remember = ref("");
const errorMessage = ref("");
const isOpenForgotPassword = ref(false);
const showPassword = ref(false);
const isNotLogged = ref(true);
const isOpenPasswordSent = ref(false);
const credentials = useCredentials();
const url = import.meta.env.VITE_API_GOOGLE_URL;
const handleForgotPassword = async () => {
  isOpenPasswordSent.value = true;
  isOpenForgotPassword.value = false;
  axios.post("forgot-password", {
    email: credentials.forgot_password_email,
  });
};

const handleLogin = async () => {
  try {
    await axios.post(`login`, {
      email: email.value,
      password: password.value,
      remember: remember.value,
    });
    authStore.authenticated = true;
    router.push({ name: "home" });
  } catch (err) {
    error.value = true;
    console.log(err);
  }
};
const placeholderPassword = computed(
  () => i18n.global.messages[i18n.global.locale].LoginForm.password_placeholder
);

const placeholderEmail = computed(
  () => i18n.global.messages[i18n.global.locale].LoginForm.email_placeholder
);
</script>
 
  