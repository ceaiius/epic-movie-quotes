
  <template>
  <div
    class="flex flex-col w-full mt-8"
    :class="addMovies ? 'blur-sm' : 'blur-none'"
  >
    <div class="w-[80%] ml-[10%]">
      <div class="flex items-center justify-between">
        <div class="flex text-white gap-6">
          <h2>{{ $t("MovieList.my_list_of_movies") }}</h2>
          <h2>{{ $t("MovieList.total") }} {{ count }}</h2>
        </div>
        <div class="h-[52px] relative ml-6">
          <div class="flex items-center">
            <div class="lg:flex hidden">
              <img class="absolute" src="/images/search.svg" alt="" />

              <input
                v-model="inputValue"
                class="text-white bg-transparent pl-10 w-48 outline-none"
                type="text"
                :placeholder="placeholderSearch"
              />
            </div>

            <button
              type="button"
              class="
                text-white
                bg-default_red
                w-32
                h-10
                flex
                justify-center
                items-center
                gap-2
                font-medium
                rounded-md
                text-sm
              "
              @click="addMovies = true"
            >
              <span><img src="/images/plus.svg" alt="" /></span>
              {{ $t("MovieList.add_movie") }}
            </button>
          </div>
        </div>
      </div>
      <teleport to="body">
        <dialog-modal v-if="addMovies" @close="addMovies = false">
          <MovieDialog
            @update-movies="getMovies"
            @close-popup="addMovies = false"
          />
        </dialog-modal>
      </teleport>
      <div class="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
        <div v-for="item in searched" :key="item.id">
          <div>
            <img
              class="max-h-64 rounded-2xl"
              :src="'http://localhost:8000/storage/' + item.thumbnail"
              alt=""
              @click="handleClick(item.id)"
            />
          </div>
          <div class="mt-2 text-white">
            <h2>
              {{ i18n.global.locale == "En" ? item.name.en : item.name.ka }}
              {{ item.year }}
            </h2>

            <h3 class="flex gap-6 text-2xl mt-2">
              10 <span><img src="/images/chat.png" alt="" /></span>
            </h3>
          </div>
        </div>
      </div>

      <!-- <input v-model="inputValue" type="text" />
      <div v-for="item in searched" :key="item">
        {{ item }}
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "@/config/axios/index.js";
import { i18n } from "../../../../i18n";
import DialogModal from "../../../../components/DialogModal.vue";
import MovieDialog from "../Dialogs/MovieDialog.vue";
import router from "../../../../router";

const stuff = ref(["nika", "gio", "achi"]);

const searched = computed(() => {
  if (inputValue.value) {
    return data.value.filter((item) => {
      if (i18n.global.locale == "En") {
        return item.name.en.includes(inputValue.value);
      } else {
        return item.name.ka.includes(inputValue.value);
      }
    });
  } else {
    return data.value;
  }
});

const data = ref([]);

const count = ref();
const inputValue = ref(null);
const placeholderSearch = computed(
  () => i18n.global.messages[i18n.global.locale].MovieList.search
);

const url = import.meta.env.VITE_API_BASE_URL + "movies";

const handleClick = (id) => {
  router.push({ name: "movie", params: { id: id } });
};

onMounted(() => {
  getMovies();
});
const getMovies = () => {
  axios.get(url).then((res) => {
    data.value = res.data;
    count.value = res.data.length;
  });
};
const addMovies = ref(false);
</script>