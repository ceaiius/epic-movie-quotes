<template>
  <div
    class="
      flex flex-col
      bg-black
      lg:mt-6 lg:ml-20 lg:w-[961px] lg:max-h-[450px]
      overflow-auto
      pb-12
      w-screen
      h-screen
      lg:rounded-xl
      rounded-none
    "
  >
    <img
      src="/images/polygon.svg"
      class="w-8 absolute -top-6 right-32 lg:-top-0 lg:right-60"
      alt=""
    />
    <div class="flex justify-between items-center text-white pl-12 pr-12 pt-12">
      <h1>{{ $t("Notification.notifications") }}</h1>
      <div v-if="credentials.notifications.length == 0">
        <h2 class="text-white">
          {{ $t("Notification.no_notifications_yet") }}
        </h2>
      </div>
      <h2 class="underline" @click="handleRead">
        {{ $t("Notification.mark_as_all_read") }}
      </h2>
    </div>

    <div
      v-for="notification in credentials.notifications"
      :key="notification.id"
    >
      <div
        class="
          flex
          md:flex-row
          gap-2
          flex-col
          justify-between
          md:items-center
          text-white
          ml-6
          mr-6
          mt-6
          p-6
          lg:p-2
          border
          border-notification_border
        "
      >
        <div class="flex gap-6">
          <img
            :class="
              notification.read == 0
                ? 'border rounded-full border-green-500'
                : ''
            "
            src="/images/static.png"
            alt=""
          />
          <div class="flex flex-col gap-2">
            <h2>{{ notification.from.username }}</h2>
            <div v-if="notification.type == 'like'" class="flex gap-2">
              <img src="/images/heart.svg" alt="" />
              <h3 class="text-sm lg:text-base whitespace-nowrap">
                {{ $t("Notification.reacted_to_your_quote") }}
              </h3>
            </div>
            <div v-if="notification.type == 'comment'" class="flex gap-2">
              <img class="w-6 h-6" src="/images/chat.png" alt="" />
              <h3 class="text-sm lg:text-base">
                {{ $t("Notification.commented_to_your_movie_quote") }}
              </h3>
            </div>
          </div>
        </div>
        <div>
          <div class="lg:hidden pl-2 flex-row flex gap-6">
            <h2 v-if="notification.read == 0" class="text-green-500">
              {{ $t("Notification.new") }}
            </h2>
            <h2>{{ timeAgo(notification.created_at) }}</h2>
          </div>
          <div class="hidden lg:flex flex-col gap-6">
            <h2>{{ timeAgo(notification.created_at) }}</h2>
            <h2 v-if="notification.read == 0" class="text-green-500 pl-10">
              {{ $t("Notification.new") }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
<script setup>
// eslint-disable-next-line no-unused-vars
import axios from "@/config/axios/index.js";
import { onMounted } from "vue";
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();

const url_notifications = `${import.meta.env.VITE_API_BASE_URL}notifications`;
function timeAgo(input) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}

onMounted(() => {
  handleNotifications();
});

setTimeout(() => {
  window.Echo.private("like-notification." + credentials.user_id).listen(
    ".notify-like",

    () => handleNotifications()
  );
}, 500);
const handleNotifications = async () => {
  axios.get(url_notifications).then((res) => {
    credentials.notifications = res.data;
  });
};

const handleRead = () => {
  let ids = credentials.notifications.map((x) => x.id);
  axios
    .post(url_notifications, {
      ids: ids,
    })
    .then(() => {
      handleNotifications();
      credentials.count = 0;
    });
};
</script>
      
       