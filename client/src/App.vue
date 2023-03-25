<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { uuid } from "vue-uuid";

// components
import RegisterModal from "./components/RegisterModal.vue";
import MemoItem from "./components/MemoItem.vue";

import { Memo, ReceivedData, UpdatingData } from "./types/type";

const registerModalIsShowed = ref<boolean>(false);
const handleRegisterModal = () => (registerModalIsShowed.value = !registerModalIsShowed.value);


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
    isDone: false,
  });
};

// done
const handleMemo = (targetId: string) => {
  const targetMemo = memos.value.filter((memo) => memo.id === targetId)[0];
  targetMemo.isDone = !targetMemo.isDone;
};

// parse
const parseMemo = () => {
  memos.value = memos.value.filter((memo) => memo.isDone !== true);
  console.log(memos.value);
};

// update
const updateMemo = ({ id, title, content}: UpdatingData) => {
  const targetMemo = memos.value.filter((memo) => memo.id === id)[0];
  targetMemo.title = title;
  targetMemo.content = content
}

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
        <button class="mt-4 text-white bg-blue-600 px-3 py-3 text-[16px] font-semibold rounded w-fit" @click="handleRegisterModal">メモを登録する</button>
        <button class="mt-4 text-white bg-gray-500 px-3 py-3 text-[16px] font-semibold rounded w-fit" @click="parseMemo">完了したものを削除する</button>
      </div>
      <RegisterModal v-if="registerModalIsShowed" @handle-modal="handleRegisterModal" @add-memo="addMemo" />
      <!-- <EditModal v-if="editModalIsShowed" @handle-modal="handleEditModal" /> -->
    </div>
    <div class="w-full mt-6">
      <div class="w-full flex p-3 items-center justify-around border-b-2 border-black">
        <span></span>
        <span class="font-bold">タイトル</span>
        <span class="font-bold">作成日</span>
        <span class="font-bold">更新日</span>
        <span></span>
      </div>
      <div>
        <MemoItem v-for="memo in memos" :memo="memo" :key="memo.title" @handle-memo="handleMemo" @update-memo="updateMemo"/>
      </div>
    </div>
  </main>
</template>
