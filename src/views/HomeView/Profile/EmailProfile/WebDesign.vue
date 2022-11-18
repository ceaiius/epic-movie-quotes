<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="lg:flex flex-col mt-10 items-center gap-20 w-full hidden">
    <h2 class="text-white lg:block hidden">{{ $t("Profile.my_profile") }}</h2>
    <div class="flex w-full h-full lg:h-auto items-center justify-center">
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
          <div class="flex flex-col items-center">
            <img
              class="w-24 mt-20 lg:mt-0 lg:translate-y-[-50%] translate-y-0"
              src="/images/static.png"
              alt=""
            />
            <h2 class="text-white">{{ $t("Profile.upload_new_photo") }}</h2>
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
                :readonly="isNotEditable"
              />
              <label
                class="lg:absolute lg:-right-20 text-white cursor-pointer"
                for="username"
                @click="isNotEditable = !isNotEditable"
                >{{ $t("Profile.edit") }}</label
              >
            </div>
            <hr class="border-[#efefef4d]" />
            <div class="flex flex-col relative gap-6 w-80 lg:w-96">
              <div class="w-full">
                <label class="text-white absolute -top-10 left-0" for="email">{{
                  $t("Profile.email")
                }}</label>

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
                      border-2
                      rounded
                    "
                    readonly
                  />
                  <img
                    class="absolute top-3 right-3"
                    src="/images/checked_round.svg"
                    alt=""
                  />
                  <h2 class="absolute top-2 text-white -right-40">
                    {{ $t("Profile.primary_email") }}
                  </h2>
                </div>
              </div>

              <div>
                <button
                  type="submit"
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
                >
                  <span><img src="/images/plus.svg" alt="" /></span>
                  {{ $t("Profile.add_new_email") }}
                </button>
              </div>
              <hr class="border-[#efefef4d]" />

              <div>
                <div
                  class="
                    flex
                    mb-10
                    mt-10
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
                    {{ $t("Profile.password") }}
                  </h2>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="bg-input_bg w-full text-sm h-10 p-2 border-2 rounded"
                    readonly
                  />
                  <label
                    class="lg:absolute lg:-right-20 text-white cursor-pointer"
                    for="password"
                    @click="
                      (isNotEditable = !isNotEditable),
                        (passwordReset = !passwordReset)
                    "
                    >{{ $t("Profile.edit") }}</label
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
                    <h2>Passwords should contain:</h2>
                    <p>
                      <span class="flex gap-2"
                        ><img src="/images/grey_circle.svg" alt="" />8 or more
                        characters</span
                      >
                    </p>
                    <p>
                      <span class="flex gap-2"
                        ><img src="/images/green_circle.svg" alt="" />15
                        lowercase character</span
                      >
                    </p>
                  </div>
                  <div class="flex flex-col pt-10 relative">
                    <label
                      for="exampleInputPassword1"
                      class="text-white text-base pb-2"
                      >{{ $t("RegistrationForm.password") }}</label
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
                          meta.valid && meta.touched ? ' border-green-500' : '',
                          !meta.valid && meta.touched ? ' border-red-500' : '',
                        ]"
                        :type="[showPassword ? 'text' : 'password']"
                        class="bg-input_bg text-sm h-10 p-2 border-2 rounded"
                        :placeholder="placeholderPassword"
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
                  <div class="flex flex-col pt-10 relative">
                    <label
                      for="exampleInputPassword1"
                      class="text-white text-base pb-2"
                      >{{ $t("RegistrationForm.confirm_password") }}</label
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
                          meta.valid && meta.touched ? ' border-green-500' : '',
                          !meta.valid && meta.touched ? ' border-red-500' : '',
                        ]"
                        class="bg-input_bg text-sm h-10 p-2 border-2 rounded"
                        :placeholder="placeholderConfirm"
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
              <button
                v-if="isNotEditable"
                type="button"
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
                @click="isOpenRegister = true"
              >
                {{ $t("MovieList.save_changes") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script setup>
import { onBeforeMount, ref } from "vue";
import axios from "@/config/axios/index.js";
import { Field } from "vee-validate";
const username = ref();
const email = ref();
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const password = ref("12345678910");
const isNotEditable = ref(true);
const passwordReset = ref(false);
onBeforeMount(() => {
  axios.get("user").then((res) => {
    email.value = res.data.email;
    username.value = res.data.username;
    console.log(res);
  });
});
</script>
    