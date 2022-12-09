<template>
  <div
    :class="[editUsername ? 'hidden' : '', editPassword ? 'hidden' : '']"
    class="lg:hidden flex-col mt-10 items-center gap-20 w-full flex"
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

    <teleport to="body">
      <dialog-modal
        v-if="credentials.success_password"
        top="top-[20%]"
        @close="credentials.success_password = false"
      >
        <SuccessDialog
          message="Password updated succesfully"
          @exit="credentials.success_password = false"
        />
      </dialog-modal>
    </teleport>

    <teleport to="body">
      <dialog-modal
        v-if="credentials.success_email"
        top="top-[10%] left-[50%] lg:left-[80%]"
        @close="credentials.success_email = false"
      >
        <SuccessDialog
          message="Email updated succesfully"
          @exit="credentials.success_email = false"
        />
      </dialog-modal>
    </teleport>
    <Form
      class="flex-col mt-10 items-center gap-20 w-full flex"
      @submit="handleSubmit"
    >
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
            alt="user avatar"
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
              {{ $t("profile.upload_new_photo") }}
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

      <div class="flex flex-col gap-2 justify-center items-center"></div>
      <div class="flex flex-col w-full sm:w-96 text-white">
        <h2 class="pl-6">{{ $t("profile.username") }}</h2>
        <div class="flex justify-between p-6">
          <h2>
            {{ credentials.confirmed_username_edit }}
          </h2>
          <h2
            class="cursor-pointer"
            @click="credentials.can_edit_username_popup = true"
          >
            {{ $t("profile.edit") }}
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
        <hr class="border-hr_color" />
      </div>
      <div class="flex flex-col w-full sm:w-96 text-white">
        <h2 class="pl-6">{{ $t("profile.password") }}</h2>
        <div class="flex justify-between p-6">
          <img class="w-36" src="/images/password.svg" alt="password icon" />
          <h2
            class="cursor-pointer"
            @click="credentials.can_edit_password_popup = true"
          >
            {{ $t("profile.edit") }}
          </h2>
        </div>
        <teleport to="body">
          <dialog-modal
            v-if="credentials.can_edit_password_popup"
            @close="credentials.can_edit_password_popup = false"
          >
            <EditPassword @exit="credentials.can_edit_password_popup = false" />
          </dialog-modal>
        </teleport>
        <hr class="border-hr_color" />
      </div>
      <div class="flex flex-col w-full mb-10 text-white">
        <div class="flex justify-between items-center p-6">
          <h2>{{ $t("profile.email") }}</h2>
          <img
            class="w-2 cursor-pointer"
            src="/images/right-arrow.svg"
            alt="right arrow icon"
            @click="editEmail = true"
          />
        </div>
        <teleport to="body">
          <dialog-modal v-if="editEmail" @close="editEmail = false">
            <EditEmail @exit="editEmail = false" />
          </dialog-modal>
        </teleport>
      </div>

      <div
        v-if="editThumbnail"
        class="flex gap-6 items-center justify-center mb-10"
      >
        <h2 class="text-grey_text cursor-pointer" @click="cancelEdit">
          {{ $t("profile.cancel") }}
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
          {{ $t("movie_list.save_changes") }}
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { Form, Field } from "vee-validate";
import DialogModal from "@/components/DialogModal.vue";
import EditPassword from "@/views/HomeView/Profile/EmailProfile/EditPassword.vue";
import EditEmail from "@/views/HomeView/Profile/EmailProfile/EditEmail.vue";
import EnterUsername from "@/views/HomeView/Profile/EmailProfile/EnterUsername.vue";
import { thumbnail } from "@/helpers/thumbnail";
import SuccessDialog from "@/views/HomeView/Profile/GoogleProfile/SuccessDialog.vue";
import axios from "@/config/axios/index.js";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
const editEmail = ref(false);
const editUsername = ref(false);
const editThumbnail = ref(false);
const editPassword = ref(false);

const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;

const handleClick = () => {
  document.getElementById("mobile_input").click();
  editThumbnail.value = true;
};

const cancelEdit = () => {
  credentials.username_edit = credentials.user_name;
  var preview = document.getElementById("mobile_img");
  preview.src = url_thumbnail + credentials.avatar;
  credentials.password_edit = "";
};

const setImage = (e) => {
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

onBeforeMount(() => {
  fetchUser();
});

const fetchUser = () => {
  axios.get("user").then((res) => {
    credentials.avatar = res.data.thumbnail;
    credentials.confirmed_username_edit = res.data.username;
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
    editThumbnail.value = false;
  } catch (err) {
    console.log(err);
  }
};
</script>