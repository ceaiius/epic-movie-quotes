<template>
  <div
    class="
      flex flex-col
      bg-black_bg
      md:w-input_width md:h-fit
      pb-12
      w-screen
      max-h-screen
      overflow-auto
      md:rounded-xl
      rounded-none
    "
  >
    <div class="flex flex-col items-center mt-12">
      <div class="flex items-center justify-between w-full">
        <img
          class="cursor-pointer pl-6"
          src="/images/back-arrow.svg"
          alt="back arrow icon"
          @click="$emit('closePopup')"
        />
        <h2 class="text-white">{{ $t("movie_list.edit_movie") }}</h2>
        <div></div>
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
              v-model="name_en"
              placeholder="Movie name"
              name="name_en"
              language="Eng"
              rules="min:3|eng"
            />
          </div>
          <div class="relative">
            <InputField
              v-model="name_ka"
              placeholder="ფილმის სახელი"
              language="ქარ"
              name="name_ka"
              rules="min:3|geo"
            />
          </div>
          <div class="relative">
            <InputSelect name="genre" :values="genre" />
          </div>
          <div class="relative">
            <InputField
              v-model="director_en"
              placeholder="Director"
              language="En"
              name="director_en"
              rules="min:3|eng"
            />
          </div>
          <div class="relative">
            <InputField
              v-model="director_ka"
              placeholder="რეჟისორი"
              language="Ka"
              name="director_ka"
              rules="min:3|geo"
            />
          </div>
          <div class="relative">
            <InputField
              v-model="description_en"
              placeholder="Movie description"
              language="En"
              name="description_en"
              rules="min:3|eng"
            />
          </div>
          <div class="relative">
            <InputField
              v-model="description_ka"
              placeholder="ფილმის აღწერა"
              language="ქარ"
              name="description_ka"
              rules="min:3|geo"
            />
          </div>
          <div class="relative">
            <InputField
              v-model="year"
              :placeholder="$t('movie_list.year')"
              name="year"
              rules="num"
            />
          </div>
          <div class="relative">
            <InputField
              v-model="budget"
              :placeholder="$t('movie_list.budget')"
              name="budget"
              rules="numeric"
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
              hover:bg-button_hover
            "
          >
            {{ $t("movie_list.save_changes") }}
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
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
const emit = defineEmits(["updateMovies", "closePopup"]);
const props = defineProps(["movie"]);
const route = useRoute();
const id = route.params.id;
const url = `${import.meta.env.VITE_API_BASE_URL}movies/${id}`;
const name_en = ref(props.movie.name.en);
const name_ka = ref(props.movie.name.ka);
const director_en = ref(props.movie.director.en);
const director_ka = ref(props.movie.director.ka);
const description_en = ref(props.movie.description.en);
const description_ka = ref(props.movie.description.ka);
const genre = ref(props.movie.genre);
const budget = ref(props.movie.budget);
const year = ref(props.movie.year);

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
        genre: credentials.chip,
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
  
  
  