import { defineStore } from "pinia";

export const useCredentials = defineStore("credentials", {
  state: () => {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      forgot_password_email: "",
      movie_search: "",
      quote_search: "",
      user_name: "",
      user_id: null,
      liked: false,
      count: 0,
    };
  },
});
