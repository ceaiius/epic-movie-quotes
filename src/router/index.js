import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView/index.vue";
import HomeView from "../views/HomeView/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
