
  <template>
  <div
    class="
      flex flex-col
      bg-black_bg
      md:w-[900px] md:h-fit
      pb-12
      lg:ml-48 lg:mb-64
      w-screen
      mt-0
      lg:mt-20
      h-screen
      md:rounded-xl
      rounded-none
    "
  >
    <div class="flex flex-col items-center mt-6">
      <div class="flex justify-between p-6 w-full items-center">
        <img
          class="cursor-pointer"
          src="/images/delete.svg"
          alt=""
          @click="$emit('delete')"
        />
        <h2 class="text-white">{{ $t("MovieList.edit_quote") }}</h2>
        <img
          class="cursor-pointer"
          src="/images/exit.svg"
          alt=""
          @click="$emit('exit')"
        />
      </div>
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
              v-model="name_en"
              placeholder="Movie name"
              name="name_en"
              language="Eng"
              rules="min:3|eng"
              height="h-16"
              span="top-4"
            />
          </div>

          <div class="relative">
            <InputField
              v-model="name_ka"
              placeholder="ფილმის სახელი"
              language="ქარ"
              name="name_ka"
              rules="min:3|geo"
              height="h-16"
              span="top-4"
            />
          </div>
          <div class="relative">
            <!-- <InputFile /> -->
            <InputFileEdit />
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
            {{ $t("MovieList.save_changes") }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
    
<script setup>
import { Form } from "vee-validate";
import { onMounted, ref } from "vue";
import axios from "@/config/axios/index.js";

import InputFileEdit from "../Form/InputFileEdit.vue";
import InputField from "../Form/InputField.vue";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
const props = defineProps(["id"]);
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["delete", "exit", "updateQuotes", "closePopup"]);

const data = ref([]);
const name_en = ref();
const name_ka = ref();
const url_quotes = import.meta.env.VITE_API_BASE_URL + "quotes-all";
onMounted(() => {
  getQuotes();
});

const getQuotes = () => {
  axios.get(url_quotes).then((res) => {
    data.value = res.data.filter((x) => x.id == props.id);
    name_en.value = data.value[0].name.en;
    name_ka.value = data.value[0].name.ka;
    credentials.thumbnail = data.value[0].thumbnail;
  });
};

const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const handleSubmit = (values) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}quotes/${props.id}`;
  axios
    .post(
      url,
      {
        name_en: values.name_en,
        name_ka: values.name_ka,
        thumbnail: values.thumbnail,
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