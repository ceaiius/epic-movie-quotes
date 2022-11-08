
  <template>
  <div
    class="
      flex flex-col
      bg-black_bg
      md:w-[900px] md:h-fit
      pb-12
      lg:ml-48 lg:mb-64
      w-screen
      mt-20
      h-screen
      md:rounded-xl
      rounded-none
    "
  >
    <div class="flex flex-col items-center mt-6">
      <h2 class="text-white">Edit quote</h2>
      <hr class="w-full border-[#efefef4d] mt-6" />
    </div>

    <div class="flex justify-center">
      <Form class="mt-10 w-3/4" enctype="multipart/form-data">
        <div class="flex flex-col gap-6">
          <div class="relative">
            <InputTextAreaNew
              v-model="name_en"
              placeholder="New Quote"
              name="name_en"
              language="Eng"
              rules="required|min:3"
            />
          </div>

          <div class="relative">
            <InputTextAreaNew
              v-model="name_ka"
              placeholder="ახალი ციტატა"
              language="ქარ"
              name="name_ka"
              rules="required|min:3|geo"
            />
          </div>
          <div class="relative">
            <InputField name="thumbnail" type="file" rules="required|min:3" />
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
            Post
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
    
<script setup>
import InputField from "../Form/InputField.vue";
import InputTextAreaNew from "../Form/InputTextAreaNew.vue";
import { onMounted, ref } from "vue";
import axios from "@/config/axios/index.js";
const props = defineProps(["id"]);

const data = ref([]);
const name_en = ref();
const name_ka = ref();
const url_quotes = import.meta.env.VITE_API_BASE_URL + "quotes";
onMounted(() => {
  getQuotes();
});

const getQuotes = () => {
  axios.get(url_quotes).then((res) => {
    data.value = res.data.filter((x) => x.id == props.id);
    name_en.value = data.value[0].name.en;
    name_ka.value = data.value[0].name.ka;
  });
};
</script>