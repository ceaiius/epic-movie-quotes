
  <template>
  <div
    class="
      flex flex-col
      bg-black_bg
      md:w-[900px] md:h-fit
      w-screen
      h-screen
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
        <h2 class="text-white">{{ $t("movie_list.add_quote") }}</h2>
        <div></div>
      </div>
    </div>
    <div
      class="
        w-full
        flex
        justify-center
        lg:justify-start
        gap-6
        ml-6
        lg:ml-32
        mt-6
        items-center
      "
    >
      <img
        class="w-40 h-40"
        :src="url_thumbnail + data?.thumbnail"
        alt="user avatar"
      />

      <div class="flex flex-col gap-2">
        <h1 class="text-brown">
          {{ i18n.global.locale == "En" ? data?.name?.en : data?.name?.ka }} ({{
            data?.year
          }})
        </h1>
        <div class="flex gap-2 flex-wrap">
          <div
            v-for="genre in genres"
            :key="genre"
            class="w-fit rounded-md bg-default_red"
          >
            <h2 class="pl-4 pr-4 py-2 text-white">{{ genre }}</h2>
          </div>
        </div>
        <h2 class="text-white">
          {{ $t("movie_list.director") }}:
          {{
            i18n.global.locale == "En" ? data?.director?.en : data?.director?.ka
          }}
        </h2>
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

          <div class="relative">
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
            <Field name="field">
              <select
                id="countries"
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
                <option selected disabled :value="data.id">
                  {{
                    i18n.global.locale == "En" ? data?.name?.en : data?.name?.ka
                  }}
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
              mb-10
              font-medium
              rounded-md
              text-sm
              mt-6
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
import { Form } from "vee-validate";
import { i18n } from "@/i18n";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import InputFile from "@/views/HomeView/NewsFeed/Form/InputFile.vue";

const emit = defineEmits(["closePopup", "updateQuotes"]);
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
const route = useRoute();
const id = route.params.id;
const url_quotes = import.meta.env.VITE_API_BASE_URL + "quotes";

const data = ref([]);
const genres = ref([]);
onMounted(() => {
  getMovies();
});
const getMovies = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}movies/${id}`;
  axios.get(url).then((res) => {
    data.value = res.data;
    genres.value = JSON.parse(res.data.genre);
    console.log(res.data);
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
        movie_id: data.value.id,
      },
      header
    )
    .then((res) => {
      if (res.status === 200) {
        emit("closePopup");
        emit("updateQuotes");
      }
    });
};
</script>