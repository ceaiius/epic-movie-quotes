<template>
  <div
    :class="[
      editUsername ? 'hidden' : '',
      editPassword ? 'hidden' : '',
      editEmail ? 'hidden' : '',
    ]"
    class="lg:hidden flex-col mt-10 items-center gap-20 w-full flex"
  >
    <div class="flex flex-col gap-2">
      <img src="/images/static.png" alt="" />
      <h2 class="text-white">{{ $t("Profile.upload_new_photo") }}</h2>
    </div>
    <div class="flex flex-col w-96 text-white">
      <h2 class="pl-6">{{ $t("Profile.username") }}</h2>
      <div class="flex justify-between p-6">
        <h2>Nino tabagari</h2>
        <h2 class="cursor-pointer" @click="editUsername = true">Edit</h2>
      </div>
      <teleport to="body">
        <dialog-modal v-if="editUsername" @close="editUsername = false">
          <EnterUsername @exit="editUsername = false" />
        </dialog-modal>
      </teleport>
      <hr class="border-[#efefef4d]" />
    </div>
    <div class="flex flex-col w-96 text-white">
      <h2 class="pl-6">{{ $t("Profile.password") }}</h2>
      <div class="flex justify-between p-6">
        <img class="w-36" src="/images/password.svg" alt="" />
        <h2 class="cursor-pointer" @click="editPassword = true">Edit</h2>
      </div>
      <teleport to="body">
        <dialog-modal v-if="editPassword" @close="editPassword = false">
          <EditPassword @exit="editPassword = false" />
        </dialog-modal>
      </teleport>
      <hr class="border-[#efefef4d]" />
    </div>
    <div class="flex flex-col w-96 text-white">
      <div class="flex justify-between items-center p-6">
        <h2>Email</h2>
        <img
          class="w-2 cursor-pointer"
          src="/images/right-arrow.svg"
          alt=""
          @click="editEmail = true"
        />
      </div>
      <teleport to="body">
        <dialog-modal v-if="editEmail" @close="editEmail = false">
          <EditEmail @exit="editEmail = false" />
        </dialog-modal>
      </teleport>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DialogModal from "../../../../components/DialogModal.vue";
import EditPassword from "./EditPassword.vue";
import EnterUsername from "./EnterUsername.vue";
import EditEmail from "./EditEmail.vue";
const editUsername = ref(false);
const editPassword = ref(false);
const editEmail = ref(false);
</script>