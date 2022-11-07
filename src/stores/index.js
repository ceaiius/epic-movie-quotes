import { defineStore } from "pinia";

export const useCredentials = defineStore("credentials", {
  state: () => {
    return {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      forgot_password_email: "",
      movie_search: "",
    };
  },
  actions: {
    setUsername(value) {
      this.username = value;
      localStorage.setItem("username", this.username);
    },
    getUsername() {
      this.username = localStorage.username;
    },
    setEmail(value) {
      this.email = value;
      localStorage.setItem("email", this.email);
    },
    getEmail() {
      this.email = localStorage.email;
    },
    setPassword(value) {
      this.password = value;
      localStorage.setItem("password", this.password);
    },
    getPassword() {
      this.password = localStorage.password;
    },
    setPasswordConfirmation(value) {
      this.password_confirmation = value;
      localStorage.setItem("password_confirmation", this.password_confirmation);
    },
    getPasswordConfirmation() {
      this.password_confirmation = localStorage.password_confirmation;
    },
    setForgotPasswordEmail(value) {
      this.forgot_password_email = value;
      localStorage.setItem("forgot_password_email", this.forgot_password_email);
    },
    getForgotPasswordEmail() {
      this.forgot_password_email = localStorage.forgot_password_email;
    },
  },
});
