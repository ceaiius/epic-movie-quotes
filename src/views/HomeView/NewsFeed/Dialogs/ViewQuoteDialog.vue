
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
      lg:mt-80
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
            alt="pencil icon"
            @click="$emit('edit')"
          />
          <img
            class="cursor-pointer pl-4"
            src="/images/delete.svg"
            alt="delete icon"
            @click="$emit('delete')"
          />
        </div>
        <h2 class="text-white">{{ $t("movie_list.view_quote") }}</h2>
        <img
          class="cursor-pointer"
          src="/images/exit.svg"
          alt="exit icon"
          @click="$emit('exit')"
        />
      </div>
      <hr class="w-full border-hr_color mt-6" />
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
            :src="url_thumbnail + thumbnail"
            alt="user avatar"
            class="w-full max-h-64 object-cover"
          />
        </div>
        <div class="flex gap-6 text-white m-6">
          <div class="flex gap-2 cursor-pointer">
            {{ comment_count }}
            <img src="/images/comments.svg" alt="comments icon" />
          </div>
          <div class="flex gap-2 cursor-pointer">
            {{ likes }} <img src="/images/likes.svg" alt="likes icon" />
          </div>
        </div>

        <div class="m-6 flex gap-6 relative text-white">
          <div v-if="comment_count == 0">
            <h2>No comments yet</h2>
          </div>
          <div v-else class="flex gap-6 items-center justify-center">
            <div>
              <img
                :src="avatar(credentials.avatar)"
                class="md:w-12 md:h-12 rounded-full object-cover"
                alt="user icon"
              />
            </div>
            <div>
              <h2>{{ username }}</h2>
              <p class="max-w-2xl">{{ comment }}</p>
              <hr class="border-hr_color mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
  <script setup>
import { ref } from "vue";

import InputReadOnly from "@/views/HomeView/NewsFeed/Form/InputReadOnly.vue";
import { useCredentials } from "@/stores/index.js";
import { thumbnail as avatar } from "@/helpers/thumbnail";
const credentials = useCredentials();
const props = defineProps(["id", "quotes"]);
defineEmits(["delete", "exit"]);
const thumbnail = ref(props.quotes.thumbnail);
const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
const username = ref(
  props.quotes.comments.length == 0
    ? ""
    : props.quotes.comments[0].author.username
);
const comment = ref(
  props.quotes.comments.length == 0
    ? props.quotes.comments.body
    : props.quotes.comments[0].body
);
const name_en = ref(props.quotes.name.en);
const comment_count = ref(props.quotes.comments.length);
const name_ka = ref(props.quotes.name.ka);
const likes = ref(0);

console.log(props.quotes.comments.length);
</script>