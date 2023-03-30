<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { uuid } from "vue-uuid";

// components
import RegisterModal from "./components/RegisterModal.vue";
import MemoItem from "./components/MemoItem.vue";

import { Memo, AddingData, UpdatingData } from "./types/type";

const registerModalIsShowed = ref<boolean>(false);
const handleRegisterModal = () => (registerModalIsShowed.value = !registerModalIsShowed.value);

const memos = ref<Memo[]>([]);

const now = new Date();
const createdAt = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
const updatedAt = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

// add
const addMemo = (addingData: AddingData) => {
  memos.value.push({
    id: uuid.v1(),
    title: addingData.title,
    content: addingData.content,
    createdAt: createdAt,
    updatedAt: updatedAt,
    isDone: false,
  });

  registerModalIsShowed.value = false;
};

// done
const handleMemo = (targetId: string) => {
  const targetMemo = memos.value.filter((memo) => memo.id === targetId)[0];
  targetMemo.isDone = !targetMemo.isDone;
};

// delete
const deleteMemo = () => {
  const newMemos = memos.value.filter((memo) => memo.isDone !== true);

  // validation
  if (newMemos.length === memos.value.length) {
    alert("Oops! no memos has been selected");
    return;
  }
  const response = window.confirm("Is it ok?");
  if (response) {
    memos.value = newMemos;
  }
};

// update
const updateMemo = ({ id, title, content }: UpdatingData) => {
  const targetMemo = memos.value.filter((memo) => memo.id === id)[0];
  targetMemo.title = title;
  targetMemo.content = content;
  targetMemo.updatedAt = createdAt;
};

onMounted(() => {
  memos.value = JSON.parse(localStorage.getItem("memos")!) || [];
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
  <main class="max-w-[1200px] mx-auto mt-[60px] bg-gray-200 px-4">
    <div class="">
      <h1 class="text-4xl font-extrabold">Simple Memo</h1>
      <p class="text-[18px] mt-2 text-gray-400">Make your life better.</p>
      <div class="flex gap-2">
        <button class="mt-4 text-white bg-blue-900 px-3 py-3 text-[16px] font-semibold rounded w-fit" @click="handleRegisterModal">Register new memo</button>
        <button class="mt-4 text-white bg-gray-500 px-3 py-3 text-[16px] font-semibold rounded w-fit" @click="deleteMemo">Delete completed memo</button>
      </div>
      <RegisterModal v-if="registerModalIsShowed" @handle-modal="handleRegisterModal" @add-memo="addMemo" />
    </div>
    <div class="w-full mt-6 md:text-[16px] text-[14px]">
      <div class="w-full flex p-3 items-center justify-around border-b-2 border-gray-500">
        <span></span>
        <span class="font-bold">Title</span>
        <span class="font-bold">Created at</span>
        <span class="font-bold">Updated at</span>
        <span></span>
      </div>
      <div class="h-[400px] overflow-y-auto flex flex-col gap-2 mt-4 md:p-2">
        <MemoItem v-for="memo in memos" :memo="memo" :key="memo.title" @handle-memo="handleMemo" @update-memo="updateMemo" />
      </div>
    </div>
  </main>
  <footer class="w-full h-[60px] text-center">
    <small class="leading-[60px]">&copy; 2023 SeiyaCode</small>
  </footer>
</template>
