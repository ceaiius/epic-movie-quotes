<template>
  <textarea
    rows="2"
    class="
      bg-transparent
      pl-4
      pt-2
      text-white
      relative
      w-full
      italic
      rounded-md
      outline outline-1 outline-[#6C757D]
    "
    type="text"
    :value="modelValue"
    readonly
    @input="$emit('update:modelValue', $event.target.value)"
  /><span class="absolute text-white top-2 right-2">{{ language }}</span>
</template>
      
      <script setup>
defineProps(["language", "name", "modelValue"]);
defineEmits(["update:modelValue"]);
</script>