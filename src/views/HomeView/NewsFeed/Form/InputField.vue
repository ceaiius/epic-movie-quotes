<template>
  <Field v-slot="{ field, meta }" :name="name" :rules="rules">
    <input
      class="
        bg-transparent
        pl-4
        h-10
        text-white
        relative
        w-full
        rounded-md
        outline outline-1 outline-[#6C757D]
      "
      :class="[
        meta.valid && meta.touched ? 'border border-green-500' : '',
        !meta.valid && meta.touched ? 'border border-red-500' : '',
      ]"
      v-bind="field"
      :placeholder="placeholder"
      :type="type"
    /><span class="absolute text-white top-2 right-2">{{ language }}</span>
  </Field>
</template>

<script setup>
import { Field } from "vee-validate";

// eslint-disable-next-line no-unused-vars
const props = defineProps(["placeholder", "language", "name", "rules", "type"]);
</script>