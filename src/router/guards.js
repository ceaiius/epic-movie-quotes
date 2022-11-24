// export function isRemembered() {
//   if (getJwtToken()) {
//     return "/home";
//   }
// }

import { useAuthStore } from "@/stores/auth";
export const isAuthenticated = () => {
  const authStore = useAuthStore();
  if (!authStore.authenticated) {
    return "/denied";
  }
};

export const isRemembered = () => {
  const authStore = useAuthStore();
  if (authStore.authenticated) {
    return "/home";
  }
};
