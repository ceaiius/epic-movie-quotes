<template>
  <div
    class="
      flex flex-col
      bg-[#24222F]
      w-screen
      lg:w-[120%]
      h-60
      md:rounded-xl
      rounded-none
    "
  >
    <teleport to="body">
      <dialog-modal v-if="confirmEmail" @close="confirmEmail = false">
        <ConfirmEmail @save="addEmail" @exit="confirmEmail = false" />
      </dialog-modal>
    </teleport>
    <div class="relative flex flex-col gap-6 justify-center items-center mt-10">
      <img
        class="cursor-pointer absolute top-0 right-6"
        src="/images/exit.svg"
        alt="exit icon"
        @click="$emit('exit')"
      />

      <label for="username" class="text-white">{{
        $t("profile.enter_new_email")
      }}</label>
      <Form
        class="relative w-full flex flex-col gap-6 justify-center items-center"
        @submit="handleSubmit"
      >
        <Field v-slot="{ meta, field }" name="email" rules="email|required">
          <input
            id="email"
            v-model="email"
            v-bind="field"
            :class="[
              meta.valid && meta.touched ? ' border-green-500' : '',
              !meta.valid && meta.touched ? ' border-red-500' : '',
            ]"
            class="xs:w-96 w-full text-sm h-10 p-2 border-2 rounded"
          />
        </Field>

        <button
          type="submit"
          class="
            text-white
            bg-default_red
            w-32
            h-12
            font-medium
            rounded-md
            text-sm
          "
        >
          {{ $t("profile.add") }}
        </button>
      </Form>
    </div>
  </div>
</template>
  
<script setup>
import { Form, Field } from "vee-validate";

import { ref } from "vue";
import axios from "@/config/axios/index.js";
import ConfirmEmail from "@/views/HomeView/Profile/EmailProfile/ConfirmEmail.vue";
import DialogModal from "@/components/DialogModal.vue";
import { useCredentials } from "@/stores/index.js";
const emit = defineEmits(["exit", "fetch"]);
const credentials = useCredentials();
const confirmEmail = ref(false);
const email = ref();
const handleSubmit = async () => {
  confirmEmail.value = true;
  credentials.loading = false;
};
const addEmail = async () => {
  try {
    credentials.loading = true;
    await axios.post("emails-store", {
      email: email.value,
    });
    emit("fetch");
    emit("exit");
    confirmEmail.value = false;
    credentials.success_email = true;
  } catch (err) {
    console.log(err);
    credentials.loading = false;
  }
};
</script>