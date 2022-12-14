<template>
  <div>
    <div
      v-if="isNotRegistered"
      class="
        flex flex-col
        items-center
        md:rounded-xl
        rounded-none
        bg-form_bg
        md:w-input_width md:h-fit
        pb-12
        w-screen
        h-screen
        justify-center
      "
    >
      <div>
        <img
          class="block md:hidden absolute top-10 left-10 cursor-pointer"
          src="/images/back-arrow.svg"
          alt="back arrow icon"
          @click="$emit('closeDialog')"
        />
      </div>
      <div class="pt-8 text-center">
        <h1 class="text-white text-xl md:text-3xl">
          {{ $t("registration_form.create_an_account") }}
        </h1>
        <h3 class="text-grey_text text-base pt-2">
          {{ $t("registration_form.start_journey") }}
        </h3>
      </div>
      <div class="w-full xs:w-96">
        <Form class="pl-4 pr-4" @submit="handleRegister">
          <div class="flex flex-col pt-4 relative">
            <label for="exampleInputEmail1" class="text-white text-base pb-2">{{
              $t("registration_form.name")
            }}</label>
            <Field
              v-slot="{ meta, field }"
              name="username"
              rules="username|required|min:3|max:15"
            >
              <input
                v-bind="field"
                v-model="username"
                :class="[
                  meta.valid && meta.touched ? ' border-green-500' : '',
                  !meta.valid && meta.touched ? ' border-red-500' : '',
                ]"
                type="text"
                class="bg-input_bg text-sm h-10 w-full p-2 border-2 rounded"
                :placeholder="$t('registration_form.username_placeholder')"
                @focus="nameTaken = false"
              />
              <span>
                <img
                  :class="[
                    meta.valid && meta.touched ? 'block' : 'hidden',
                    !meta.valid && meta.touched ? 'hidden' : 'block',
                  ]"
                  class="w-6 h-6 absolute top-14 right-2"
                  src="/images/valid.svg"
                  alt="valid icon"
                />
                <img
                  :class="[
                    meta.valid && meta.touched ? 'hidden' : 'block',
                    !meta.valid && meta.touched ? 'block' : 'hidden',
                  ]"
                  class="w-6 h-6 absolute top-14 right-2"
                  src="/images/invalid.svg"
                  alt="invalid icon"
                />
              </span>
            </Field>

            <ErrorMessage
              class="text-default_red text-sm -bottom-12 absolute"
              name="username"
            />
            <p
              v-if="nameTaken"
              class="
                text-default_red
                whitespace-nowrap
                text-center text-sm
                -bottom-6
                absolute
              "
            >
              {{ $t("registration_form.username_taken") }}
            </p>
          </div>
          <div class="flex flex-col pt-12 relative">
            <label for="email" class="text-white text-base pb-2">{{
              $t("registration_form.email")
            }}</label>
            <Field v-slot="{ meta, field }" name="email" rules="required|email">
              <input
                v-model="email"
                v-bind="field"
                type="email"
                rules="required|email"
                :class="[
                  meta.valid && meta.touched ? ' border-green-500' : '',
                  !meta.valid && meta.touched ? ' border-red-500' : '',
                ]"
                class="bg-input_bg text-sm h-10 p-2 border-2 rounded"
                :placeholder="$t('registration_form.email_placeholder')"
                @focus="emailTaken = false"
              />
              <span>
                <img
                  :class="[
                    meta.valid && meta.touched ? 'block' : 'hidden',
                    !meta.valid && meta.touched ? 'hidden' : 'block',
                  ]"
                  class="w-6 h-6 absolute top-register_top right-2"
                  src="/images/valid.svg"
                  alt="valid icon"
                />
                <img
                  :class="[
                    meta.valid && meta.touched ? 'hidden' : 'block',
                    !meta.valid && meta.touched ? 'block' : 'hidden',
                  ]"
                  class="w-6 h-6 absolute top-register_top right-2"
                  src="/images/invalid.svg"
                  alt="invalid icon"
                />
              </span>
            </Field>

            <ErrorMessage
              class="text-default_red text-sm -bottom-12 absolute"
              name="email"
            />
            <p
              v-if="emailTaken"
              class="
                text-default_red
                whitespace-nowrap
                text-center text-sm
                -bottom-6
                absolute
              "
            >
              {{ $t("registration_form.email_taken") }}
            </p>
          </div>

          <div class="flex flex-col pt-12 relative">
            <label
              for="exampleInputPassword1"
              class="text-white text-base pb-2"
              >{{ $t("registration_form.password") }}</label
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
                :placeholder="$t('registration_form.password_placeholder')"
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
                  top-register_top
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
                  top-register_top
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
              class="text-default_red text-center text-sm -bottom-10 absolute"
              name="password"
            />
          </div>
          <div class="flex flex-col pt-10 relative">
            <label
              for="exampleInputPassword1"
              class="text-white text-base pb-2"
              >{{ $t("registration_form.confirm_password") }}</label
            >
            <Field
              v-slot="{ meta, field }"
              name="password_confirmation"
              rules="required|min:8|max:15|confirmed:@password"
            >
              <input
                v-bind="field"
                v-model="password_confirmation"
                :type="[showPasswordConfirm ? 'text' : 'password']"
                :class="[
                  meta.valid && meta.touched ? ' border-green-500' : '',
                  !meta.valid && meta.touched ? ' border-red-500' : '',
                ]"
                class="bg-input_bg text-sm h-10 p-2 border-2 rounded"
                :placeholder="$t('registration_form.confirm_placeholder')"
              />
            </Field>

            <span @click="showPasswordConfirm = !showPasswordConfirm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                :class="[showPasswordConfirm ? 'block' : 'hidden']"
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
                :class="[showPasswordConfirm ? 'hidden' : 'block']"
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
              class="text-default_red text-center text-sm -bottom-8 absolute"
              name="password_confirmation"
            />
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
              mt-10
              hover:bg-button_hover
            "
            :disabled="loading"
          >
            <LoadingSpinner v-if="loading" />
            <span v-else>{{ $t("registration_form.sign_up") }}</span>
          </button>
        </Form>
        <form :action="url" class="pl-4 pr-4">
          <button
            class="
              flex
              justify-center
              items-center
              gap-2
              mt-6
              focus:outline-none
              text-white
              border border-white
              w-full
              h-12
              font-medium
              rounded-md
              text-sm
            "
            type="submit"
          >
            <span><img src="/images/google.svg" alt="google icon" /></span>
            {{ $t("registration_form.sign_up_with_google") }}
          </button>
        </form>
        <p class="text-center pt-4 text-grey_text">
          {{ $t("registration_form.already_have_an_account") }}
          <a
            class="text-link cursor-pointer underline"
            @click="$emit('openLogin')"
            >{{ $t("registration_form.log_in") }}</a
          >
        </p>
      </div>
    </div>
    <teleport to="body">
      <dialog-modal
        v-if="isOpenValidation"
        @close="
          (isOpenValidation = false), (credentials.isOpenRegister = false)
        "
      >
        <ValidateEmail
          @close-validate="
            (isOpenValidation = false), (credentials.isOpenRegister = false)
          "
        />
      </dialog-modal>
    </teleport>
  </div>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import DialogModal from "@/components/DialogModal.vue";
import ValidateEmail from "@/views/LandingView/notifications/ValidateEmail.vue";
import { useCredentials } from "@/stores/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
const credentials = useCredentials();
defineEmits(["openLogin", "closeDialog"]);
const loading = ref(false);
const isOpenValidation = ref(false);
const isNotRegistered = ref(true);
const url = import.meta.env.VITE_API_GOOGLE_URL;

const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const nameTaken = ref(false);
const emailTaken = ref(false);
const handleRegister = (values) => {
  loading.value = true;
  axios
    .post("register", {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    })
    .then(() => {
      isOpenValidation.value = true;
      isNotRegistered.value = false;
      localStorage.clear();
    })
    .catch((error) => {
      if (error.response.data.errors.username) {
        nameTaken.value = true;
      }
      if (error.response.data.errors.email) {
        emailTaken.value = true;
      }

      console.log(error.response.data);
    })
    .finally(() => (loading.value = false));
};
</script>
 
