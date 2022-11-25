<script setup lang="ts">
import useCat from "@/services/cat";
import type { CatParams } from "@/services/cat/types";
import { onMounted, reactive, toRef, toRefs } from "vue";

const { cat, tags, fetching, getCat, getTags, downloadCat } = useCat();

onMounted(() => {
  getTags();
});

const catForm: CatParams = reactive({
  tag: "",
  text: "",
});
const { tag, text } = toRefs(catForm);

const handleGetCat = () => {
  getCat(catForm);
};
</script>

<template>
  <main class="min-h-screen py-16 px-8">
    <div class="max-w-md mx-auto">
      <div class="text-center pb-4 border-b-2 border-secondary">
        <h1 class="text-4xl">Cat as a Services</h1>
        <p class="mt-2">Random cat pic generator for your needs!</p>
      </div>
      <div class="mt-8">
        <form
          class="grid grid-cols-2 gap-x-8 gap-y-4"
          @submit.prevent="handleGetCat"
        >
          <div class="flex flex-col">
            <label for="tag" class="text-xs tracking-8px">TAG</label>
            <select v-model="tag" id="tag" class="input bg-primary">
              <option v-for="tag in tags" :key="tag" :value="tag">
                {{ tag }}
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="text" class="text-xs tracking-8px">TEXT</label>
            <input v-model="text" id="text" type="text" class="input" />
          </div>
          <div class="col-span-2">
            <button
              v-loading="fetching"
              class="input w-full bg-secondary text-primary"
            >
              GENERATE
            </button>
          </div>
        </form>
        <div
          v-loading="fetching"
          class="result-box"
          :class="{ 'h-64': !cat?.url }"
        >
          <p v-if="!cat?.url" class="text-sm max-w-40 text-center">
            your cat will be displayed here!
          </p>
          <img v-else :src="`https://cataas.com/${cat?.url}`" />
        </div>
        <button
          v-loading="fetching"
          v-if="cat?.url"
          class="mt-4 input bg-success w-full text-primary border-transparent"
          @click="downloadCat"
        >
          get your cat!
        </button>
      </div>
    </div>
  </main>
</template>

<style>
.input {
  @apply bg-transparent border border-secondary rounded outline-none px-2 text-xs h-8;
}
.result-box {
  @apply mt-8 border-2 border-secondary rounded grid place-items-center;
}
.loading {
}
.loading::after {
  @apply absolute inset-0 bg-white opacity-75 cursor-not-allowed grid place-items-center;
  /* background: url("https://api.iconify.design/line-md/loading-twotone-loop.svg")
    no-repeat center center / contain; */
  content: url("https://api.iconify.design/line-md/loading-twotone-loop.svg");
}
</style>
