import { getJwtToken } from "@/helpers/jwt/index.js";

export function isAuthenticated() {
  if (!getJwtToken()) {
    return "/denied";
  }
}

export function isRemembered() {
  if (getJwtToken()) {
    return "/home";
  }
}
