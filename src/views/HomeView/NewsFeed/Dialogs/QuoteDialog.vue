
  <template>
  <div
    class="
      flex flex-col
      bg-black_bg
      md:w-[900px] md:h-fit
      pb-12
      lg:ml-48 lg:mb-64
      w-screen
      lg:mt-20
      h-screen
      md:rounded-xl
      rounded-none
    "
  >
    <div class="flex flex-col items-center mt-24">
      <div class="flex justify-around w-full items-center">
        <img
          class="cursor-pointer"
          src="/images/back-arrow.svg"
          alt="back arrow icon"
          @click="$emit('closePopup')"
        />
        <h2 class="text-white">{{ $t("news_feed.write_new_quote") }}</h2>
        <p class="invisible"></p>
      </div>
      <hr class="w-full border-hr_color mt-6" />
      <div class="w-full flex justify-start items-center ml-[25%] gap-6 mt-6">
        <img
          :src="thumbnail(credentials.avatar)"
          class="object-cover rounded-full block w-12 h-12"
          alt="user avatar"
        />
        <h2 class="text-white">{{ credentials.user_name }}</h2>
      </div>
    </div>
    <div class="flex justify-center">
      <Form
        class="mt-10 w-3/4"
        enctype="multipart/form-data"
        @submit="handleSubmit"
      >
        <div class="flex flex-col gap-6">
          <div class="relative">
            <InputTextArea
              placeholder="New Quote"
              name="name_en"
              language="Eng"
              rules="required|min:3|eng"
            />
          </div>
          <div class="relative">
            <InputTextArea
              placeholder="ახალი ციტატა"
              language="ქარ"
              name="name_ka"
              rules="required|min:3|geo"
            />
          </div>
          <div>
            <InputFile rules="required" />
          </div>

          <div class="relative">
            <div>
              <img
                class="absolute top-5 left-4"
                src="/images/camera.svg"
                alt="camera icon"
              />
            </div>
            <Field v-slot="{ meta, field }" name="field" rules="required">
              <select
                id="movies"
                v-model="selectValue"
                v-bind="field"
                :class="[
                  !meta.valid && meta.touched ? 'border border-red-500' : '',
                ]"
                class="
                  bg-black
                  text-white
                  rounded-lg
                  block
                  w-full
                  p-2.5
                  pl-16
                  h-20
                "
              >
                <option disabled value>Choose movie</option>
                <option v-for="item in options" :key="item.id" :value="item.id">
                  {{ i18n.global.locale == "En" ? item.name.en : item.name.ka }}
                </option>
              </select>
            </Field>
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
            {{ $t("news_feed.post") }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import InputTextArea from "@/views/HomeView/NewsFeed/Form/InputTextArea.vue";

import axios from "@/config/axios/index.js";
import { Form, Field } from "vee-validate";
import { i18n } from "@/i18n";
import { onMounted, ref } from "vue";
import InputFile from "@/views/HomeView/NewsFeed/Form/InputFile.vue";
import { useCredentials } from "@/stores/index.js";
import { thumbnail } from "@/helpers/thumbnail";
const credentials = useCredentials();
const emit = defineEmits(["updateQuotes", "closePopup"]);
const url = import.meta.env.VITE_API_BASE_URL + "movies";
const url_quotes = import.meta.env.VITE_API_BASE_URL + "quotes";
const selectValue = ref("");
const options = ref([]);

onMounted(() => {
  getMovies();
});
const getMovies = () => {
  axios.get(url).then((res) => {
    options.value = res.data;
  });
};
const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const handleSubmit = (values) => {
  axios
    .post(
      url_quotes,
      {
        name_en: values.name_en,
        name_ka: values.name_ka,
        thumbnail: values.thumbnail,
        movie_id: selectValue.value,
      },
      header
    )
    .then((res) => {
      if (res.status === 200) {
        emit("updateQuotes");
        emit("closePopup");
      }
    });
};
</script>