<template>
  <div
    class="flex flex-col mt-0 lg:mt-10 items-center w-full"
    @scroll="onScroll"
  >
    <div>
      <div class="flex">
        <div
          class="
            lg:w-56
            w-full
            justify-center
            lg:p-0
            md:w-screen
            lg:h-14
            h-32
            flex
            items-center
            bg-[#24222F]
            lg:rounded-xl
            rounded-none
          "
        >
          <div
            class="flex w-screen pl-8 md:pl-4 gap-4 cursor-pointer"
            @click="openQuote = true"
          >
            <img src="/images/pencil.svg" alt="pencil icon" />
            <h2 class="text-white">
              {{ $t("news_feed.write_new_quote") }}
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
            <img class="absolute" src="/images/search.svg" alt="search icon" />

            <input
              v-model="inputValue"
              class="w-[686px] text-white bg-transparent pl-10 outline-none"
              type="text"
              :placeholder="$t('news_feed.search')"
              @keyup="handleSearch"
            />

            <hr class="border-hr_color mt-6" />
          </div>
        </div>
      </div>
      <div
        v-for="item in credentials.quotes_array"
        :key="item.id"
        class="w-auto flex flex-col bg-black_bg mt-6 rounded-xl md:mb-12"
      >
        <div>
          <div
            class="
              flex
              items-center
              gap-2
              ml-10
              mt-10
              sm:m-6
              text-white
              w-12
              h-12
            "
          >
            <img
              class="w-12 h-12 object-cover rounded-full"
              :src="thumbnail(item.author.thumbnail)"
              alt="user avatar"
            />
            <h2 class="whitespace-nowrap">{{ item.author.username }}</h2>
          </div>
          <div class="m-6">
            <h2 class="text-white ml-10 mt-2 sm:m-6">
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
                class="sm:w-[550px] mt-2 w-72 object-cover"
                :src="url_thumbnail + item.thumbnail"
                alt="user avatar"
              />
            </div>

            <div class="flex gap-6 text-white ml-10 mt-6 mb-6 sm:m-6">
              <div class="flex gap-2 cursor-pointer">
                {{ item.comments.length }}
                <img src="/images/comments.svg" alt="comments icon" />
              </div>
              <div class="flex gap-2 cursor-pointer">
                {{ item.users_count }}
                <BaseLike
                  :id="item.id"
                  @click="handleLike(item.id, item.user_id)"
                />
              </div>
            </div>
            <hr class="border-hr_color" />
          </div>
        </div>
        <div class="max-h-[450px] overflow-auto">
          <div
            v-for="items in item.comments"
            :key="items.id"
            class="m-6 flex flex-col gap-6 relative text-white"
          >
            <div class="flex gap-6">
              <div class="">
                <img
                  :src="thumbnail(items.author.thumbnail)"
                  class="md:w-12 md:h-12 w-10 h-10 rounded-full object-cover"
                  alt="user avatar"
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
                    alt="delete icon"
                    @click="deleteQuote(items.id)"
                  />
                </div>
              </div>
            </div>
            <hr class="border-hr_color mt-6 w-full" />
          </div>
        </div>

        <CommentSection :id="item.id" :author="item.user_id" :count="count" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { i18n } from "@/i18n";
import axios from "@/config/axios/index.js";
import DialogModal from "@/components/DialogModal.vue";
import QuoteDialog from "@/views/HomeView/NewsFeed/Dialogs/QuoteDialog.vue";
import { useCredentials } from "@/stores/index.js";
import { thumbnail } from "@/helpers/thumbnail";
import BaseLike from "@/views/HomeView/NewsFeed/BaseLike.vue";

import CommentSection from "@/views/HomeView/NewsFeed/CommentSection.vue";
const credentials = useCredentials();

window.Echo.channel(`comment-channel`).listen(".new-comment", () => {
  fetch();
  handleCount();
  handleNotifications();
});

window.Echo.channel(`delete-comment-channel`).listen(".delete-comment", () => {
  fetch();
});

window.Echo.channel(`like-channel`).listen(".add-like", () => {
  fetch();
  handleCount();
  handleNotifications();
});

const handleSearch = () => {
  if (!inputValue.value) {
    return credentials.quotes_array;
  }
  axios
    .post("quotes-search", {
      search: inputValue.value,
    })
    .then((res) => {
      credentials.quotes_array = res.data;
    });
};

const handleCount = () => {
  const url_notifications = `${
    import.meta.env.VITE_API_BASE_URL
  }notifications-count`;
  axios.get(url_notifications).then((res) => {
    credentials.count = res.data;
  });
};

const count = ref(2);

const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
const url = import.meta.env.VITE_API_BASE_URL + `quotes?page=1`;

const openQuote = ref(false);

const inputValue = ref("");
const username = ref("");

const id = ref();

const loadMorePosts = () => {
  let url = import.meta.env.VITE_API_BASE_URL + `quotes?page=${count.value}`;
  if (!inputValue.value && !credentials.quote_search) {
    axios.get(url).then((res) => {
      credentials.quotes_array.push(...res.data.data);
      count.value = count.value + 1;
    });
  }
};
onMounted(() => {
  fetchUser();
  getQuotes();
  onScroll();
});

const fetchUser = () => {
  axios.get("user").then((res) => {
    username.value = res.data.username;
    id.value = res.data.id;
  });
};

const fetch = () => {
  let url = import.meta.env.VITE_API_BASE_URL + `quotes-show`;
  axios
    .post(url, {
      id: count.value,
    })
    .then((res) => {
      credentials.quotes_array = res.data;
    });
};

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

const handleNotifications = async () => {
  const url_notifications = `${import.meta.env.VITE_API_BASE_URL}notifications`;
  axios.get(url_notifications).then((res) => {
    credentials.notifications = res.data;
  });
};

const getQuotes = () => {
  axios.get(url).then((res) => {
    credentials.quotes_array = res.data.data;
  });
};

const deleteQuote = (id) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}comment/${id}`;
  axios.delete(url).then((res) => {
    if (res.status === 200) {
      fetch();
    }
  });
};

const handleLike = async (id, author) => {
  const url_like = `${import.meta.env.VITE_API_BASE_URL}quotes-like`;
  axios
    .post(url_like, {
      quote_id: id,
      user_id: credentials.user_id,
      username: credentials.user_name,
      author_id: author,
    })
    .then(() => {
      fetch();
    });
};
</script>