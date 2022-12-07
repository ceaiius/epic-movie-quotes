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
        flex flex-col
        gap-6
        justify-center
        items-center
        ml-10
        mt-20
        mr-10
        mb-10
      "
    >
      <div class="w-full relative">
        <label class="text-white absolute -top-10 left-0" for="email">{{
          $t("Profile.primary_email")
        }}</label>

        <div class="">
          <input
            id="email"
            v-model="email"
            class="
              bg-rgba
              w-full
              text-sm text-white
              h-10
              p-2
              border border-[#198754]
              rounded
            "
            readonly
          />
          <img
            class="absolute top-3 right-3"
            src="/images/checked_round.svg"
            alt=""
          />
        </div>
        <hr class="mt-6 border-hr_color w-full" />
      </div>

      <div v-for="item in emails" :key="item.id" class="w-full relative">
        <div class="flex flex-col gap-6">
          <h2 class="text-white text-base">{{ item.email }}</h2>

          <div class="flex w-full justify-between items-center">
            <span
              v-if="item.email_verified_at == null"
              class="flex gap-2 text-sm italic"
            >
              <img src="/images/unvalidated.svg" alt="" />
              <h2>Not Verified</h2>
            </span>

            <button
              v-else
              type="button"
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
              @click="makePrimary(item.email)"
            >
              {{ $t("Profile.make_this_primary") }}
            </button>
            <h2 class="text-grey cursor-pointer" @click="deleteEmail(item.id)">
              {{ $t("Profile.remove") }}
            </h2>
          </div>
        </div>
        <hr class="mt-6 border-hr_color w-full" />
      </div>
      <teleport to="body">
        <dialog-modal
          v-if="credentials.can_edit_email_popup"
          @close="credentials.can_edit_email_popup = false"
        >
          <EnterEmail
            @exit="credentials.can_edit_email_popup = false"
            @fetch="getEmails"
          />
        </dialog-modal>
      </teleport>
      <div class="w-full">
        <button
          type="button"
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
          @click="credentials.can_edit_email_popup = true"
        >
          <span><img src="/images/plus.svg" alt="" /></span>
          {{ $t("Profile.add_new_email") }}
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onBeforeMount, ref } from "vue";
import axios from "@/config/axios/index.js";

import DialogModal from "@/components/DialogModal.vue";
import EnterEmail from "@/views/HomeView/Profile/EmailProfile/EnterEmail.vue";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["exit"]);
const email = ref();
const emails = ref([]);
onBeforeMount(() => {
  fetchUser();
  getEmails();
});

const fetchUser = () => {
  axios.get("user").then((res) => {
    email.value = res.data.email;
  });
};

const deleteEmail = (id) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}emails/${id}`;
  axios.delete(url).then((res) => {
    if (res.status === 200) {
      getEmails();
    }
  });
};

const makePrimary = (email) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}emails-primary`;
  axios
    .post(url, {
      email: email,
    })
    .then((res) => {
      if (res.status === 200) {
        getEmails();
        fetchUser();
      }
    });
};

const getEmails = () => {
  axios.get("emails").then((res) => (emails.value = res.data));
};
</script>