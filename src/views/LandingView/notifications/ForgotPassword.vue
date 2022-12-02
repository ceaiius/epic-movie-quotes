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
        <Field v-slot="{ meta, field }" name="email" rules="required">
          <input
            v-bind="field"
            v-model="credentials.forgot_password_email"
            type="email"
            :class="[
              meta.valid && meta.touched ? ' border-green-500' : '',
              !meta.valid && meta.touched ? ' border-red-500' : '',
            ]"
            class="w-96 bg-input_bg text-sm h-10 p-2 border rounded relative"
            placeholder="Enter your email"
          />
        </Field>
        <h2
          v-if="credentials.wrong_email"
          class="
            text-default_red
            whitespace-nowrap
            text-center text-sm
            absolute
            top-16
          "
        >
          Invalid Email
        </h2>
        <ErrorMessage
          class="
            text-default_red
            whitespace-nowrap
            text-center text-sm
            absolute
            top-12
          "
          name="email"
        />
        <button
          class="
            text-white
            bg-default_red
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

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["openPasswordSent", "backToLogin"]);
const credentials = useCredentials();
</script>
  
   