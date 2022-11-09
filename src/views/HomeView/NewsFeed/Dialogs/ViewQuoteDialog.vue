
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
      lg:mt-96
      h-screen
      md:rounded-xl
      rounded-none
    "
  >
    <div class="flex flex-col items-center mt-6">
      <div class="flex justify-between p-6 w-full items-center">
        <div class="grid grid-cols-2 divide-x gap-2">
          <img
            class="cursor-pointer"
            src="/images/pencil.svg"
            alt=""
            @click="$emit('edit')"
          />
          <img
            class="cursor-pointer pl-4"
            src="/images/delete.svg"
            alt=""
            @click="$emit('delete')"
          />
        </div>
        <h2 class="text-white">Edit quote</h2>
        <img src="/images/exit.svg" alt="" @click="$emit('exit')" />
      </div>
      <hr class="w-full border-[#efefef4d] mt-6" />
    </div>

    <div class="flex justify-center">
      <div class="flex flex-col gap-6 mt-10 w-3/4">
        <div class="relative">
          <InputReadOnly
            v-model="name_en"
            name="name_en"
            language="Eng"
            is-read-only
          />
        </div>

        <div class="relative">
          <InputReadOnly v-model="name_ka" language="ქარ" name="name_ka" />
        </div>
        <div class="relative">
          <img
            :src="url + thumbnail"
            alt=""
            class="w-full max-h-64 object-contain"
          />
        </div>
        <div class="flex gap-6 text-white m-6">
          <div class="flex gap-2 cursor-pointer">
            2 <img src="/images/comments.svg" alt="" />
          </div>
          <div class="flex gap-2 cursor-pointer">
            10 <img src="/images/likes.svg" alt="" />
          </div>
        </div>
        <div class="m-6 flex gap-6 relative text-white">
          <div>
            <img src="/images/static.png" class="md:w-12 md:h-12" alt="" />
          </div>
          <div>
            <h2>Nina Baldadze</h2>
            <p class="max-w-2xl">რამე</p>
            <hr class="border-[#efefef4d] mt-6" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
  <script setup>
import { onMounted, ref } from "vue";
import axios from "@/config/axios/index.js";
import InputReadOnly from "../Form/InputReadOnly.vue";
const props = defineProps(["id"]);
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["delete", "exit"]);
const thumbnail = ref();
const url = import.meta.env.VITE_API_STORAGE_URL;
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
    thumbnail.value = data.value[0].thumbnail;
  });
};
</script>