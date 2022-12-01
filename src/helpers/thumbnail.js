const url_thumbnail = import.meta.env.VITE_API_STORAGE_URL;
export const thumbnail = (x) => {
  return x == null
    ? "/images/avatar-default.jpg"
    : x.includes("https")
    ? x
    : url_thumbnail + x;
};
