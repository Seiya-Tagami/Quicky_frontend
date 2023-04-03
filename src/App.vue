<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { uuid } from "vue-uuid";

// components
import RegisterModal from "./components/RegisterModal.vue";
import MemoItem from "./components/MemoItem.vue";

// partials
import ThemeChangeButton from "./components/partials/ThemeChangeToggleButton.vue";
import ActionButton from "./components/partials/ActionButton.vue";

import { Memo, AddingData, UpdatingData } from "./types";

const registerModalIsShowed = ref<boolean>(false);
const handleRegisterModal = () => (registerModalIsShowed.value = !registerModalIsShowed.value);

const memos = ref<Memo[]>([]);

const now = new Date();
const createdAt = now.getMonth() + 1 + "/" + now.getDate();
const updatedAt = now.getMonth() + 1 + "/" + now.getDate();

// add
const addMemo = (addingData: AddingData) => {
  memos.value.push({
    id: uuid.v1(),
    title: addingData.title,
    content: addingData.content,
    createdAt: createdAt,
    updatedAt: "",
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
    alert("Oops! No memos has been selected");
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
    <ThemeChangeButton />
    <div>
      <h1 class="text-4xl font-extrabold text-cyan-900">
        Simple Memo <span class="text-3xl">{{ now.getFullYear() }}</span>
      </h1>
      <p class="text-[18px] mt-2 text-gray-400">Make your life better.</p>
      <div class="flex gap-2 mt-4">
        <ActionButton :btn-color="`bg-blue-900`" @click="handleRegisterModal">Register a new memo</ActionButton>
        <ActionButton :btn-color="`bg-gray-500`" @click="deleteMemo">Delete a completed memo</ActionButton>
      </div>
      <RegisterModal v-if="registerModalIsShowed" @handle-modal="handleRegisterModal" @add-memo="addMemo" />
    </div>
    <div class="w-full mt-6 md:text-[16px] text-[14px]">
      <h3 class="p-2 text-2xl font-semibold text-cyan-900">Memos</h3>
      <div class="w-full flex px-3 items-center justify-around border-b-2 border-cyan-900" />
      <div class="h-[400px] flex flex-col gap-2 mt-4 md:p-2 overflow-y-auto md:scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-700">
        <MemoItem v-if="memos.length" v-for="memo in memos" :memo="memo" :key="memo.title" @handle-memo="handleMemo" @update-memo="updateMemo" />
        <div v-else class="mx-auto mt-6 flex gap-2 font-semibold">
          <p class="md:text-3xl text-2xl italic">Let's register a new memo...</p>
          <img
            src="./assets/pen.png"
            alt="pen"
            class="md:w-[40px] md:h-[40px] w-[32px] h-[32px] cursor-pointer select-none hover:-translate-y-1 duration-200"
            @click="handleRegisterModal"
          />
        </div>
      </div>
    </div>
  </main>
  <footer class="w-full h-[60px] text-center text-[18px]">
    <small class="leading-[60px]">&copy; {{ now.getFullYear() }} SeiyaCode</small>
  </footer>
</template>
