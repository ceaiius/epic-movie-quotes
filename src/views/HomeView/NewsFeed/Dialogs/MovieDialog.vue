<template>
  <div
    class="
      flex flex-col
      bg-black_bg
      md:w-input_width md:h-fit
      pb-12
      w-screen
      h-screen
      md:rounded-xl
      rounded-none
    "
  >
    <div class="flex flex-col items-center mt-6">
      <div class="flex justify-around w-full items-center">
        <img
          class="cursor-pointer"
          src="/images/back-arrow.svg"
          alt=""
          @click="$emit('closePopup')"
        />
        <h2 class="text-white">Add Movie</h2>
        <p class="invisible"></p>
      </div>
      <hr class="w-full border-hr_color mt-6" />
    </div>
    <div class="flex justify-center">
      <Form
        class="mt-10 w-3/4"
        enctype="multipart/form-data"
        @submit="handleSubmit"
      >
        <div class="flex flex-col gap-6">
          <div class="relative">
            <InputField
              placeholder="Movie name"
              name="name_en"
              language="Eng"
              rules="required|min:3|eng"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="ფილმის სახელი"
              language="ქარ"
              name="name_ka"
              rules="required|min:3|geo"
            />
          </div>
          <div class="relative">
            <InputSelect name="genre" />
          </div>

          <div class="relative">
            <InputField
              placeholder="Director"
              language="En"
              name="director_en"
              rules="required|min:3|eng"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="რეჟისორი"
              language="Ka"
              name="director_ka"
              rules="required|min:3|geo"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="Movie description"
              language="En"
              name="description_en"
              rules="required|min:3|eng"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="ფილმის აღწერა"
              language="ქარ"
              name="description_ka"
              rules="required|min:3|geo"
            />
          </div>
          <div class="relative">
            <InputField
              :placeholder="$t('MovieList.year')"
              name="year"
              rules="required|num"
            />
          </div>
          <div class="relative">
            <InputField
              :placeholder="$t('MovieList.budget')"
              name="budget"
              rules="required|numeric"
            />
          </div>
          <div class="relative">
            <InputFile />
          </div>

          <button
            type="submit"
            class="
              text-white
              bg-default_red
              w-full
              h-10
              font-medium
              rounded-md
              text-sm
              mt-6
            "
          >
            Add movie
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script setup>
import { Form } from "vee-validate";
import axios from "@/config/axios/index.js";
import InputField from "../Form/InputField.vue";
import InputFile from "../Form/InputFile.vue";
import InputSelect from "../Form/InputSelect.vue";

const emit = defineEmits(["updateMovies", "closePopup"]);
const url = import.meta.env.VITE_API_BASE_URL + "movies";
const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const handleSubmit = (values) => {
  axios
    .post(
      url,
      {
        name_en: values.name_en,
        name_ka: values.name_ka,
        director_en: values.director_en,
        director_ka: values.director_ka,
        description_en: values.description_en,
        description_ka: values.description_ka,
        genre: values.genre,
        year: values.year,
        budget: values.budget,
        thumbnail: values.thumbnail,
      },
      header
    )
    .then((res) => {
      if (res.status === 200) {
        emit("updateMovies");
        emit("closePopup");
      }
    });
};
</script>


