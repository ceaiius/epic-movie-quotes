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
      <img src="/images/success.png" alt="success image" />
      <h1 class="text-2xl font-bold text-white">
        {{ $t("login_form.success") }}
      </h1>
      <h2 class="text-grey_text text-center">
        {{ $t("login_form.password_changed") }}
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
          hover:bg-button_hover
        "
        @click="$emit('closeResetSuccessful')"
      >
        {{ $t("login_form.go_to_news_feed") }}
      </button>
    </div>
  </div>
</template>
      
<script setup>
defineEmits(["closeResetSuccessful"]);
</script>
      
       