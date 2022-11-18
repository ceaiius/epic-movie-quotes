<template>
  <div
    class="
      flex flex-col
      bg-[#24222F]
      w-screen
      h-auto
      lg:hidden
      md:rounded-xl
      rounded-none
    "
  >
    <div
      class="
        relative
        flex flex-col
        gap-6
        justify-center
        items-center
        mt-10
        mb-10
      "
    >
      <h2></h2>
      <img
        class="cursor-pointer absolute top-0 right-6"
        src="/images/exit.svg"
        alt=""
        @click="$emit('exit')"
      />
      <div class="relative w-96">
        <div class="flex flex-col gap-2">
          <label class="text-white" for="primary">
            {{ $t("Profile.primary_email") }}</label
          >
          <input
            id="email"
            v-model="email"
            class="bg-rgba w-full text-sm text-white h-10 p-2 border-2 rounded"
            readonly
          />
          <img
            class="absolute top-11 right-3"
            src="/images/checked_round.svg"
            alt=""
          />
          <hr class="border-[#efefef4d] mt-5" />
        </div>
      </div>
      <div class="w-96 flex flex-col gap-4">
        <h2 class="text-white">wiqjei@gmail.com</h2>
        <div class="flex w-full justify-between items-center">
          <button
            type="submit"
            class="
              focus:outline-none
              text-white
              border border-white
              w-48
              h-10
              font-medium
              rounded-md
              text-sm
            "
          >
            {{ $t("Profile.make_this_primary") }}
          </button>
          <h2 class="text-grey">{{ $t("Profile.remove") }}</h2>
        </div>
      </div>
      <div class="w-96 flex flex-col gap-4">
        <h2>{{ $t("Profile.add_new_email") }}</h2>
        <button
          type="submit"
          class="
            focus:outline-none
            text-white
            border border-white
            w-full
            gap-2
            h-10
            flex
            justify-center
            items-center
            font-medium
            rounded-md
            text-sm
          "
          @click="addEmail = true"
        >
          <span><img src="/images/plus.svg" alt="" /></span>
          {{ $t("Profile.add_new_email") }}
        </button>
      </div>
      <div v-if="addEmail" class="w-96">
        <div class="flex flex-col gap-4">
          <label for="email">Add new email</label>
          <input id="email" class="w-96 text-sm h-10 p-2 border-2 rounded" />
          <button
            class="
              text-white
              bg-default_red
              w-28
              h-10
              font-medium
              rounded-md
              text-sm
            "
            @click="confirm = true"
          >
            {{ $t("Profile.add") }}
          </button>
        </div>
        <teleport to="body">
          <dialog-modal v-if="confirm" @close="confirm = false">
            <ConfirmPopup @exit="confirm = false" @save="confirm = false" />
          </dialog-modal>
        </teleport>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onBeforeMount, ref } from "vue";
import axios from "@/config/axios/index.js";
import ConfirmPopup from "./ConfirmPopup.vue";
import DialogModal from "../../../../components/DialogModal.vue";
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["exit"]);
const email = ref();
const confirm = ref();
const addEmail = ref(false);
onBeforeMount(() => {
  axios.get("user").then((res) => {
    email.value = res.data.email;
  });
});
</script>