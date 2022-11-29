<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="lg:flex flex-col mt-10 items-center gap-20 w-full hidden">
    <h2 class="text-white lg:block hidden">{{ $t("Profile.my_profile") }}</h2>
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
                :src="
                  credentials.avatar == null
                    ? '/images/static.png'
                    : credentials.avatar.includes('https')
                    ? credentials.avatar
                    : url_thumbnail + credentials.avatar
                "
                alt=""
              />
              <h2 class="text-white" @click="handleClick">
                {{ $t("Profile.upload_new_photo") }}
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
                  {{ $t("Profile.username") }}
                </h2>
                <input
                  id="username"
                  v-model="username"
                  class="bg-input_bg w-full text-sm h-10 p-2 border-2 rounded"
                  :readonly="!credentials.canEditGoogle"
                />
                <label
                  class="lg:absolute lg:-right-20 text-white cursor-pointer"
                  for="username"
                  @click="
                    credentials.canEditGoogle = !credentials.canEditGoogle
                  "
                  >{{ $t("Profile.edit") }}</label
                >
              </div>
              <hr class="border-[#efefef4d]" />
              <div
                class="flex flex-col items-center relative gap-6 w-80 lg:w-96"
              >
                <label class="text-white absolute -top-10 left-0" for="email">{{
                  $t("Profile.email")
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
          <h2 class="text-grey_text" @click="cancelEdit">Cancel</h2>
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
  </div>
</template>
  
  <script setup>
import { onBeforeMount, ref } from "vue";
import { Form, Field } from "vee-validate";
import axios from "@/config/axios/index.js";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
const avatarError = ref(false);
const username = ref();
const email = ref();
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
onBeforeMount(() => {
  fetchUser();
});

const cancelEdit = () => {
  username.value = credentials.user_name;
  var preview = document.getElementById("img");
  preview.src = url_thumbnail + credentials.avatar;
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
    username.value = res.data.username;
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
  } catch (err) {
    avatarError.value = true;
  }
};
</script>
  