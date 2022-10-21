<template>
  <div
    class="
      flex flex-col
      items-center
      bg-form_bg
      md:w-input_width md:h-fit
      pb-12
      w-screen
      h-screen
      md:rounded-xl
      rounded-none
      justify-center
    "
  >
    <div>
      <img
        class="block md:hidden absolute left-10 cursor-pointer"
        src="/images/back-arrow.svg"
        alt=""
        @click="$emit('closeDialog')"
      />
    </div>
    <div class="text-center pt-12">
      <h1 class="text-white text-3xl">Log in to your account</h1>
      <h3 class="text-grey_text text-base pt-2">
        Welcome back! Please enter your details
      </h3>
    </div>
    <div class="w-96">
      <Form class="pl-4" @submit="handleLogin">
        <div class="flex flex-col pt-4 relative">
          <label for="exampleInputEmail1" class="text-white text-base pb-2"
            >Email</label
          >
          <Field
            v-model="email"
            type="email"
            :rules="validateEmail"
            :class="[errorInput ? 'border-2 border-red-500' : 'border-none']"
            class="bg-input_bg text-sm h-10 p-2 border border-input_bg rounded"
            name="email"
            placeholder="Enter your email"
          />
          <ErrorMessage
            class="
              text-red
              whitespace-nowrap
              text-center text-sm
              -bottom-6
              absolute
            "
            name="email"
          />
        </div>
        <div class="flex flex-col pt-10 relative">
          <label for="exampleInputPassword1" class="text-white text-base pb-2"
            >Password</label
          >
          <Field
            v-model="password"
            :rules="validatePassword"
            :type="[showPassword ? 'text' : 'password']"
            :class="[errorInput ? 'border-2 border-red-500' : 'border-none']"
            class="bg-input_bg text-sm h-10 p-2 border border-input_bg rounded"
            placeholder="At least 8 & max.15 lower case characters"
            name="password"
          />
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
            class="text-red whitespace-nowrap text-sm relative top-2"
            name="password"
          />
        </div>
        <div class="flex items-center mt-2 gap-2">
          <input
            id="default-checkbox"
            v-model="remember"
            name="remember"
            type="checkbox"
            true-value="yes"
            false-value="no"
            class="w-4 h-4 bg-gray-100 rounded"
          />
          <label for="default-checkbox" class="text-white text-base"
            >Remember me</label
          >
        </div>

        <div class="whitespace-nowrap mt-4">
          <span v-if="errorInput" class="text-red text-sm absolute"
            >User does not exist, please check your credentials</span
          >
        </div>

        <button
          type="submit"
          class="
            text-white
            bg-red
            w-full
            h-12
            font-medium
            rounded-md
            text-sm
            mt-8
          "
        >
          Sign In
        </button>
        <button
          class="
            flex
            justify-center
            items-center
            gap-2
            mt-6
            focus:outline-none
            text-white
            border border-white
            w-full
            h-12
            font-medium
            rounded-md
            text-sm
          "
        >
          <span><img src="/images/google.svg" alt="" /></span> Sign in with
          Google
        </button>
      </Form>
      <p class="text-center pt-4 text-grey_text">
        Don't have an account?
        <a
          class="text-link cursor-pointer underline"
          @click="$emit('openRegistration')"
          >Sign up</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/config/axios/index.js";
import { Field, Form, ErrorMessage } from "vee-validate";

import { setJwtToken } from "../../helpers/jwt";
import router from "../../router";

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["openRegistration", "closeDialog"]);
const email = ref("");
const password = ref("");
const errorInput = ref(false);
const remember = ref("");

const showPassword = ref(false);
const handleLogin = async () => {
  axios
    .post("login", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      router.push({ name: "home" });
      if (remember.value == "yes") {
        setJwtToken(
          response.data.access_token,
          response.data.expires_in,
          365000
        );
      } else {
        setJwtToken(response.data.access_token, response.data.expires_in, 1000);
      }
    })
    .catch(() => {
      errorInput.value = true;
    });
};

const validateEmail = (value) => {
  // if the field is empty
  if (!value) {
    return "This field is required";
  }

  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }

  return true;
};

const validatePassword = (value) => {
  if (!value) {
    return "This field is required ";
  }
  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (value.length > 15) {
    return "Password must not have more than 15 characters ";
  }

  return true;
};
</script>
 
  