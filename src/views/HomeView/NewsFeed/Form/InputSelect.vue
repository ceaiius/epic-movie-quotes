<template>
  <div
    v-if="open"
    class="z-10 w-full h-screen fixed top-0 left-0"
    @click="open = false"
  ></div>
  <div class="z-[50] relative">
    <Field v-slot="{ field, meta }" v-model="genres" :name="name" :rules="rule">
      <div
        class="
          flex flex-wrap
          gap-y-2
          cursor-pointer
          content-between
          rounded-[0.25rem]
          pr-12
          py-2
          text-base
          w-full
          outline outline-1 outline-[#6C757D]
        "
        :class="[
          meta.valid && meta.touched ? 'border border-green-500' : '',
          !meta.valid && meta.touched ? 'border border-red-500' : '',
        ]"
        @click="toggleGenres"
      >
        <div
          v-for="(chip, index) of chips"
          :key="chip.label"
          class="bg-default_red flex items-center ml-2 pl-2 rounded-sm w-max"
        >
          <span class="cursor-default text-white">{{ chip }}</span>
          <span
            class="cursor-pointer p-2 chip-remove"
            @click="removeChip(index)"
            ><img src="/images/remove.svg" alt=""
          /></span>
        </div>
        <input
          v-bind="field"
          :id="name"
          class="cursor-pointer w-20 bg-transparent pl-4 chip-remove"
          :class="chips.length !== 0 ? 'invisible' : ''"
          :placeholder="chips.length == 0 ? 'Genre' : ''"
          autocomplete="off"
          disabled
        />
      </div>
    </Field>

    <ul
      v-show="open"
      class="
        w-full
        flex flex-col
        absolute
        max-h-[8.5rem]
        overflow-y-auto
        bg-black_bg
        mt-2
        py-1
        rounded-lg
      "
    >
      <li
        v-for="item in movieGenres"
        :id="item"
        :key="item.label"
        class="cursor-pointer text-white py-1 px-3"
        @click="addChip"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { onMounted, ref } from "vue";
const chips = ref([]);
const open = ref(false);
const genres = ref();
// eslint-disable-next-line no-unused-vars
const props = defineProps(["name", "values"]);

onMounted(() => {
  setTimeout(() => {
    props.values.map((x) => chips.value.push(x));
  }, 64);
});

const movieGenres = [
  "Action",
  "Horror",
  "Drama",
  "Thriller",
  "Western",
  "Comedy",
  "Sci-fi",
  "Adventrue",
  "Romance",
];

const addChip = (e) => {
  if (!chips.value.includes(e.target.textContent)) {
    chips.value.push(e.target.textContent);
    genres.value = chips.value;
  }
};

const removeChip = (index) => {
  chips.value.splice(index, 1);
  open.value = false;
};

const toggleGenres = (e) => {
  if (!e.target.classList.contains("chip-remove")) {
    open.value = !open.value;
  }
};

const rule = () => {
  if (chips.value.length === 0) {
    return false;
  } else {
    return true;
  }
};
</script>