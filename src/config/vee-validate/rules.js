import { defineRule } from "vee-validate";
import { required, min, max, confirmed, numeric } from "@vee-validate/rules";
defineRule("min", min);
defineRule("max", max);
defineRule("required", required);
defineRule("confirmed", confirmed);
defineRule("num", numeric);

defineRule("email", (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});

defineRule("username", (value) => {
  const regex = /^[a-za-z\s]*$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});
