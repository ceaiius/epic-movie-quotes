<template>
  <div
    class="z-10 w-screen h-screen fixed top-0 left-0"
    @click="$emit('close')"
  ></div>
  <dialog
    open
    :class="top"
    class="
      fixed
      top-1/2
      bg-transparent
      z-[100]
      p-0
      left-1/2
      m-0
      transform
      -translate-x-1/2 -translate-y-1/2
    "
  >
    <slot></slot>
  </dialog>
</template>
  
  <script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ["top"],
  emits: ["close"],
};
</script>
 