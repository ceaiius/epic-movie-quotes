<template>
  <div
    class="
      flex flex-col
      bg-black_bg
      md:w-input_width md:h-fit
      w-screen
      max-h-screen
      overflow-auto
      md:mt-0 md:rounded-xl
      rounded-none
    "
  >
    <div class="flex flex-col items-center mt-12">
      <div class="flex justify-around w-full items-center">
        <img
          class="cursor-pointer"
          src="/images/back-arrow.svg"
          alt="back arrow icon"
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
              :placeholder="$t('movie_list.year')"
              name="year"
              rules="required|num"
            />
          </div>
          <div class="relative">
            <InputField
              :placeholder="$t('movie_list.budget')"
              name="budget"
              rules="required|numeric"
            />
          </div>
          <div class="relative">
            <InputFile rules="required" />
          </div>

          <button
            type="submit"
            class="
              text-white
              bg-default_red
              w-full
              h-10
              mb-10
              font-medium
              rounded-md
              text-sm
              mt-6
              hover:bg-button_hover
            "
          >
            {{ $t("movie_list.add_movie") }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script setup>
import { Form } from "vee-validate";
import axios from "@/config/axios/index.js";
import InputField from "@/views/HomeView/NewsFeed/Form/InputField.vue";
import InputFile from "@/views/HomeView/NewsFeed/Form/InputFile.vue";
import InputSelect from "@/views/HomeView/NewsFeed/Form/InputSelect.vue";

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


