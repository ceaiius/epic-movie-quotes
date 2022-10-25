<template>
  <div
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
    <div class="mt-20 flex flex-col justify-center items-center gap-6">
      <img src="/images/send-email.png" alt="" />
      <h1 class="text-2xl font-bold text-white">Forgot password?</h1>
      <h2 class="text-grey_text text-center">
        Enter the email and we’ll send an email with instructions to reset your
        password
      </h2>
      <Form
        class="flex flex-col gap-6 relative"
        @submit="$emit('openPasswordSent')"
      >
        <Field
          v-model="email"
          type="email"
          name="email"
          :rules="validateEmail"
          class="
            w-96
            bg-input_bg
            text-sm
            h-10
            p-2
            border
            border-input_bg
            rounded
          "
          placeholder="Enter your email"
        />
        <ErrorMessage
          class="text-red whitespace-nowrap text-center text-sm absolute top-12"
          name="email"
        />
        <button
          class="
            text-white
            bg-red
            w-96
            h-12
            font-medium
            rounded-md
            text-sm
            mt-6
          "
        >
          Send instructions
        </button>
      </Form>

      <div
        class="flex gap-6 justify-center items-center text-grey_text"
        @click="$emit('backToLogin')"
      >
        <span class="cursor-pointer"
          ><img src="/images/back-arrow.svg" alt=""
        /></span>
        <p class="cursor-pointer">Back to login</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { useCredentials } from "@/stores/index.js";

import { computed, onMounted } from "vue";
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["openPasswordSent", "backToLogin"]);
const credentials = useCredentials();
const email = computed({
  get() {
    return credentials.forgot_password_email
      ? credentials.forgot_password_email
      : "";
  },

  set(value) {
    credentials.setForgotPasswordEmail(value);
  },
});

onMounted(() => {
  credentials.getForgotPasswordEmail();
});

const validateEmail = (value) => {
  // if the field is empty
  if (!value) {
    return "This field is required";
  }

  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }

  return true;
};
</script>
  
   