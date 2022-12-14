<template>
  <div class="flex flex-col bg-black_bg w-96 h-60 md:rounded-xl rounded-xl">
    <div
      class="flex flex-col w-full justify-center text-white items-center h-full"
    >
      <h1>{{ $t("profile.are_you_sure_to_make_changes") }}</h1>
      <hr class="border-hr_color w-full mt-10" />
      <div class="flex w-full justify-between items-center pl-10 pr-10 mt-10">
        <h2 class="cursor-pointer" @click="$emit('exit')">
          {{ $t("profile.cancel") }}
        </h2>
        <button
          class="
            text-white
            bg-default_red
            w-28
            h-10
            font-medium
            rounded-md
            text-sm
            hover:bg-button_hover
          "
          @click="handeClick"
        >
          {{ $t("profile.confirm") }}
        </button>
      </div>
      <teleport to="body">
        <dialog-modal
          v-if="credentials.username_taken"
          top="top-[20%]"
          @close="credentials.username_taken = false"
        >
          <ErrorDialog
            message="Username has already been taken!"
            @exit="(credentials.username_taken = false), $emit('exit')"
          />
        </dialog-modal>
      </teleport>
    </div>
  </div>
</template>
  
<script setup>
import axios from "@/config/axios/index.js";
import { useCredentials } from "@/stores/index.js";
import DialogModal from "@/components/DialogModal.vue";
import ErrorDialog from "@/views/HomeView/Profile/GoogleProfile/ErrorDialog.vue";
const credentials = useCredentials();
const emit = defineEmits(["exit", "save"]);
const handeClick = async () => {
  try {
    await axios.post("update", {
      username: credentials.username_edit,
    });
    credentials.success_username = true;

    emit("exit");
    credentials.can_edit_username_popup = false;
    credentials.can_edit_password_popup = false;
    credentials.confirmed_username_edit = credentials.username_edit;
    credentials.username_taken = false;
  } catch (err) {
    credentials.username_taken = true;
  }
};
</script>