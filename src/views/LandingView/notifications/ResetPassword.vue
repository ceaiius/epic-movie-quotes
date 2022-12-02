<template>
  <div>
    <div
      v-if="passwordNotReset"
      class="
        flex flex-col
        bg-form_bg
        md:w-input_width md:h-fit
        pb-12
        w-screen
        h-screen
        md:rounded-xl
        rounded-none
      "
    >
      <div class="mt-20 flex flex-col justify-center items-center gap-2">
        <h1 class="text-2xl font-bold text-white">Create new password</h1>
        <h2 class="text-grey_text text-center">
          Your new password must be different from previous used passwords
        </h2>
        <Form
          class="flex flex-col gap-6 relative"
          @submit="handleResetPassword"
        >
          <div class="flex flex-col pt-10 relative">
            <label
              for="exampleInputPassword1"
              class="text-white text-base pb-2"
              >{{ $t("RegistrationForm.password") }}</label
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
              class="text-default_red text-sm -bottom-6 absolute"
              name="password"
            />
          </div>
          <div class="flex flex-col pt-10 relative">
            <label
              for="exampleInputPassword1"
              class="text-white text-base pb-2"
              >{{ $t("RegistrationForm.confirm_password") }}</label
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
                :placeholder="placeholderConfirm"
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
              class="text-default_red text-sm -bottom-6 absolute"
              name="password_confirmation"
            />
          </div>
          <button
            class="
              text-white
              bg-default_red
              w-96
              h-12
              font-medium
              rounded-md
              text-sm
            "
            @click="$emit('closePasswordSent')"
          >
            Reset pasword
          </button>
        </Form>
        <div
          class="flex gap-6 mt-6 justify-center items-center text-grey_text"
          @click="$emit('backToLogin')"
        >
          <span class="cursor-pointer"
            ><img src="/images/back-arrow.svg" alt=""
          /></span>
          <p class="cursor-pointer">Back to login</p>
        </div>
      </div>
    </div>
    <teleport to="body">
      <dialog-modal v-if="isResetSuccessful" @close="closeSuccess">
        <ResetSuccess @close-reset-successful="closeSuccess" />
      </dialog-modal>
    </teleport>
  </div>
</template>
      
<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import axios from "@/config/axios/index.js";
import { computed, ref } from "vue";
import router from "../../../router";
import { useRoute } from "vue-router";
import ResetSuccess from "../notifications/ResetSuccess.vue";
import DialogModal from "@/components/DialogModal.vue";
import { useCredentials } from "@/stores/index.js";
import { i18n } from "../../../i18n";
const credentials = useCredentials();
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["closePasswordSent", "backToLogin"]);

const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const password = ref("");
const password_confirmation = ref("");
const route = useRoute();
const isResetSuccessful = ref(false);
const passwordNotReset = ref(true);
const closeSuccess = () => {
  isResetSuccessful.value = false;
  passwordNotReset.value = false;
  credentials.isOpenResetPassword = false;
  router.push({ name: "landing" });
};
const placeholderPassword = computed(
  () =>
    i18n.global.messages[i18n.global.locale].RegistrationForm
      .password_placeholder
);

const placeholderConfirm = computed(
  () =>
    i18n.global.messages[i18n.global.locale].RegistrationForm
      .confirm_placeholder
);

const handleResetPassword = async () => {
  try {
    await axios.post("reset-password", {
      token: route.query.token,
      email: route.query.email,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    isResetSuccessful.value = true;
    passwordNotReset.value = false;
  } catch (err) {
    console.log(err);
  }
};
</script>
      
       