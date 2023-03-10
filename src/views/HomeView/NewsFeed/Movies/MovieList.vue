
  <template>
  <div
    class="flex flex-col w-full mt-8"
    :class="addMovies ? 'blur-sm' : 'blur-none'"
  >
    <div class="w-[80%] ml-[10%]">
      <div class="flex items-center justify-between gap-6 flex-wrap">
        <div class="flex text-white gap-6">
          <h2>{{ $t("movie_list.my_list_of_movies") }}</h2>
          <h2>{{ $t("movie_list.total") }} {{ count }}</h2>
        </div>
        <div class="h-[52px] relative">
          <div class="flex items-center">
            <div class="lg:flex hidden">
              <img
                class="absolute"
                src="/images/search.svg"
                alt="search icon"
              />

              <input
                v-model="inputValue"
                class="text-white bg-transparent pl-10 w-48 outline-none"
                type="text"
                :placeholder="$t('movie_list.search')"
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
                hover:bg-button_hover
              "
              @click="addMovies = true"
            >
              <span><img src="/images/plus.svg" alt="plus icon" /></span>
              {{ $t("movie_list.add_movie") }}
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
              class="h-60 w-96 object-cover rounded-2xl cursor-pointer"
              :src="url_thumbnail + item.thumbnail"
              alt="user avatar"
              @click="handleClick(item.id)"
            />
          </div>
          <div class="mt-2 text-white">
            <h2 class="hover:text-[#DC3535]">
              {{ i18n.global.locale == "En" ? item.name.en : item.name.ka }}
              {{ item.year }}
            </h2>

            <h3 class="flex gap-6 text-2xl mt-2">
              {{ item.quotes.length }}
              <span><img src="/images/chat.png" alt="chat icon" /></span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "@/config/axios/index.js";
import { i18n } from "@/i18n";
import DialogModal from "@/components/DialogModal.vue";
import MovieDialog from "@/views/HomeView/NewsFeed/Dialogs/MovieDialog.vue";
import router from "@/router";
import { useCredentials } from "@/stores/index.js";
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
const credentials = useCredentials();
const searched = computed(() => {
  if (inputValue.value || credentials.movie_search) {
    return data.value.filter((item) => {
      if (i18n.global.locale == "En") {
        return item.name.en
          .toLowerCase()
          .includes(
            inputValue.value.toLowerCase() ||
              credentials.movie_search.toLowerCase()
          );
      } else {
        return item.name.ka.includes(
          inputValue.value || credentials.movie_search
        );
      }
    });
  } else {
    return data.value;
  }
});
const addMovies = ref(false);
const data = ref([]);

const count = ref();
const inputValue = ref(null);

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
</script>