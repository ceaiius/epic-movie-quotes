<template>
  <div
    class="
      flex flex-col
      items-center
      bg-[#222030]
      md:w-[600px] md:h-[700px]
      w-screen
      h-screen
      justify-center
    "
  >
    <div class="pt-12 text-center">
      <h1 class="text-white text-3xl">Create an account</h1>
      <h3 class="text-[#6C757D] text-base pt-2">Start your journey!</h3>
    </div>
    <div class="w-96">
      <form class="pl-4">
        <div class="flex flex-col pt-4">
          <label for="exampleInputEmail1" class="text-white text-base pb-2"
            >Name</label
          >
          <input
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
        </div>
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
        <div class="flex flex-col pt-4 relative">
          <label for="exampleInputPassword1" class="text-white text-base pb-2"
            >Confirm Password</label
          >
          <input
            type="password"
            name="password_confirmation"
            class="bg-input_bg text-sm h-10 p-2 border border-input_bg rounded"
            placeholder="Confirm password"
          />
          <span
            ><img
              class="w-6 h-6 absolute top-14 right-4"
              src="/images/visible.svg"
              alt=""
          /></span>
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
          Get Started
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
      </form>
      <p class="text-center pt-4">
        Already have an account? <a href="" class="text-link">Log in</a>
      </p>
    </div>
  </div>
</template>
