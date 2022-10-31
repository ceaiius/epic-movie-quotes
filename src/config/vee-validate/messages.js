import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: "This field is required",
        email: "This input is not in email format",
        min: "{field} must have at least 0:{min} characters",
        max: "{field} must not have more than 0:{max} characters",
        username: "{field} must be in english alphabet and lowercase",
        confirmed: "Password's don't match",
      },
      names: {
        // For English version, This will be auto generated according to the keys.
        // so best practice would be to write correct names in rules from the start.
        // no need to write custom names property for english version.
        password_confirmation: "Password",
      },
    },
    ka: {
      ...ka,
      messages: {
        required: "გთხოვთ შეავსოთ მოცემული ველი",
        email: "თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს",
        min: "{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს",
        max: "{field} არ უნდა შეიცავდეს 0:{max}-ზე მეტ სიმბოლოს",
        username:
          "{field} უნდა იყოს მხოლოდ ინგლისური ასოებით და ქვედა რეგისტრში",
        confirmed: "პაროლები არ ემთხვევა",
      },
      names: {
        password: "პაროლი",
        username: "მომხმარებლის სახელი",
        email: "მეილი",
        password_confirmation: "პაროლი",
      },
    },
  }),
});
