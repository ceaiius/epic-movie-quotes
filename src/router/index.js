import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView/index.vue";
import HomeView from "../views/HomeView/index.vue";
import { isAuthenticated, isRemembered } from "@/router/guards.js";
import RedirectView from "../views/ErrorView/RedirectView.vue";
import PermissionDenied from "../views/ErrorView/PermissionDenied.vue";
import UserPost from "../views/HomeView/NewsFeed/UserPost.vue";
import MovieList from "../views/HomeView/NewsFeed/Movies/MovieList.vue";
import SingleMovie from "../views/HomeView/NewsFeed/Movies/SingleMovie.vue";
import NotFound from "../views/ErrorView/NotFound.vue";
import Profile from "../views/HomeView/Profile/Index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      beforeEnter: [isRemembered],
      component: LandingView,
    },
    {
      path: "/denied",
      name: "denied",
      component: PermissionDenied,
    },
    {
      path: "/:pathMatch(.*)",
      component: NotFound,
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
        {
          path: "movie/:id",
          component: SingleMovie,
          name: "movie",
        },
        {
          path: "profile",
          component: Profile,
          name: "profile",
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
