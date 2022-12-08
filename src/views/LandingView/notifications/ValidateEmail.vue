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
        {{ $t("login_form.thank_you") }}
      </h1>
      <h2 class="text-white text-center">
        {{ $t("login_form.activate_account") }}
      </h2>
      <button
        class="
          text-white
          bg-default_red
          w-96
          h-12
          font-medium
          rounded-md
          text-sm
          mt-8
        "
        @click="$emit('closeValidate')"
      >
        {{ $t("login_form.please_check") }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(["closeValidate"]);
</script>

