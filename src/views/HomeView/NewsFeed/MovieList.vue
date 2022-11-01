
  <template>
  <div class="flex flex-col w-full mt-8">
    <div class="w-[80%] ml-[10%]">
      <div class="flex items-center justify-between">
        <div class="flex text-white gap-6">
          <h2>{{ $t("MovieList.my_list_of_movies") }}</h2>
          <h2>{{ $t("MovieList.total") }} 25</h2>
        </div>
        <div class="h-[52px] relative ml-6">
          <div class="flex items-center">
            <div class="lg:flex hidden">
              <img class="absolute" src="/images/search.svg" alt="" />
              <input
                class="text-white bg-transparent pl-10 w-48 outline-none"
                type="text"
                :placeholder="placeholderSearch"
              />
            </div>

            <button
              type="button"
              class="
                text-white
                bg-default_red
                w-32
                h-10
                flex
                justify-center
                items-center
                gap-2
                font-medium
                rounded-md
                text-sm
              "
            >
              <span><img src="/images/plus.svg" alt="" /></span>
              {{ $t("MovieList.add_movie") }}
            </button>
          </div>
        </div>
      </div>
      <div class="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
        <div>
          <div>
            <img src="/images/movie-image2.png" alt="" />
          </div>
          <div class="mt-2 text-white">
            <h2>LOKI MOBIUS (2021)</h2>
            <h3 class="flex gap-6 text-2xl mt-2">
              10 <span><img src="/images/chat.png" alt="" /></span>
            </h3>
          </div>
        </div>
        <div>
          <div>
            <img src="/images/movie-image2.png" alt="" />
          </div>
          <div class="mt-2 text-white">
            <h2>LOKI MOBIUS (2021)</h2>
            <h3 class="flex gap-6 text-2xl mt-2">
              10 <span><img src="/images/chat.png" alt="" /></span>
            </h3>
          </div>
        </div>
        <div>
          <div>
            <img src="/images/movie-image2.png" alt="" />
          </div>
          <div class="mt-2 text-white">
            <h2>LOKI MOBIUS (2021)</h2>
            <h3 class="flex gap-6 text-2xl mt-2">
              10 <span><img src="/images/chat.png" alt="" /></span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { i18n } from "../../../i18n";
const placeholderSearch = computed(
  () => i18n.global.messages[i18n.global.locale].MovieList.search
);
</script>