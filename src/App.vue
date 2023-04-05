<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { uuid } from "vue-uuid";

// components
import Menu from "./components/Menu.vue";
import RegisterModal from "./components/RegisterModal.vue";
import MemoItem from "./components/MemoItem.vue";

// partials
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
  targetMemo.updatedAt = updatedAt;
};

const isDark = ref<boolean>(false);
const BODY = document.querySelector("body");
const changeTheme = () => {
  isDark.value = !isDark.value;
  BODY!.classList.toggle("bg-gray-800");
};

onMounted(() => {
  memos.value = JSON.parse(localStorage.getItem("memos")!) || [];
  isDark.value = JSON.parse(localStorage.getItem("isDark")!) || false;

  if (isDark.value) document.body.classList.add("bg-gray-800");
  else document.body.classList.remove("bg-gray-800");

  setTimeout(() => {
    BODY!.classList.add("force-duration");
  }, 100);
});

watch(
  memos,
  (newVal) => {
    localStorage.setItem("memos", JSON.stringify(newVal));
  },
  { deep: true }
);

watch(isDark, (newVal) => {
  localStorage.setItem("isDark", JSON.stringify(newVal));
});
</script>

<template>
  <main class="max-w-[1200px] mx-auto pt-[60px] px-4 overflow-hidden">
    <Menu @on-click="changeTheme" :isDark="isDark" />
    <div>
      <h1 class="text-4xl font-extrabold text-cyan-900" :class="isDark && `!text-cyan-600`">
        Simple Memo <span class="text-3xl">{{ now.getFullYear() }}</span>
      </h1>
      <p class="text-[18px] mt-2 text-gray-400" :class="isDark && `!text-gray-300`">Make your life better.</p>
      <div class="flex gap-2 mt-4">
        <ActionButton :btn-color="isDark ? `bg-blue-400` : `bg-blue-900`" @click="handleRegisterModal">Register a new memo</ActionButton>
        <ActionButton :btn-color="isDark ? `bg-gray-400` : `bg-gray-500`" @click="deleteMemo">Delete a completed memo</ActionButton>
      </div>
      <RegisterModal v-if="registerModalIsShowed" :isDark="isDark" @handle-modal="handleRegisterModal" @add-memo="addMemo" />
    </div>
    <div class="w-full mt-6 md:text-[16px] text-[14px]">
      <h3 class="p-2 text-2xl font-semibold text-cyan-900" :class="isDark && `!text-cyan-600`">Memos</h3>
      <div class="w-full flex px-3 items-center justify-around border-b-2 border-cyan-900" :class="isDark && `!border-cyan-600`" />
      <div class="h-[400px] flex flex-col gap-2 mt-4 md:p-2 overflow-y-auto md:scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-700">
        <MemoItem v-if="memos.length" v-for="memo in memos" :memo="memo" :isDark="isDark" :key="memo.title" @handle-memo="handleMemo" @update-memo="updateMemo" />
        <div v-else class="mx-auto mt-6 flex gap-2 font-semibold" :class="isDark && `text-white`">
          <p class="md:text-3xl text-2xl italic">Let's register a new memo...</p>
          <font-awesome-icon
            :icon="['fas', 'pen']"
            @click="handleRegisterModal"
            class="md:w-[40px] md:h-[40px] w-[30px] h-[30px] cursor-pointer select-none hover:-translate-y-1 duration-200"
          />
        </div>
      </div>
    </div>
  </main>
  <footer class="w-full h-[60px] text-center text-[18px]" :class="isDark && `text-white`">
    <small class="leading-[60px]">&copy; {{ now.getFullYear() }} SeiyaCode</small>
  </footer>
</template>
