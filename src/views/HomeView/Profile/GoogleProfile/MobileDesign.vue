<template>
  <div class="lg:hidden flex-col mt-10 items-center gap-20 w-full flex">
    <div class="flex flex-col gap-2">
      <img src="/images/static.png" alt="" />
      <h2 class="text-white">{{ $t("Profile.upload_new_photo") }}</h2>
    </div>
    <div class="flex flex-col w-96 text-white">
      <h2 class="pl-6">{{ $t("Profile.username") }}</h2>
      <div class="flex justify-between p-6">
        <h2>{{ username }}</h2>
        <h2 class="cursor-pointer" @click="editUsername = !editUsername">
          Edit
        </h2>
      </div>

      <div v-if="editUsername" class="flex flex-col gap-6">
        <input
          id="username"
          class="bg-input_bg w-96 text-black text-sm h-10 p-2 border-2 rounded"
        />
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
        <teleport to="body">
          <dialog-modal v-if="confirm" @close="confirm = false">
            <ConfirmPopup @exit="confirm = false" @save="confirm = false" />
          </dialog-modal>
        </teleport>
      </div>
    </div>
    <div class="flex flex-col w-96 text-white">
      <h2 class="pl-6">{{ $t("Profile.email") }}</h2>
      <div class="flex justify-between p-6">
        <h2>{{ email }}</h2>
      </div>

      <hr class="border-[#efefef4d]" />
    </div>
  </div>
</template>
  
  <script setup>
import { onBeforeMount, ref } from "vue";
import ConfirmPopup from "../EmailProfile/ConfirmPopup.vue";
import axios from "@/config/axios/index.js";
import DialogModal from "../../../../components/DialogModal.vue";
const username = ref();
const email = ref();
const confirm = ref();
const editUsername = ref(false);

onBeforeMount(() => {
  axios.get("user").then((res) => {
    email.value = res.data.email;
    username.value = res.data.username;
  });
});
</script>