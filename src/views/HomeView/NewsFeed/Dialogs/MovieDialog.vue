<template>
  <div
    class="
      flex flex-col
      bg-[#11101A]
      md:w-input_width md:h-fit
      pb-12
      w-screen
      h-screen
      md:rounded-xl
      rounded-none
    "
  >
    <div class="flex flex-col items-center mt-6">
      <h2 class="text-white">Add Movie</h2>
      <hr class="w-full border-[#efefef4d] mt-6" />
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
              name="movieEn"
              language="Eng"
              rules="required|min:3"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="ფილმის სახელი"
              language="ქარ"
              name="movieKa"
              rules="required|min:3"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="Genre"
              name="genre"
              rules="required|min:3"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="Director"
              language="En"
              name="directorEn"
              rules="required|min:3"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="რეჟისორი"
              language="Ka"
              name="directorKa"
              rules="required|min:3"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="Movie description"
              language="En"
              name="descriptionEn"
              rules="required|min:3"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="ფილმის აღწერა"
              language="ქარ"
              name="descriptionKa"
              rules="required|min:3"
            />
          </div>
          <div class="relative">
            <InputField placeholder="Year" name="year" rules="required|num" />
          </div>
          <div class="relative">
            <InputField
              placeholder="Budget"
              name="budget"
              rules="required|num"
            />
          </div>
          <div class="relative">
            <InputField
              placeholder="thumbnail"
              name="thumbnail"
              type="file"
              rules="required"
            />
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
import axios from "axios";
import InputField from "../Form/InputField.vue";

const emit = defineEmits(["updateMovies", "closePopup"]);
const url = import.meta.env.VITE_API_BASE_URL + "store-movies";
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
        name: values.movieEn,
        director: values.directorEn,
        description: values.descriptionEn,
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
      
       