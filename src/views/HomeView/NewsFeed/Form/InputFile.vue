<template>
  <Field v-slot="{ handleChange, meta }" name="thumbnail" :rules="rules">
    <div
      :class="[
        !meta.touched ? 'border-gray' : '',
        meta.valid && meta.touched ? 'border border-green-500' : '',
        !meta.valid && meta.touched ? 'border border-red-500' : '',
      ]"
      class="border p-3 flex justify-between"
      @drop.prevent="dragFile"
      @dragover.prevent
    >
      <div class="flex gap-6 items-center text-white">
        <img src="/images/file-camera.svg" alt="camera icon" />
        <p>{{ img !== null ? img : "Upload image" }}</p>
      </div>
      <div>
        <p
          class="
            bg-[#462676]
            text-white
            rounded-sm
            p-2
            cursor-pointer
            hover:bg-[#5800FF]
          "
          @click="handleClick"
        >
          Choose file
        </p>

        <input
          id="input"
          type="file"
          class="hidden"
          @change="handleChange"
          @input="setImage"
        />
      </div>
    </div>
  </Field>
</template>

<script setup>
import { ref } from "vue";
import { Field } from "vee-validate";
defineProps(["rules"]);
const handleClick = () => {
  document.getElementById("input").click();
};
const img = ref(null);

const setImage = (e) => {
  img.value = e.target.files.length !== 0 ? e.target.files[0].name : img.value;
};

const dragFile = (e) => {
  document.getElementById("input").files = e.dataTransfer.files;
  img.value = e.dataTransfer.files[0].name;
};
</script>