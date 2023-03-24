<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { uuid } from "vue-uuid";

// components
import RegisterModal from "./components/RegisterModal.vue";
import MemoItem from "./components/MemoItem.vue";

import { Memo, ReceivedData } from "./types/type";

const isShowed = ref<boolean>(false);
const showRegisterModal = () => (isShowed.value = !isShowed.value);

const memos = ref<Memo[]>([]);
// add
const addMemo = (receivedData: ReceivedData) => {
  const now = new Date();
  const createdAt = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  if (receivedData.title.trim() === "" || receivedData.content.trim() === "") {
    return;
  }

  memos.value.push({
    id: uuid.v1(),
    title: receivedData.title,
    content: receivedData.content,
    createdAt: createdAt,
    updatedAt: "なし",
  });
};

// delete
const deleteMemo = (targetId: string) => {
  memos.value = memos.value.filter((memo) => targetId !== memo.id);
};

// parse
const parseMemo = () => {
  memos.value = [];
};

onMounted(() => {
  memos.value = JSON.parse(localStorage.getItem("memos") || []);
});

watch(
  memos,
  (newVal) => {
    localStorage.setItem("memos", JSON.stringify(newVal));
  },
  { deep: true }
);
</script>

<template>
  <main class="w-[1200px] mx-auto mt-[60px]">
    <div>
      <h1 class="text-4xl font-extrabold">メモ帳アプリ</h1>
      <p class="text-[16px] mt-2">自分のメモを管理できるアプリです。</p>
      <div class="flex flex-col gap-2">
        <button class="mt-4 text-white bg-blue-600 px-3 py-3 text-[16px] font-semibold rounded w-fit" @click="showRegisterModal">メモを登録する</button>
        <button class="mt-4 text-white bg-gray-500 px-3 py-3 text-[16px] font-semibold rounded w-fit">削除する</button>
      </div>
      <RegisterModal v-if="isShowed" @close="showRegisterModal" @add-memo="addMemo" />
    </div>
    <div class="w-full mt-6">
      <div class="w-full flex p-3 items-center justify-around border-b-2 border-black">
        <input type="checkbox" @change="parseMemo" />
        <span class="font-bold">タイトル</span>
        <span class="font-bold">作成日</span>
        <span class="font-bold">更新日</span>
        <span class="font-bold">編集</span>
      </div>
      <div>
        <MemoItem v-for="memo in memos" :memo="memo" :key="memo.title" @delete-memo="deleteMemo" />
      </div>
    </div>
  </main>
</template>
