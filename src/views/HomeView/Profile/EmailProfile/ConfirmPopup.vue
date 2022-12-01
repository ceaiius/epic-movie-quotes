<template>
  <div
    class="
      flex flex-col
      bg-black_bg
      w-96
      h-60
      lg:hidden
      md:rounded-xl
      rounded-xl
    "
  >
    <div
      class="flex flex-col w-full justify-center text-white items-center h-full"
    >
      <h1>Are you sure to make changes?</h1>
      <hr class="border-hr_color w-full mt-10" />
      <div class="flex w-full justify-between items-center pl-10 pr-10 mt-10">
        <h2 class="cursor-pointer" @click="$emit('exit')">Cancel</h2>
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
          @click="handeClick"
        >
          {{ $t("Profile.confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import axios from "@/config/axios/index.js";
import { useCredentials } from "@/stores/index.js";

const credentials = useCredentials();
// eslint-disable-next-line no-unused-vars
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
  } catch (err) {
    console.log(err);
  }
};
</script>