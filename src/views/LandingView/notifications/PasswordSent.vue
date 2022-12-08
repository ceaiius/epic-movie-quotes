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
        {{ $t("login_form.check_your_email") }}
      </h1>
      <h2 class="text-grey_text text-center">
        {{ $t("login_form.we_have_sent_password_recovery") }}
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
        "
        @click="$emit('closePasswordSent')"
      >
        {{ $t("login_form.go_to_my_email") }}
      </button>
      <div
        class="flex gap-6 justify-center items-center text-grey_text"
        @click="$emit('skip')"
      >
        <p class="cursor-pointer">{{ $t("login_form.skip") }}</p>
      </div>
    </div>
  </div>
</template>
    
<script setup>
defineEmits(["closePasswordSent", "skip"]);
</script>
    
     