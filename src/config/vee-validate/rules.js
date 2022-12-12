import { defineRule } from "vee-validate";
import { required, min, max, confirmed, numeric } from "@vee-validate/rules";
defineRule("min", min);
defineRule("max", max);
defineRule("required", required);
defineRule("confirmed", confirmed);
defineRule("numeric", numeric);

defineRule("email", (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});

defineRule("login", (value) => {
  if (
    !/^(?:[A-Z\d][A-Z\d_-]{3,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(
      value
    )
  ) {
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
  const regex = /^[ა-ჰა-ჰ0-9.\-_ ]+$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});

defineRule("eng", (value) => {
  const regex = /^[a-zA-Z0-9.\-_ ]+$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});

defineRule("num", (value) => {
  const regex = /^(19[5-9]\d|20[0-4]\d|2022)$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});
