import { createI18n } from "vue-i18n";
import en from "./config/localization/en.js";
import ka from "./config/localization/ka.js";
export const i18n = createI18n({
  locale: "En",
  fallbackLocale: "En",
  messages: {
    ...en,
    ...ka,
  },
});
