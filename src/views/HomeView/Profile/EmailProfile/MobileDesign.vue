<template>
  <div
    :class="[
      editUsername ? 'hidden' : '',
      editPassword ? 'hidden' : '',
      editEmail ? 'hidden' : '',
    ]"
    class="lg:hidden flex-col mt-10 items-center gap-20 w-full flex"
  >
    <Form
      class="flex-col mt-10 items-center gap-20 w-full flex"
      @submit="handleSubmit"
    >
      <div class="flex flex-col gap-20">
        <div class="flex flex-col items-center gap-6">
          <img
            id="mobile_file"
            class="
              w-24
              h-24
              object-cover
              rounded-full
              mt-20
              lg:mt-0 lg:translate-y-[-50%]
              translate-y-0
            "
            :src="
              credentials.avatar == null
                ? '/images/static.png'
                : credentials.avatar.includes('https')
                ? credentials.avatar
                : url_thumbnail + credentials.avatar
            "
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
            <h2 class="text-white" @click="handleClick">
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

      <div class="flex flex-col gap-2 justify-center items-center"></div>
      <div class="flex flex-col w-96 text-white">
        <h2 class="pl-6">{{ $t("Profile.username") }}</h2>
        <div class="flex justify-between p-6">
          <h2>
            {{
              credentials.username_edit == ""
                ? credentials.user_name
                : credentials.username_edit
            }}
          </h2>
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
      <button
        v-if="isEditable"
        type="submit"
        class="
          text-white
          bg-default_red
          w-40
          h-10
          mb-10
          font-medium
          rounded-md
          text-sm
        "
      >
        {{ $t("MovieList.save_changes") }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { Form, Field } from "vee-validate";
import DialogModal from "../../../../components/DialogModal.vue";
import EditPassword from "./EditPassword.vue";
import EnterUsername from "./EnterUsername.vue";
import EditEmail from "./EditEmail.vue";
import axios from "@/config/axios/index.js";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();

const editUsername = ref(false);
const isEditable = ref(false);
const editPassword = ref(false);
const editEmail = ref(false);
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;

const handleClick = () => {
  document.getElementById("mobile_input").click();
  isEditable.value = true;
};

const setImage = (e) => {
  if (e.target.files.length > 0) {
    var src = URL.createObjectURL(e.target.files[0]);
    var preview = document.getElementById("mobile_file");
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
  });
};

const handleSubmit = async (values) => {
  try {
    await axios.post(
      "update",
      {
        thumbnail: values.thumbnail,
        username: credentials.username_edit,
      },
      header
    );
    fetchUser();
  } catch (err) {
    console.log(err);
  }
};
</script>