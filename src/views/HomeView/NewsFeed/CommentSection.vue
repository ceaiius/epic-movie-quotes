<template>
  <div>
    <div class="m-6 flex justify-center items-center">
      <img
        :src="thumbnail(credentials.avatar)"
        class="hidden object-cover rounded-full lg:block w-12 h-12"
        alt="user avatar"
      />
      <Form class="w-full flex justify-center" @submit="handleComment">
        <Field
          v-model="commentValue"
          name="comment"
          class="
            w-full
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
          :placeholder="$t('news_feed.write_comment')"
        />
        <input type="submit" hidden />
      </Form>
    </div>
  </div>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import { ref } from "vue";
import { Field, Form } from "vee-validate";

import { useCredentials } from "@/stores/index.js";
import { thumbnail } from "@/helpers/thumbnail";
const commentValue = ref();
const credentials = useCredentials();
const props = defineProps(["id", "author", "count"]);

const handleComment = async () => {
  const url_comment = `${import.meta.env.VITE_API_BASE_URL}comment/${props.id}`;
  axios
    .post(url_comment, {
      body: commentValue.value,
      quote_id: props.id,
      user_id: credentials.user_id,
      username: credentials.user_name,
      author_id: props.author,
    })
    .then(() => {
      commentValue.value = "";
    });
};
</script>