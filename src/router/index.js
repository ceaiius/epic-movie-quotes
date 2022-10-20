import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView/index.vue";
import HomeView from "../views/HomeView/index.vue";
import { isAuthenticated } from "@/router/guards.js";
import PermissionDenied from "../views/ErrorView/PermissionDenied.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/denied",
      name: "denied",
      component: PermissionDenied,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: [isAuthenticated],
    },
  ],
});

export default router;
