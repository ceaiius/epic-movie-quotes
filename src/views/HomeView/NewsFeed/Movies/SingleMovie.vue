<template>
  <div class="flex flex-col w-full mt-8">
    <div class="w-[80%] ml-[10%]">
      <div class="flex-col lg:flex-row flex items-center lg:items-start">
        <teleport to="body">
          <dialog-modal v-if="addQuote" @close="addQuote = false">
            <AddQuote
              @close-popup="addQuote = false"
              @update-quotes="getQuotes"
            />
          </dialog-modal>
        </teleport>
        <div class="flex flex-col text-white gap-6">
          <h2>{{ $t("MovieList.movie_description") }}</h2>
          <img
            :src="url + data?.thumbnail"
            alt=""
            class="w-[800px] h-[530px] object-cover"
          />
          <div class="flex flex-col gap-6 lg:hidden">
            <h1 class="text-3xl text-brown">
              {{ i18n.global.locale == "En" ? data?.name?.en : data?.name?.ka }}
              ({{ data?.year }})
            </h1>
            <div class="flex gap-2 pt-6 flex-wrap">
              <div
                v-for="genre in genres"
                :key="genre"
                class="w-fit rounded-md bg-default_red"
              >
                <h2 class="pl-4 pr-4 py-2">{{ genre }}</h2>
              </div>
            </div>
            <p>
              {{ $t("MovieList.director") }}:
              {{
                i18n.global.locale == "En"
                  ? data?.director?.en
                  : data?.director?.ka
              }}
            </p>
            <p>{{ $t("MovieList.budget") }}: {{ data?.budget }}$</p>
            <p>
              {{
                i18n.global.locale == "En"
                  ? data?.description?.en
                  : data?.description?.ka
              }}
            </p>
          </div>
          <div class="block lg:hidden mt-10">
            <div
              class="
                bg-form_bg
                w-32
                h-10
                items-center
                grid grid-cols-2
                divide-x
              "
            >
              <img
                src="/images/pencil.svg"
                class="h-5 pl-6 cursor-pointer"
                alt=""
                @click="editMovie = true"
              />

              <img
                src="/images/delete.svg"
                class="h-5 pl-4 cursor-pointer"
                alt=""
                @click="deleteMovie"
              />
            </div>
          </div>
          <div class="flex gap-6 items-center">
            <h2>
              {{ $t("MovieList.quotes") }} ({{ $t("MovieList.total") }}
              {{ count }})
            </h2>
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
                cursor-pointer
              "
              @click="addQuote = true"
            >
              <span><img src="/images/plus.svg" alt="" /></span>
              {{ $t("MovieList.add_quote") }}
            </button>
          </div>

          <div
            v-for="item in data_quotes"
            :id="item.id"
            :key="item.id"
            class="
              bg-black_bg
              flex flex-col
              w-full
              h-auto
              justify-center
              items-center
              lg:items-start
              rounded-2xl
              mb-6
              relative
            "
          >
            <div
              v-if="quoteCrud === item.id"
              class="z-10 w-full h-screen fixed top-0 left-0"
              @click="quoteCrud = 0"
            ></div>
            <div
              v-if="quoteCrud === item.id"
              class="
                bg-[#24222F]
                z-50
                rounded-2xl
                w-60
                h-40
                absolute
                bottom-10
                right-0
                lg:top-12 lg:-right-36
              "
            >
              <teleport to="body">
                <dialog-modal v-if="editQuote" @close="editQuote = false">
                  <EditQuoteDialog
                    :id="item.id"
                    @delete="deleteQuote(item.id)"
                    @exit="editQuote = false"
                    @update-quotes="getQuotes"
                    @close-popup="editQuote = false"
                  />
                </dialog-modal>
              </teleport>
              <teleport to="body">
                <dialog-modal v-if="viewQuote" @close="viewQuote = false">
                  <ViewQuoteDialog
                    :id="item.id"
                    @exit="viewQuote = false"
                    @delete="deleteQuote(item.id)"
                    @edit="(editQuote = true), (viewQuote = false)"
                  />
                </dialog-modal>
              </teleport>
              <div class="text-sm">
                <div
                  class="flex gap-4 pt-6 pl-6 cursor-pointer"
                  @click="viewQuote = true"
                >
                  <img src="/images/eye.svg" alt="" />
                  <h2>View Quote</h2>
                </div>
                <div
                  class="flex gap-4 pt-6 pl-6 cursor-pointer"
                  @click="editQuote = true"
                >
                  <img src="/images/pencil.svg" alt="" />
                  <h2>Edit</h2>
                </div>
                <div
                  class="flex gap-4 pt-6 pl-6 cursor-pointer"
                  @click="deleteQuote(item.id)"
                >
                  <img src="/images/delete.svg" alt="" />
                  <h2>Delete</h2>
                </div>
              </div>
            </div>

            <div>
              <img
                class="absolute right-6 bottom-6 lg:top-6 z-50 cursor-pointer"
                src="/images/dots.svg"
                alt=""
                @click="quoteCrud = item.id"
              />
            </div>
            <div
              class="
                flex flex-col
                lg:flex-row
                items-center
                justify-around
                w-full
                mt-8
              "
            >
              <img
                class="object-cover w-64 h-36 ml-6 rounded-md"
                :src="url_thumbnail + item.thumbnail"
                alt=""
              />
              <h2 class="mt-2 lg:mt-0 ml-6">
                "{{ i18n.global.locale == "En" ? item.name.en : item.name.ka }}"
              </h2>
            </div>
            <hr class="border-hr_color mt-6 w-full" />
            <div class="flex gap-6 items-center mt-6 mb-6 ml-0 lg:ml-28">
              <div class="flex gap-6">
                <h2>{{ item.comments.length }}</h2>
                <img src="/images/comments.svg" alt="" />
              </div>
              <div class="flex gap-6">
                <h2>{{ item.users_count }}</h2>
                <img src="/images/likes.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div class="h-[52px] relative ml-6 hidden lg:block">
          <div class="flex flex-col text-white text-left mt-10 gap-6">
            <div class="flex">
              <h1 class="text-3xl text-brown">
                {{
                  i18n.global.locale == "En" ? data?.name?.en : data?.name?.ka
                }}
                ({{ data?.year }})
              </h1>
            </div>

            <div class="flex gap-2 flex-wrap">
              <div
                v-for="genre in genres"
                :key="genre"
                class="w-fit rounded-md bg-default_red"
              >
                <h2 class="pl-4 pr-4 py-2">{{ genre }}</h2>
              </div>
            </div>
            <p>
              {{ $t("MovieList.director") }}:
              {{
                i18n.global.locale == "En"
                  ? data?.director?.en
                  : data?.director?.ka
              }}
            </p>

            <p>{{ $t("MovieList.budget") }}: {{ data?.budget }} $</p>

            <p>
              {{
                i18n.global.locale == "En"
                  ? data?.description?.en
                  : data?.description?.ka
              }}
              {{}}
            </p>
          </div>
        </div>

        <div class="hidden lg:block mt-10">
          <div
            class="
              bg-form_bg
              ml-20
              w-32
              h-10
              items-center
              grid grid-cols-2
              divide-x
            "
          >
            <img
              src="/images/pencil.svg"
              class="h-5 pl-6 cursor-pointer"
              alt=""
              @click="editMovie = true"
            />

            <img
              src="/images/delete.svg"
              class="h-5 pl-4 cursor-pointer"
              alt=""
              @click="deleteMovie"
            />
          </div>
        </div>
        <teleport to="body">
          <dialog-modal v-if="editMovie" @close="editMovie = false">
            <EditMovieDoalog
              @update-movies="router.push({ name: 'list-of-movies' })"
              @close-popup="editMovie = false"
            />
          </dialog-modal>
        </teleport>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onBeforeMount, ref } from "vue";
