import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView/index.vue";
import HomeView from "@/views/HomeView/index.vue";
import { isAuthenticated, isRemembered } from "@/router/guards.js";

import PermissionDenied from "@/views/ErrorView/PermissionDenied.vue";
import UserPost from "@/views/HomeView/NewsFeed/UserPost.vue";
import MovieList from "@/views/HomeView/NewsFeed/Movies/MovieList.vue";
import SingleMovie from "@/views/HomeView/NewsFeed/Movies/SingleMovie.vue";
import NotFound from "@/views/ErrorView/NotFound.vue";
import GoogleProfile from "@/views/HomeView/Profile/GoogleProfile/Index.vue";
import EmailProfile from "@/views/HomeView/Profile/EmailProfile/Index.vue";
import { useAuthStore } from "@/stores/auth";
import VerifyEmail from "@/views/HomeView/Profile/EmailProfile/VerifyEmail.vue";
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
      meta: {
        title: "Epic Movie Quotes",
      },
    },
    {
      path: "/denied",
      name: "denied",
      component: PermissionDenied,
      meta: {
        title: "Denied",
      },
    },
    {
      path: "/:pathMatch(.*)",
      component: NotFound,
      meta: {
        title: "Not found",
      },
    },
    {
      path: "/home",
      name: "home",
      redirect: "/home/news-feed",
      component: HomeView,
      beforeEnter: isAuthenticated,
      meta: {
        title: "Home",
      },
      children: [
        {
          name: "news-feed",
          path: "news-feed",
          component: UserPost,
          meta: {
            title: "News Feed",
          },
        },
        {
          path: "list-of-movies",
          component: MovieList,
          name: "list-of-movies",
          meta: {
            title: "List of Movies",
          },
        },
        {
          path: "movie/:id",
          component: SingleMovie,
          name: "movie",
          meta: {
            title: "Single Movie",
          },
        },
        {
          path: "google_profile",
          component: GoogleProfile,
          name: "google_profile",
          meta: {
            title: "Google Profile",
          },
        },
        {
          path: "email_profile",
          component: EmailProfile,
          name: "email_profile",
          meta: {
            title: "Email Profile",
          },
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
