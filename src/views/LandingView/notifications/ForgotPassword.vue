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
      <img src="/images/send-email.png" alt="send email image" />
      <h1 class="text-2xl font-bold text-white">
        {{ $t("login_form.forgot_password_question") }}?
      </h1>
      <h2 class="text-grey_text text-center px-4">
        {{ $t("login_form.instructions") }}
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
            :placeholder="$t('registration_form.email_placeholder')"
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
          {{ $t("login_form.invalid_email") }}
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
            hover:bg-button_hover
          "
          :disabled="credentials.loading"
        >
          <LoadingSpinner v-if="credentials.loading" />
          <span v-else> {{ $t("login_form.send_instructions") }}</span>
        </button>
      </Form>

      <div
        class="flex gap-6 justify-center items-center text-grey_text"
        @click="$emit('backToLogin')"
      >
        <span class="cursor-pointer"
          ><img src="/images/back-arrow.svg" alt="back arrow icon"
        /></span>
        <p class="cursor-pointer">{{ $t("login_form.back_to_login") }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { useCredentials } from "@/stores/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
defineEmits(["openPasswordSent", "backToLogin"]);
const credentials = useCredentials();
</script>
  
   