import axios from "@/config/axios/index.js";
import { i18n } from "../../../../i18n";
import { useRoute } from "vue-router";
import router from "../../../../router";
import DialogModal from "../../../../components/DialogModal.vue";
import EditMovieDoalog from "../Dialogs/EditMovieDialog.vue";
import AddQuote from "./AddQuote.vue";
import EditQuoteDialog from "../Dialogs/EditQuoteDialog.vue";
import ViewQuoteDialog from "../Dialogs/ViewQuoteDialog.vue";
const quoteCrud = ref();
const editQuote = ref(false);
const addQuote = ref(false);

const viewQuote = ref(false);
const url = import.meta.env.VITE_API_STORAGE_URL;
const url_quotes = import.meta.env.VITE_API_BASE_URL + "quotes-all";
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
const data_quotes = ref([]);
const genres = ref([]);
const count = ref();
onBeforeMount(() => {
  getMovies();
  getQuotes();
});

const editMovie = ref(false);
const route = useRoute();
const id = route.params.id;
const data = ref();
const getMovies = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}movies/${id}`;
  axios.get(url).then((res) => {
    data.value = res.data;

    genres.value = JSON.parse(res.data.genre);
  });
};
const getQuotes = () => {
  axios.get(url_quotes).then((res) => {
    const filtered = res.data.filter((x) => x.movie_id == data?.value.id);
    data_quotes.value = filtered;
    count.value = filtered.length;
  });
};

const deleteQuote = (id) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}quotes/${id}`;
  axios.delete(url).then((res) => {
    if (res.status === 200) {
      getQuotes();
    }
  });
};

const deleteMovie = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}movies/${id}`;
  axios.delete(url).then(() => {
    router.push({ name: "list-of-movies" });
  });
};
</script>