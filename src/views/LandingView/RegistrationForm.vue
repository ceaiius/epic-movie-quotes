<template>
  <div
    class="
      flex flex-col
      items-center
      md:rounded-xl
      rounded-none
      bg-form_bg
      md:w-input_width md:h-fit
      pb-12
      w-screen
      h-screen
      justify-center
    "
  >
    <div class="pt-8 text-center">
      <h1 class="text-white text-3xl">Create an account</h1>
      <h3 class="text-grey_text text-base pt-2">Start your journey!</h3>
    </div>
    <div class="w-96">
      <Form class="pl-4" @submit="handleRegister">
        <div class="flex flex-col pt-4 relative">
          <label for="exampleInputEmail1" class="text-white text-base pb-2"
            >Name</label
          >
          <Field
            v-model="username"
            :rules="validateUsername"
            :class="changeBorderUsername"
            type="text"
            class="
              bg-input_bg
              text-sm
              h-10
              w-full
              p-2
              border
              border-input_bg
              rounded
            "
            name="username"
            placeholder="At least 3 & max.15 lower case characters"
          />
          <span>
            <img
              :class="[errorUsername ? 'hidden' : 'block']"
              class="w-6 h-6 absolute top-14 right-2"
              src="/images/valid.svg"
              alt=""
            />
            <img
              :class="[errorUsername ? 'block' : 'hidden']"
              class="w-6 h-6 absolute top-14 right-2"
              src="/images/invalid.svg"
              alt=""
            />
          </span>
          <ErrorMessage class="text-red text-sm pt-4" name="username" />
        </div>
        <div class="flex flex-col pt-4 relative">
          <label for="exampleInputEmail1" class="text-white text-base pb-2"
            >Email</label
          >
          <Field
            v-model="email"
            type="email"
            :rules="validateEmail"
            :class="changeBorderEmail"
            class="bg-input_bg text-sm h-10 p-2 border border-input_bg rounded"
            name="email"
            placeholder="Enter your email"
          />
          <span>
            <img
              :class="[errorEmail ? 'hidden' : 'block']"
              class="w-6 h-6 absolute top-14 right-2"
              src="/images/valid.svg"
              alt=""
            />
            <img
              :class="[errorEmail ? 'block' : 'hidden']"
              class="w-6 h-6 absolute top-14 right-2"
              src="/images/invalid.svg"
              alt=""
            />
          </span>
          <ErrorMessage class="text-red text-sm pt-4" name="email" />
        </div>
        <div class="flex flex-col pt-4 relative">
          <label for="exampleInputPassword1" class="text-white text-base pb-2"
            >Password</label
          >
          <Field
            v-model="password"
            :rules="validatePassword"
            :class="changeBorderPassword"
            :type="[showPassword ? 'text' : 'password']"
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
                top-14
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
                top-14
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
          <ErrorMessage class="text-red text-sm pt-4" name="password" />
        </div>
        <div class="flex flex-col pt-4 relative">
          <label for="exampleInputPassword1" class="text-white text-base pb-2"
            >Confirm Password</label
          >
          <Field
            v-model="password_confirmation"
            :type="[showPasswordConfirm ? 'text' : 'password']"
            :rules="validateConfirmPassword"
            :class="changeBorderConfirmPassword"
            name="password_confirmation"
            class="bg-input_bg text-sm h-10 p-2 border border-input_bg rounded"
            placeholder="Confirm password"
          />

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
                top-14
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
                top-14
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
            class="text-red text-sm pt-4"
            name="password_confirmation"
          />
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
            mt-6
          "
        >
          Sign up
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
          <span><img src="/images/google.svg" alt="" /></span> Sign up with
          Google
        </button>
      </Form>
      <p class="text-center pt-4 text-grey_text">
        Already have an account?
        <a
          class="text-link cursor-pointer underline"
          @click="$emit('openLogin')"
          >Log in</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import { computed, ref } from "vue";
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["openLogin"]);

const username = ref("");
const email = ref("");
const password = ref("");
const errorUsername = ref(false);
const errorEmail = ref(false);
const errorPassword = ref(false);
const errorConfirmPassword = ref(false);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const password_confirmation = ref("");

const changeBorderUsername = computed(() => {
  return errorUsername.value
    ? "border-2 border-red"
    : "border-2 border-green-500";
});

const changeBorderEmail = computed(() => {
  return errorEmail.value ? "border-2 border-red" : "border-2 border-green-500";
});

const changeBorderPassword = computed(() => {
  return errorPassword.value
    ? "border-2 border-red"
    : "border-2 border-green-500";
});

const changeBorderConfirmPassword = computed(() => {
  return errorConfirmPassword.value
    ? "border-2 border-red"
    : "border-2 border-green-500";
});

const handleRegister = () => {
  axios.post("register", {
    username: username.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  });
};

const validateUsername = (value) => {
  if (!value) {
    errorUsername.value = true;
    return "This field is required ";
  }

  if (value.length < 3) {
    errorUsername.value = true;
    return "Username must be at least 3 characters";
  }

  if (value.length > 15) {
    errorUsername.value = true;
    return "Username must not have more than 15 characters ";
  }

  const regex = /^[a-za-z\s]*$/;
  if (!regex.test(value)) {
    errorUsername.value = true;
    return "Username must be in english alphabet and lowercase";
  }
  errorUsername.value = false;
  return true;
};

const validateEmail = (value) => {
  // if the field is empty
  if (!value) {
    errorEmail.value = true;
    return "This field is required";
  }

  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    errorEmail.value = true;
    return "This field must be a valid email";
  }

  errorEmail.value = false;
  return true;
};

const validatePassword = (value) => {
  if (!value) {
    errorPassword.value = true;
    return "This field is required ";
  }
  if (value.length < 8) {
    errorPassword.value = true;
    return "Password must be at least 8 characters";
  }
  if (value.length > 15) {
    errorPassword.value = true;
    return "Password must not have more than 15 characters ";
  }
  errorPassword.value = false;
  return true;
};

const validateConfirmPassword = (value) => {
  if (!value) {
    errorConfirmPassword.value = true;
    return "This field is required ";
  }
  if (value.length < 8) {
    errorConfirmPassword.value = true;
    return "Password must be at least 8 characters";
  }
  if (value.length > 15) {
    errorConfirmPassword.value = true;
    return "Password must not have more than 15 characters ";
  }
  if (value != password.value) {
    errorConfirmPassword.value = true;
    return "Passwords don't match";
  }
  errorConfirmPassword.value = false;
  return true;
};
</script>
 
