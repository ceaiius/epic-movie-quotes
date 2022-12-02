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
      wrong_email: false,
      user_name: "",
      user_id: null,
      liked: false,
      count: 0,
      token: "",
      notifications: [],
      thumbnail: "",
      chip: [],
      isOpenRegister: false,
      isOpenLogin: false,
      isOpenResetPassword: false,
      canEditGoogle: false,
      avatar: null,
      username_edit: "",
      password_edit: "",
      can_edit_username: false,
      can_edit_password: false,
      can_edit_username_popup: false,
      can_edit_password_popup: false,
      confirmed_username_edit: "",
      success_username: false,
      success_avatar: false,
      success_password: false,
    };
  },
});
