<template>
  <div
    class="
      flex flex-col
      bg-[#24222F]
      w-screen
      h-60
      lg:hidden
      md:rounded-xl
      rounded-none
    "
  >
    <teleport to="body">
      <dialog-modal v-if="confirmUsername" @close="confirmUsername = false">
        <ConfirmPopup @exit="confirmUsername = false" />
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
        $t("profile.enter_new_username")
      }}</label>
      <Form
        class="relative w-full flex flex-col gap-6 justify-center items-center"
        @submit="handleSubmit"
      >
        <Field
          v-slot="{ meta, field }"
          name="username"
          rules="username|required|min:3|max:15"
        >
          <input
            id="email"
            v-bind="field"
            v-model="username"
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
            hover:bg-button_hover
          "
        >
          {{ $t("profile.add") }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCredentials } from "@/stores/index.js";
import ConfirmPopup from "@/views/HomeView/Profile/EmailProfile/ConfirmPopup.vue";
import { Form, Field } from "vee-validate";
import DialogModal from "@/components/DialogModal.vue";
const credentials = useCredentials();
const confirmUsername = ref(false);
defineEmits(["exit"]);
const username = ref("");

const handleSubmit = () => {
  credentials.username_edit = username.value;

  confirmUsername.value = true;
};
</script>