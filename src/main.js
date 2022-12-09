import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import { i18n } from "@/i18n.js";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/main.css";
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
import Echo from "laravel-echo";
import { isAuthenticated } from "@/router/guards";
const app = createApp(App);

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
    });
  }
});

app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
