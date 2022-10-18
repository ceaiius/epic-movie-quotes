<template>
  <div
    class="
      flex flex-col
      items-center
      bg-form_bg
      md:w-input_width md:h-input_height
      w-screen
      h-screen
      md:rounded-xl
      rounded-none
      justify-center
    "
  >
    <div class="text-center">
      <h1 class="text-white text-3xl">Log in to your account</h1>
      <h3 class="text-grey_text text-base pt-2">
        Welcome back! Please enter your details
      </h3>
    </div>
    <div class="w-96">
      <form class="pl-4">
        <div class="flex flex-col pt-4">
          <label for="exampleInputEmail1" class="text-white text-base pb-2"
            >Email</label
          >
          <input
            type="email"
            class="bg-input_bg text-sm h-10 p-2 border border-input_bg rounded"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="flex flex-col pt-4 relative">
          <label for="exampleInputPassword1" class="text-white text-base pb-2"
            >Password</label
          >
          <input
            type="password"
            class="bg-input_bg text-sm h-10 p-2 border border-input_bg rounded"
            placeholder="At least 8 & max.15 lower case characters"
            name="password"
          />
          <span
            ><img
              class="w-6 h-6 absolute top-14 right-4"
              src="/images/visible.svg"
              alt=""
          /></span>
        </div>
        <div class="flex items-center mt-2 gap-2">
          <input
            id="default-checkbox"
            name="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 bg-gray-100 rounded"
          />
          <label for="default-checkbox" class="text-white text-base"
            >Remember me</label
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
            mt-6
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
      </form>
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

<script>
export default {
  emits: ["openRegistration"],
};
</script>
 
  