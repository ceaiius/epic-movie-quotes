<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="lg:flex flex-col mt-10 items-center gap-20 w-full hidden">
    <h2 class="text-white lg:block hidden">{{ $t("profile.my_profile") }}</h2>
    <div class="flex w-full h-full lg:h-auto items-center justify-center">
      <Form
        class="
          flex flex-col
          w-full
          h-full
          gap-6
          lg:h-auto
          items-center
          justify-between
        "
        @submit="handleSubmit"
      >
        <div
          class="
            lg:w-2/3
            relative
            lg:rounded-2xl
            w-full
            h-full
            lg:h-[535px]
            flex
            justify-center
            text-center
            bg-black_bg
          "
        >
          <div class="flex flex-col gap-20">
            <div class="flex flex-col items-center">
              <img
                id="img"
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
              <h2 class="text-white cursor-pointer" @click="handleClick">
                {{ $t("profile.upload_new_photo") }}
              </h2>
              <div>
                <Field v-slot="{ handleChange }" name="thumbnail">
                  <input
                    id="input"
                    ref="fileInput"
                    type="file"
                    class="hidden"
                    @change="handleChange"
                    @input="setImage"
                  />
                </Field>
              </div>
            </div>
            <div class="flex flex-col gap-20">
              <div
                class="
                  flex
                  items-center
                  flex-col
                  lg:flex-row
                  gap-6
                  relative
                  w-80
                  lg:w-96
                "
              >
                <h2 class="absolute -top-10 left-0 text-white">
                  {{ $t("profile.username") }}
                </h2>
                <Field
                  v-slot="{ meta, field }"
                  v-model="username"
                  name="username"
                  rules="required|username"
                >
                  <input
                    id="username"
                    v-bind="field"
                    :class="[
                      meta.valid && meta.touched && credentials.canEditGoogle
                        ? ' border-green-500'
                        : '',
                      !meta.valid && meta.touched && credentials.canEditGoogle
                        ? ' border-red-500'
                        : '',
                    ]"
                    class="bg-input_bg w-full text-sm h-10 p-2 border-2 rounded"
                    :readonly="!credentials.canEditGoogle"
                  />
                </Field>
                <ErrorMessage
                  v-if="credentials.canEditGoogle"
                  class="
                    text-default_red
                    whitespace-nowrap
                    text-center text-sm
                    -bottom-6
                    absolute
                  "
                  name="username"
                />
                <label
                  class="lg:absolute lg:-right-20 text-white cursor-pointer"
                  for="username"
                  @click="
                    credentials.canEditGoogle = !credentials.canEditGoogle
                  "
                  >{{ $t("profile.edit") }}</label
                >
                <p
                  v-if="usernameTaken"
                  class="
                    text-default_red
                    whitespace-nowrap
                    text-center text-sm
                    -bottom-6
                    absolute
                  "
                >
                  {{ $t("registration_form.username_taken") }}
                </p>
              </div>
              <hr class="border-hr_color" />
              <div
                class="flex flex-col items-center relative gap-6 w-80 lg:w-96"
              >
                <label class="text-white absolute -top-10 left-0" for="email">{{
                  $t("profile.email")
                }}</label>
                <input
                  id="email"
                  v-model="email"
                  class="bg-input_bg w-full text-sm h-10 p-2 border-2 rounded"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="credentials.canEditGoogle"
          class="flex items-center gap-6 self-end mr-96"
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
              hover:bg-button_hover
            "
          >
            {{ $t("movie_list.save_changes") }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
  
  <script setup>
import { onBeforeMount, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "@/config/axios/index.js";
import { useCredentials } from "@/stores/index.js";
import { thumbnail } from "@/helpers/thumbnail";
const credentials = useCredentials();
const avatarError = ref(false);
const username = ref();
const usernameTaken = ref(false);
const email = ref();
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
onBeforeMount(() => {
  fetchUser();
});

const cancelEdit = () => {
  username.value = credentials.user_name;
  var preview = document.getElementById("img");
  if (credentials.avatar.includes("https")) {
    preview.src = credentials.avatar;
  } else {
    preview.src = url_thumbnail + credentials.avatar;
  }
  usernameTaken.value = false;

  credentials.canEditGoogle = false;
};

const handleClick = () => {
  document.getElementById("input").click();
  credentials.canEditGoogle = true;
};

const setImage = (e) => {
  if (e.target.files.length !== 0) {
    const output = document.getElementById("img");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  }
};

const fetchUser = () => {
  axios.get("user").then((res) => {
    email.value = res.data.email;
    username.value = res.data.username.toLowerCase();
    credentials.avatar = res.data.thumbnail;
  });
};
const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const handleSubmit = async (values) => {
  try {
    await axios.post(
      "update",
      {
        thumbnail: values.thumbnail,
        username: username.value,
      },
      header
    );
    fetchUser();
    credentials.user_name = username.value;
    credentials.canEditGoogle = false;
    avatarError.value = false;
    usernameTaken.value = false;
  } catch (err) {
    avatarError.value = true;
    usernameTaken.value = true;
  }
};
</script>
  