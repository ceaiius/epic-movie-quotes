import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView/index.vue";
import HomeView from "../views/HomeView/index.vue";
import { isAuthenticated, isRemembered } from "@/router/guards.js";

import PermissionDenied from "../views/ErrorView/PermissionDenied.vue";
import UserPost from "../views/HomeView/NewsFeed/UserPost.vue";
import MovieList from "../views/HomeView/NewsFeed/Movies/MovieList.vue";
import SingleMovie from "../views/HomeView/NewsFeed/Movies/SingleMovie.vue";
import NotFound from "../views/ErrorView/NotFound.vue";
import GoogleProfile from "../views/HomeView/Profile/GoogleProfile/Index.vue";
import EmailProfile from "../views/HomeView/Profile/EmailProfile/Index.vue";
import { useAuthStore } from "@/stores/auth";
import VerifyEmail from "../views/HomeView/Profile/EmailProfile/VerifyEmail.vue";
import axios from "axios";
axios.defaults.withCredentials = true;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      beforeEnter: isRemembered,
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
      beforeEnter: isAuthenticated,
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
          path: "google_profile",
          component: GoogleProfile,
          name: "google_profile",
        },
        {
          path: "email_profile",
          component: EmailProfile,
          name: "email_profile",
        },
        {
          path: "verify-new-email",
          component: VerifyEmail,
          name: "verify-new-email",
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.authenticated === null) {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}me`);
      authStore.authenticated = true;
    } catch (err) {
      authStore.authenticated = false;
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return next();
    }
  }
  return next();
});

export default router;
