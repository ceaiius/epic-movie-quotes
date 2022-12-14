<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="lg:flex flex-col mt-10 items-center gap-20 w-full hidden relative"
  >
    <h2 class="text-white lg:block hidden">{{ $t("profile.my_profile") }}</h2>
    <div v-if="success" class="z-20 right-20 fixed">
      <SuccessDialog
        message="Profile uptaded sucessfully"
        @exit="success = false"
      />
    </div>
    <div class="flex w-full h-full lg:h-auto items-center justify-center">
      <Form
        class="
          flex flex-col
          w-full
          h-full
          gap-6
          lg:h-auto
          items-center
          justify-center
        "
        @submit="handleSubmit"
      >
        <div
          class="
            lg:w-2/3
            relative
            lg:rounded-2xl
            w-full
            h-auto
            lg:h-[auto]
            flex
            justify-center
            text-center
            bg-black_bg
          "
        >
          <div class="flex flex-col gap-20">
            <div class="flex flex-col items-center gap-6">
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
                  rules="username|required|min:3|max:15"
                >
                  <input
                    v-bind="field"
                    id="username"
                    :class="[
                      meta.valid && meta.touched && editUsername
                        ? ' border-green-500'
                        : '',
                      !meta.valid && meta.touched && editUsername
                        ? ' border-red-500'
                        : '',
                    ]"
                    class="bg-input_bg w-full text-sm h-10 p-2 border-2 rounded"
                    :readonly="!editUsername"
                  />
                </Field>
                <ErrorMessage
                  v-if="editUsername"
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
                  @click="editUsername = !editUsername"
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
              <div class="flex flex-col gap-12 w-80 lg:w-96">
                <div class="w-full relative">
                  <label
                    class="text-white absolute -top-10 left-0"
                    for="email"
                    >{{ $t("profile.email") }}</label
                  >

                  <div>
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
                      alt="checked icon"
                    />
                    <h2 class="absolute top-2 text-white -right-40">
                      {{ $t("profile.primary_email") }}
                    </h2>
                  </div>
                </div>

                <div
                  v-for="item in emails"
                  :key="item.id"
                  class="w-full relative"
                >
                  <label
                    class="text-white absolute -top-10 left-0"
                    for="email"
                    >{{ $t("profile.email") }}</label
                  >
                  <div
                    v-if="hover"
                    class="
                      absolute
                      -right-32
                      -top-12
                      w-80
                      h-10
                      bg-white
                      rounded-md
                    "
                  >
                    <div
                      class="
                        flex
                        gap-2
                        h-full
                        items-center
                        text-sm
                        justify-center
                        relative
                      "
                    >
                      <img
                        src="/images/unverified-black.svg"
                        alt="unverified black icon"
                      />
                      <h2>
                        {{ $t("profile.please_verify_new_email_address") }}
                      </h2>
                      <img
                        class="absolute top-9"
                        src="/images/white-arrow.svg"
                        alt="white arrow"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      id="email"
                      :value="item.email"
                      :class="
                        item.email_verified_at == null
                          ? 'bg-unvalidated border-[#EC9524] text-white '
                          : ''
                      "
                      class="w-full text-sm h-10 p-2 border rounded"
                      readonly
                    />

                    <img
                      v-if="item.email_verified_at == null"
                      class="absolute top-3 right-3"
                      src="/images/unvalidated.svg"
                      alt="unvalidated icon"
                      @mouseover="hover = true"
                      @mouseleave="hover = false"
                    />
                    <div
                      :class="textPosition(item.email_verified_at)"
                      class="absolute top-2 text-white"
                    >
                      <div class="flex gap-6">
                        <h2
                          v-if="item.email_verified_at == null"
                          class="cursor-pointer"
                        >
                          {{ $t("profile.not_verified") }}
                        </h2>
                        <h2
                          v-else
                          class="cursor-pointer"
                          @click="makePrimary(item.email)"
                        >
                          {{ $t("profile.make_this_primary") }}
                        </h2>
                        <h2
                          class="cursor-pointer"
                          @click="deleteEmail(item.id)"
                        >
                          {{ $t("profile.remove") }}
                        </h2>
                      </div>
                    </div>
                  </div>
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
                <div>
                  <button
                    type="button"
                    class="
                      focus:outline-none
                      text-white
                      border border-white
                      w-48
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
                    <span><img src="/images/plus.svg" alt="plus icon" /></span>
                    {{ $t("profile.add_new_email") }}
                  </button>
                </div>
                <hr class="border-[#efefef4d]" />
              </div>
              <div class="flex flex-col relative gap-6 w-80 lg:w-96">
                <div>
                  <div class="mb-10">
                    <h2 class="absolute -top-10 left-0 text-white">
                      {{ $t("profile.password") }}
                    </h2>
                    <input
                      id="password"
                      v-model="password"
                      type="password"
                      class="
                        bg-input_bg
                        w-full
                        text-sm
                        h-10
                        p-2
                        border-2
                        rounded
                      "
                      readonly
                    />
                    <label
                      class="lg:absolute lg:-right-20 text-white cursor-pointer"
                      for="password"
                      @click="
                        (editPassword = !editPassword),
                          (passwordReset = !passwordReset)
                      "
                      >{{ $t("profile.edit") }}</label
                    >
                  </div>
                  <div v-if="passwordReset">
                    <div
                      class="
                        flex flex-col
                        items-start
                        text-white
                        gap-4
                        border
                        border-border_rgba
                        rounded-lg
                        mb-10
                        p-4
                      "
                    >
                      <h2>{{ $t("profile.password_should_contain") }}:</h2>
                      <p>
                        <span class="flex gap-2"
                          ><img
                            src="/images/grey_circle.svg"
                            alt="grey circle icon"
                          />{{ $t("profile.eight_or_more_characters") }}</span
                        >
                      </p>
                      <p>
                        <span class="flex gap-2"
                          ><img
                            src="/images/green_circle.svg"
                            alt="green circle icon"
                          />{{ $t("profile.fifteen_or_more_characters") }}</span
                        >
                      </p>
                    </div>
                    <div class="flex flex-col pt-10 relative">
                      <label
                        for="exampleInputPassword1"
                        class="text-white text-base pb-2"
                        >{{ $t("registration_form.password") }}</label
                      >
                      <Field
                        v-slot="{ meta, field }"
                        name="password"
                        rules="required|min:8|max:15"
                      >
                        <input
                          v-bind="field"
                          v-model="password"
                          :class="[
                            meta.valid && meta.touched
                              ? ' border-green-500'
                              : '',
                            !meta.valid && meta.touched
                              ? ' border-red-500'
                              : '',
                          ]"
                          :type="[showPassword ? 'text' : 'password']"
                          class="bg-input_bg text-sm h-10 p-2 border-2 rounded"
                          :placeholder="
                            $t('registration_form.password_placeholder')
                          "
                        />
                      </Field>
                      <span @click="showPassword = !showPassword">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          :class="[showPassword ? 'block' : 'hidden']"
                          class="
                            w-6
                            h-6
                            absolute
                            top-20
                            right-2
                            cursor-pointer
                            fill-transparent
                            stroke-[#7F8487]
                          "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          :class="[showPassword ? 'hidden' : 'block']"
                          class="
                            w-6
                            h-6
                            absolute
                            top-20
                            right-2
                            cursor-pointer
                            stroke-[#7F8487]
                          "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      </span>
                      <ErrorMessage
                        class="text-default_red text-sm -bottom-6 absolute"
                        name="password"
                      />
                    </div>
                    <div class="flex flex-col pt-10 relative mb-10">
                      <label
                        for="exampleInputPassword1"
                        class="text-white text-base pb-2"
                        >{{ $t("registration_form.confirm_password") }}</label
                      >
                      <Field
                        v-slot="{ meta, field }"
                        name="password_confirmation"
                        rules="required|min:8|max:15|confirmed:@password"
                      >
                        <input
                          v-bind="field"
                          v-model="password_confirmation"
                          :type="[showPasswordConfirm ? 'text' : 'password']"
                          :class="[
                            meta.valid && meta.touched
                              ? ' border-green-500'
                              : '',
                            !meta.valid && meta.touched
                              ? ' border-red-500'
                              : '',
                          ]"
                          class="bg-input_bg text-sm h-10 p-2 border-2 rounded"
                          :placeholder="
                            $t('registration_form.confirm_placeholder')
                          "
                        />
                      </Field>

                      <span @click="showPasswordConfirm = !showPasswordConfirm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          :class="[showPasswordConfirm ? 'block' : 'hidden']"
                          class="
                            w-6
                            h-6
                            absolute
                            top-20
                            right-2
                            cursor-pointer
                            fill-transparent
                            stroke-[#7F8487]
                          "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          :class="[showPasswordConfirm ? 'hidden' : 'block']"
                          class="
                            w-6
                            h-6
                            absolute
                            top-20
                            right-2
                            cursor-pointer
                            stroke-[#7F8487]
                          "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      </span>
                      <ErrorMessage
                        class="text-default_red text-sm -bottom-6 absolute"
                        name="password_confirmation"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="editUsername || editPassword || editThumbnail"
          class="flex items-center gap-6 self-end mr-96 mb-10"
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
  </div>
</template>
    
<script setup>
import { onBeforeMount, ref } from "vue";
import axios from "@/config/axios/index.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useCredentials } from "@/stores/index.js";
import { i18n } from "@/i18n";
import SuccessDialog from "@/views/HomeView/Profile/GoogleProfile/SuccessDialog.vue";
import DialogModal from "@/components/DialogModal.vue";
import { thumbnail } from "@/helpers/thumbnail";
import EnterEmail from "@/views/HomeView/Profile/EmailProfile/EnterEmail.vue";
const credentials = useCredentials();
const email = ref();
const username = ref();
const hover = ref(false);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const password = ref("12345678910");
const editUsername = ref(false);
const success = ref(false);
const emails = ref([]);
const editPassword = ref(false);
const passwordReset = ref(false);
const editThumbnail = ref(false);
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
const usernameTaken = ref(false);

const textPosition = (x) => {
  return x == null
    ? i18n.global.locale == "En"
      ? "-right-[63%] "
      : "-right-[73%]"
    : i18n.global.locale == "En"
    ? "-right-[78%]"
    : "-right-[62%]";
};

const deleteEmail = (id) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}emails/${id}`;
  axios.delete(url).then((res) => {
    if (res.status === 200) {
      getEmails();
    }
  });
};

const handleClick = () => {
  document.getElementById("input").click();
  editThumbnail.value = true;
};

const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
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

const setImage = (e) => {
  if (e.target.files.length > 0) {
    var src = URL.createObjectURL(e.target.files[0]);
    var preview = document.getElementById("img");
    preview.src = src;
  }
};
onBeforeMount(() => {
  fetchUser();
  getEmails();
});

const getEmails = () => {
  axios.get("emails").then((res) => (emails.value = res.data));
};

const cancelEdit = () => {
  username.value = credentials.user_name;
  var preview = document.getElementById("img");
  if (credentials.avatar == null) {
    preview.src = "/images/avatar-default.jpg";
  } else {
    preview.src = url_thumbnail + credentials.avatar;
  }

  editUsername.value = false;
  editPassword.value = false;
  editThumbnail.value = false;
  passwordReset.value = false;
  usernameTaken.value = false;
};

const fetchUser = () => {
  axios.get("user").then((res) => {
    email.value = res.data.email;
    username.value = res.data.username;
    credentials.avatar = res.data.thumbnail;
  });
};

const handleSubmit = async (values) => {
  try {
    await axios.post(
      "update",
      {
        thumbnail: values.thumbnail,
        username: username.value,
        password: password.value,
      },
      header
    );
    fetchUser();
    credentials.user_name = username.value;
    success.value = true;
    editThumbnail.value = false;
    editUsername.value = false;
    editPassword.value = false;
    passwordReset.value = false;
    usernameTaken.value = false;
  } catch (err) {
    console.log(err);
    usernameTaken.value = true;
  }
};
</script>
    