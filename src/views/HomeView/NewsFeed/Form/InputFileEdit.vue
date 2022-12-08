<template>
  <div>
    <div class="relative">
      <img
        id="file"
        class="max-h-[300px] w-full object-cover"
        :src="url + credentials.thumbnail"
        alt="user avatar"
      />
      <div
        class="absolute left-[50%] top-[50%] transform translate-x-[-50%]"
        @click="handleClick"
      >
        <div
          class="
            bg-black
            opacity-80
            rounded-3xl
            w-48
            h-28
            flex flex-col
            justify-center
            items-center
            gap-6
            -mt-12
          "
        >
          <img src="/images/file-camera.svg" class="w-6" alt="camera icon" />
          <h2 class="text-white text-sm">Change photo</h2>
        </div>
      </div>
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
</template>
  
  <script setup>
import { Field } from "vee-validate";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
const url = import.meta.env.VITE_API_STORAGE_URL;

const handleClick = () => {
  document.getElementById("input").click();
};

const setImage = (e) => {
  if (e.target.files.length > 0) {
    var src = URL.createObjectURL(e.target.files[0]);
    var preview = document.getElementById("file");
    preview.src = src;
  }
};
</script>