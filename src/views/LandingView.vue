<template>
  <div class="h-screen bg-gradient-to-tr from-[#11101A] to-[#08080D]">
    <nav class="px-2 sm:px-4 py-4 rounded">
      <div
        class="container flex flex-wrap justify-between items-center mx-auto"
      >
        <span
          class="
            self-center
            text-base
            font-semibold
            whitespace-nowrap
            text-brown
          "
          >Movie Quotes</span
        >

        <div id="navbar-default" class="">
          <ul class="flex p-4 rounded-lg text-white space-x-8">
            <li class="mt-2" @click="onClick">
              <a class="flex justify-center items-center gap-2"
                >{{ english }}
                <span><img src="/images/arrow.svg" alt="" /></span
              ></a>
              <a v-if="!isHidden" class="absolute" @click="changeLanguage">{{
                georgian
              }}</a>
            </li>
            <li class="hidden md:block">
              <button
                type="button"
                class="
                  focus:outline-none
                  text-white
                  bg-red
                  w-28
                  h-10
                  font-medium
                  rounded-md
                  text-sm
                "
              >
                Sign Up
              </button>
            </li>
            <li>
              <button
                type="button"
                class="
                  focus:outline-none
                  text-white
                  border border-white
                  w-28
                  h-10
                  font-medium
                  rounded-md
                  text-sm
                "
              >
                Log In
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="flex flex-col items-center justify-center">
      <header>
        <h1
          class="
            text-brown
            md:text-6xl
            font-bold
            text-center
            md:leading-relaxed
            text-2xl
            whitespace-nowrap
            mt-52
          "
        >
          Find any quote in <br />
          millions of movie lines
        </h1>
      </header>
      <button
        type="button"
        class="text-white bg-red w-28 h-10 font-medium rounded-md text-sm mt-6"
      >
        Get Started
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const isHidden = ref(true);
    const toggle = ref(false);
    const english = ref("En");
    const georgian = ref("Ka");
    const log = () => {
      console.log("blurred");
    };

    const changeLanguage = () => {
      toggle.value = !toggle.value;
      if (toggle.value == true) {
        english.value = "Ka";
        georgian.value = "En";
      } else if (toggle.value == false) {
        english.value = "En";
        georgian.value = "Ka";
      }
    };
    const onClick = () => {
      isHidden.value = !isHidden.value;
      setTimeout(() => {
        isHidden.value = true;
      }, 5000);
    };
    return {
      isHidden,
      onClick,
      georgian,
      english,
      changeLanguage,
      log,
    };
  },
};
</script>


