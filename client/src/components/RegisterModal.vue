<script setup lang="ts">
import { ref, watch } from "vue";

const title = ref<string>("");
const content = ref<string>("");

// emits
const emit = defineEmits(["handleModal", "addMemo"]);
const handleModal = () => {
  emit("handleModal");
};

const addMemo = () => {
  emit("addMemo", { title: title.value, content: content.value });
  title.value = "";
  content.value = "";
};
</script>

<template>
  <div class="w-[600px] bg-white border rounded-md p-6 absolute top-10 left-1/2 -translate-x-[50%] z-20">
    <div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">登録</h2>
        <button @click="handleModal"><img src="/xmark-solid.svg" class="w-7 h-7 cursor-pointer" /></button>
      </div>
      <div class="flex items-center mt-8 border border-gray-400">
        <span class="px-4 py-2 bg-gray-200 font-bold">タイトル</span>
        <input type="text" class="p-2 flex-[1]" v-model="title" />
      </div>
      <div class="w-full border border-gray-400 mt-2">
        <textarea id="js-body" class="w-full h-[200px]" v-model="content"></textarea>
      </div>
      <button class="block mt-2 ml-auto text-white bg-blue-600 px-4 py-3 text-[16px] font-semibold rounded w-fit" @click="addMemo">登録</button>
    </div>
  </div>
  <div class="w-screen h-screen absolute inset-0 z-10 bg-[#07070750]" @click="handleModal" />
</template>
