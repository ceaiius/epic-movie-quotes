<template>
  <div class="flex flex-col w-full mt-8">
    <div class="w-[80%] ml-[10%]">
      <div class="flex-col lg:flex-row flex items-center lg:items-start">
        <div class="flex flex-col text-white gap-6">
          <h2>{{ $t("MovieList.movie_description") }}</h2>
          <img
            :src="'http://localhost:8000/storage/' + data?.thumbnail"
            alt=""
            class="rounded-2xl"
          />
        </div>
        <div class="h-[52px] relative ml-6">
          <div class="flex flex-col text-white text-left mt-10 gap-6">
            <div class="flex">
              <h1 class="text-3xl text-brown">
                {{
                  i18n.global.locale == "En" ? data?.name?.en : data?.name?.ka
                }}
                ({{ data?.year }})
              </h1>
              <div class="block lg:hidden mt-10">
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
            </div>

            <h2>{{ data?.genre }}</h2>
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
import EditMovieDoalog from "../Dialogs/EditMovieDoalog.vue";

onBeforeMount(() => {
  getMovies();
});
const editMovie = ref(false);
const route = useRoute();
const id = route.params.id;
const data = ref();
const getMovies = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}movies/${id}`;
  axios.get(url).then((res) => {
    data.value = res.data;
  });
};

const deleteMovie = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}movies/${id}`;
  axios.delete(url).then((res) => {
    router.push({ name: "list-of-movies" });
    console.log(res);
  });
};
</script>