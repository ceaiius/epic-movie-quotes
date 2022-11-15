<template>
  <div class="flex flex-col mt-10 items-center w-full" @scroll="onScroll">
    <div>
      <div class="flex">
        <div
          class="
            lg:w-56
            w-full
            lg:h-14
            h-32
            flex
            items-center
            bg-[#24222F]
            md:rounded-xl
            rounded-none
          "
        >
          <div class="flex pl-8 md:pl-4 gap-4 cursor-pointer">
            <img src="/images/pencil.svg" alt="" />
            <h2 class="text-white" @click="openQuote = true">
              {{ $t("NewsFeed.write_new_quote") }}
            </h2>
          </div>
        </div>

        <teleport to="body">
          <dialog-modal v-if="openQuote" @close="openQuote = false">
            <QuoteDialog
              @update-quotes="getQuotes"
              @close-popup="openQuote = false"
            />
          </dialog-modal>
        </teleport>

        <div class="h-[52px] lg:flex hidden relative ml-6">
          <div class="flex items-center">
            <img class="absolute" src="/images/search.svg" alt="" />
            <input
              v-model="inputValue"
              class="w-[686px] text-white bg-transparent pl-10 outline-none"
              type="text"
              :placeholder="searchLocale"
            />
            <hr class="border-[#efefef4d] mt-6" />
          </div>
        </div>
      </div>
      <div
        v-for="item in searched"
        :key="item.id"
        class="w-auto flex flex-col bg-black_bg mt-6 rounded-xl md:mb-12"
      >
        <div>
          <div class="flex items-center gap-2 m-6 text-white w-12 h-12">
            <img src="/images/static.png" alt="" />
            <h2 class="whitespace-nowrap">{{ item.author.username }}</h2>
          </div>
          <div class="m-6">
            <h2 class="text-white">
              "{{ i18n.global.locale == "En" ? item.name.en : item.name.ka }}" -
              <span>{{
                i18n.global.locale == "En"
                  ? item.movies.name.en
                  : item.movies.name.ka
              }}</span>
              {{ item.movies.year }}
            </h2>
            <div class="flex justify-center mt-2">
              <img
                class="md:max-w-3xl mt-2"
                :src="url_thumbnail + item.thumbnail"
                alt=""
              />
            </div>

            <div class="flex gap-6 text-white m-6">
              <div class="flex gap-2 cursor-pointer">
                {{ item.comments.length }}
                <img src="/images/comments.svg" alt="" />
              </div>
              <div class="flex gap-2 cursor-pointer">
                {{ item.users_count }}

                <img
                  :src="liked ? '/images/red-like.svg' : '/images/likes.svg'"
                  alt=""
                  @click="handleLike(item.id)"
                />
              </div>
            </div>
            <hr class="border-[#efefef4d]" />
          </div>
        </div>

        <div
          v-for="items in item.comments"
          :key="items.id"
          class="m-6 flex flex-col gap-6 relative text-white"
        >
          <div class="flex gap-6">
            <div class="">
              <img
                src="/images/static.png"
                class="md:w-12 md:h-12 w-10 h-10 object-contain"
                alt=""
              />
            </div>
            <div>
              <h2 class="mt-2 font-extrabold">{{ items.author.username }}</h2>
              <p class="max-w-2xl"></p>
              <div class="max-w-sm mt-5 flex lg:max-w-prose break-words">
                <p class="text-grey text-clip overflow-hidden">
                  {{ items.body }}
                </p>
                <img
                  :class="
                    username == items.author.username ? 'block' : 'hidden'
                  "
                  class="absolute right-0 cursor-pointer"
                  src="/images/delete.svg"
                  alt=""
                  @click="deleteQuote(items.id)"
                />
              </div>
            </div>
          </div>
          <hr class="border-[#efefef4d] mt-6 w-full" />
        </div>
        <div>
          <div class="m-6 flex">
            <img
              src="/images/static.png"
              class="hidden lg:block w-12 h-12"
              alt=""
            />
            <form class="w-full" @submit.prevent="handleComment(item.id)">
              <input
                id=""
                v-model="commentValue"
                class="
                  lg:w-full
                  w-96
                  h-16
                  bg-[#24222F]
                  pt-4
                  pl-4
                  ml-6
                  rounded-xl
                  outline-none
                  text-white
                "
                cols="30"
                rows="2"
                :placeholder="commentLocale"
              />
              <input type="submit" hidden />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { i18n } from "../../../i18n";
import axios from "@/config/axios/index.js";
import DialogModal from "../../../components/DialogModal.vue";
import QuoteDialog from "./Dialogs/QuoteDialog.vue";
import Echo from "laravel-echo";
import { isAuthenticated } from "../../../router/guards";
import { useCredentials } from "@/stores/index.js";

// eslint-disable-next-line no-unused-vars
const watchAuth = watch(() => {
  if (isAuthenticated) {
    window.Echo = new Echo({
      authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      withCredentials: true,
      enabledTransports: ["ws", "wss"],
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
  }
});
window.Echo.channel(`comment-channel`).listen(".new-comment", () => {
  getQuotes();
});

window.Echo.channel(`delete-comment-channel`).listen(".delete-comment", () => {
  getQuotes();
});

window.Echo.channel(`like-channel`).listen(".add-like", () => {
  getQuotes();
});

const count = ref(2);
const credentials = useCredentials();
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
const url = import.meta.env.VITE_API_BASE_URL + `quotes?page=1`;

const openQuote = ref(false);
const commentValue = ref("");
const inputValue = ref("");
const username = ref("");

const commentLocale = computed(
  () => i18n.global.messages[i18n.global.locale].NewsFeed.write_comment
);
const searchLocale = computed(
  () => i18n.global.messages[i18n.global.locale].NewsFeed.search
);

const data = ref([]);
const liked = ref(false);
const searched = computed(() => {
  if (inputValue.value || credentials.quote_search) {
    return data.value.filter((item) => {
      if (
        i18n.global.locale == "En" &&
        (inputValue.value.charAt(0) == "@" ||
          credentials.quote_search.charAt(0) == "@")
      ) {
        return item.movies.name.en
          .toLowerCase()
          .includes(
            inputValue.value.toLowerCase().replace("@", "") ||
              credentials.quote_search.toLowerCase().replace("@", "")
          );
      } else if (
        i18n.global.locale == "En" &&
        (inputValue.value.charAt(0) == "#" ||
          credentials.quote_search.charAt(0) == "#")
      ) {
        return item.name.en
          .toLowerCase()
          .includes(
            inputValue.value.toLowerCase().replace("#", "") ||
              credentials.quote_search.toLowerCase().replace("#", "")
          );
      } else if (
        i18n.global.locale == "Ka" &&
        (inputValue.value.charAt(0) == "@" ||
          credentials.quote_search.charAt(0) == "@")
      ) {
        return item.movies.name.ka.includes(
          inputValue.value.replace("@", "") ||
            credentials.quote_search.replace("@", "")
        );
      } else if (
        i18n.global.locale == "Ka" &&
        (inputValue.value.charAt(0) == "#" ||
          credentials.quote_search.charAt(0) == "#")
      ) {
        return item.name.ka.includes(
          inputValue.value.replace("#", "") ||
            credentials.quote_search.replace("#", "")
        );
      } else if (i18n.global.locale == "En") {
        return item.name.en
          .toLowerCase()
          .includes(
            inputValue.value.toLowerCase() ||
              credentials.quote_search.toLowerCase()
          );
      } else if (i18n.global.locale == "Ka") {
        return item.name.ka
          .toLowerCase()
          .includes(inputValue.value.toLowerCase() || credentials.quote_search);
      }
    });
  } else {
    return data.value;
  }
});

const handleComment = (id) => {
  const url_comment = `${import.meta.env.VITE_API_BASE_URL}comment/${id}`;
  axios.post(url_comment, {
    body: commentValue.value,
  });

  commentValue.value = "";
};
console.log(data);
const loadMorePosts = () => {
  let url = import.meta.env.VITE_API_BASE_URL + `quotes?page=${count.value}`;

  axios.get(url).then((res) => {
    data.value.push(...res.data.data);
    count.value = count.value + 1;
  });
};
onMounted(() => {
  axios.get("user").then((res) => (username.value = res.data.username));

  getQuotes();
  onScroll();
});

const onScroll = () => {
  window.onscroll = () => {
    let bottomOfWindow =
      Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      ) +
        window.innerHeight ===
      document.documentElement.offsetHeight;

    if (bottomOfWindow) {
      loadMorePosts();
    }
  };
};

const getQuotes = () => {
  axios.get(url).then((res) => {
    data.value = res.data.data;
  });
};

const deleteQuote = (id) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}comment/${id}`;
  axios.delete(url).then((res) => {
    if (res.status === 200) {
      getQuotes();
    }
  });
};

const handleLike = async (id) => {
  const url_like = `${import.meta.env.VITE_API_BASE_URL}quotes-like`;
  axios
    .post(url_like, {
      quote_id: id,
      user_id: credentials.user_id,
    })
    .then((res) => {
      getQuotes();
      if (res.data.message == "unlike") {
        liked.value = false;
      } else if (res.data.message == "like") {
        liked.value = true;
      }
    });
};
</script>