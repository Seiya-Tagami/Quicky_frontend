<script setup lang="ts">
import { ref } from "vue";

// props
const props = defineProps({
  id: String,
  title: String,
  content: String,
});

const title = ref<string>(props.title!);
const content = ref<string>(props.content!);
const allowUpdate = ref<boolean>(true);

const checkContent = () => {
  allowUpdate.value = false;
};
// emits
const emit = defineEmits(["handleEditModal", "updateMemo"]);
const handleEditModal = () => {
  emit("handleEditModal");
};

const updateMemo = () => {
  emit("updateMemo", { id: props.id, title: title, content: content });
};
</script>

<template>
  <div class="w-[600px] bg-white border rounded-md p-6 absolute top-10 left-1/2 -translate-x-[50%] z-20">
    <div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">詳細</h2>
        <button @click="handleEditModal"><img src="/xmark-solid.svg" class="w-7 h-7 cursor-pointer" /></button>
      </div>
      <div class="flex items-center mt-8 border border-gray-400">
        <span class="px-4 py-2 bg-gray-200 font-bold">タイトル</span>
        <input type="text" class="p-2 flex-[1]" v-model="title" @change="checkContent" />
      </div>
      <div class="w-full border border-gray-400 mt-2">
        <textarea class="w-full h-[200px] px-4 py-2" v-model="content" @change="checkContent" placeholder="本文"></textarea>
      </div>
      <div class="mt-2 ml-auto flex gap-2 w-fit">
        <button class="block text-white bg-gray-500 px-4 py-3 text-[16px] font-semibold rounded w-fit disabled:bg-slate-300" @click="handleEditModal">キャンセル</button>
        <button class="block text-white bg-blue-600 px-4 py-3 text-[16px] font-semibold rounded w-fit disabled:bg-slate-300" @click="updateMemo" :disabled="allowUpdate">
          更新
        </button>
      </div>
    </div>
  </div>
  <div class="w-screen h-screen absolute inset-0 z-10 bg-[#07070750]" @click="handleEditModal" />
</template>
