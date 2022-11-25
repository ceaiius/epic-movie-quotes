import { defineRule } from "vee-validate";
import { required, min, max, confirmed } from "@vee-validate/rules";
defineRule("min", min);
defineRule("max", max);
defineRule("required", required);
defineRule("confirmed", confirmed);

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

defineRule("geo", (value) => {
  const regex = /^[ა-ჰა-ჰ\s][ა-ჰა-ჰ0-9\s]*$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});

defineRule("eng", (value) => {
  const regex = /^[A-Za-z\s][A-Za-z0-9\s]*$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});

defineRule("num", (value) => {
  const regex = /^(195\d|200\d|2022)$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});
