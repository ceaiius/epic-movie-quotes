import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView/index.vue";
import HomeView from "../views/HomeView/index.vue";
import { isAuthenticated } from "@/router/guards.js";
import RedirectView from "../views/ErrorView/RedirectView.vue";
import PermissionDenied from "../views/ErrorView/PermissionDenied.vue";
import UserPost from "../views/HomeView/NewsFeed/UserPost.vue";
import MovieList from "../views/HomeView/NewsFeed/MovieList.vue";
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
      redirect: "/home/news-feed",
      component: HomeView,
      beforeEnter: [isAuthenticated],
      children: [
        {
          name: "news-feed",
          path: "news-feed",
          component: UserPost,
        },
        {
          path: "list-of-movies",
          component: MovieList,
          name: "list-of-movies",
        },
      ],
    },
    {
      path: "/redirect",
      name: "redirect",
      component: RedirectView,
    },
  ],
});

export default router;
