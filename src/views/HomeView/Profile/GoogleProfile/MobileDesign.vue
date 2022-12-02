<template>
  <div class="lg:hidden flex-col mt-10 items-center gap-20 w-full flex">
    <Form
      class="flex-col mt-10 items-center gap-20 w-full flex"
      @submit="handleSubmit"
    >
      <teleport to="body">
        <dialog-modal
          v-if="credentials.success_username"
          top="top-[20%]"
          @close="credentials.success_username = false"
        >
          <SuccessDialog
            message="Username updated succesfully"
            @exit="credentials.success_username = false"
          />
        </dialog-modal>
      </teleport>

      <teleport to="body">
        <dialog-modal
          v-if="credentials.success_avatar"
          top="top-[20%]"
          @close="credentials.success_avatar = false"
        >
          <SuccessDialog
            message="Avatar updated succesfully"
            @exit="credentials.success_avatar = false"
          />
        </dialog-modal>
      </teleport>
      <div class="flex flex-col gap-20">
        <div class="flex flex-col items-center gap-6">
          <img
            id="mobile_img"
            class="
              w-24
              h-24
              object-cover
              rounded-full
              mt-20
              lg:mt-0 lg:translate-y-[-50%]
              translate-y-0
            "
            :src="thumbnail(credentials.avatar)"
            alt=""
          />
          <div
            class="
              relative
              whitespace-nowrap
              flex flex-row
              items-center
              justify-center
            "
          >
            <h2 class="text-white cursor-pointer" @click="handleClick">
              {{ $t("Profile.upload_new_photo") }}
            </h2>
          </div>
          <div>
            <Field v-slot="{ handleChange }" name="thumbnail">
              <input
                id="mobile_input"
                ref="fileInput"
                type="file"
                class="hidden"
                @change="handleChange"
                @input="setImage"
              />
            </Field>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full sm:w-96 text-white">
        <h2 class="pl-6">{{ $t("Profile.username") }}</h2>
        <div class="flex justify-between p-6">
          <h2>{{ credentials.confirmed_username_edit }}</h2>
          <h2
            class="cursor-pointer"
            @click="credentials.can_edit_username_popup = true"
          >
            Edit
          </h2>
        </div>
        <teleport to="body">
          <dialog-modal
            v-if="credentials.can_edit_username_popup"
            @close="credentials.can_edit_username_popup = false"
          >
            <EnterUsername
              @exit="credentials.can_edit_username_popup = false"
            />
          </dialog-modal>
        </teleport>

        <teleport to="body">
          <dialog-modal v-if="confirm" @close="confirm = false">
            <ConfirmPopup @exit="confirm = false" @save="confirm = false" />
          </dialog-modal>
        </teleport>
      </div>
      <div class="flex flex-col w-full sm:w-96 text-white">
        <h2 class="pl-6">{{ $t("Profile.email") }}</h2>
        <div class="flex justify-between p-6">
          <h2>{{ email }}</h2>
        </div>

        <hr class="border-hr_color" />
      </div>
      <div v-if="isEditable" class="flex gap-6 items-center justify-center">
        <h2 class="text-grey_text cursor-pointer" @click="cancelEdit">
          Cancel
        </h2>
        <button
          type="submit"
          class="
            text-white
            bg-default_red
            w-40
            h-10
            font-medium
            rounded-md
            text-sm
          "
        >
          {{ $t("MovieList.save_changes") }}
        </button>
      </div>
    </Form>
  </div>
</template>
  
  <script setup>
import { onBeforeMount, ref } from "vue";
import { Form, Field } from "vee-validate";
import ConfirmPopup from "../EmailProfile/ConfirmPopup.vue";
import axios from "@/config/axios/index.js";
import DialogModal from "../../../../components/DialogModal.vue";
import EnterUsername from "../EmailProfile/EnterUsername.vue";
import SuccessDialog from "./SuccessDialog.vue";
import { thumbnail } from "../../../../helpers/thumbnail";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();

const email = ref();
const confirm = ref();

const isEditable = ref(false);

const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;

const cancelEdit = () => {
  credentials.username_edit = credentials.user_name;
  var preview = document.getElementById("mobile_img");
  preview.src = url_thumbnail + credentials.avatar;
  credentials.canEditGoogle = false;
};

const handleClick = () => {
  document.getElementById("mobile_input").click();
  isEditable.value = true;
};

const setImage = async (e) => {
  if (e.target.files.length > 0) {
    var src = URL.createObjectURL(e.target.files[0]);
    var preview = document.getElementById("mobile_img");
    preview.src = src;
  }
};
const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const fetchUser = () => {
  axios.get("user").then((res) => {
    credentials.avatar = res.data.thumbnail;
  });
};

const handleSubmit = async (values) => {
  try {
    await axios.post(
      "update",
      {
        thumbnail: values.thumbnail,
      },
      header
    );
    fetchUser();
    credentials.success_avatar = true;
    isEditable.value = false;
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(() => {
  axios.get("user").then((res) => {
    email.value = res.data.email;
    credentials.confirmed_username_edit = res.data.username;
  });
  fetchUser();
});
</script>