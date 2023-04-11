<script setup lang="ts">
import { watch, onMounted } from 'vue';

// components
import Menu from './components/Menu.vue';
import RegisterModal from './components/RegisterModal.vue';
import MemoItem from './components/MemoItem.vue';

// partials
import ActionButton from './components/partials/ActionButton.vue';

// pinia
import { useUserInterfaceStore } from './stores/UserInterfaceStore';
import { useMemoStore } from './stores/MemoStore';
import { storeToRefs } from 'pinia';
const uiStore = useUserInterfaceStore();
const { isDark, registerModalIsShowed } = storeToRefs(uiStore);
const memoStore = useMemoStore();
const { memos, now } = storeToRefs(memoStore);

const BODY = document.querySelector('body');
onMounted(() => {
  memos.value = JSON.parse(localStorage.getItem('memos')!) || [];
  isDark.value = JSON.parse(localStorage.getItem('isDark')!) || false;

  if (isDark.value) document.body.classList.add('bg-gray-800');
  else document.body.classList.remove('bg-gray-800');

  setTimeout(() => {
    BODY!.classList.add('force-duration');
  }, 100);
});

watch(
  memos,
  (newVal) => {
    localStorage.setItem('memos', JSON.stringify(newVal));
  },
  { deep: true }
);

watch(isDark, (newVal) => {
  localStorage.setItem('isDark', JSON.stringify(newVal));
});
</script>

<template>
  <main class="max-w-[1200px] mx-auto pt-[60px] px-4">
    <Menu />
    <div class="">
      <h1 class="text-4xl font-extrabold text-cyan-900" :class="isDark && `!text-cyan-600`">
        Simple Memo <span class="text-xl italic">{{ now.getFullYear() }}</span>
      </h1>
      <p class="text-[18px] mt-2 text-gray-400" :class="isDark && `!text-gray-300`">Make your life better.</p>
      <div class="flex gap-2 mt-4">
        <ActionButton :btn-color="isDark ? `bg-blue-400` : `bg-blue-900`" @on-click="uiStore.handleRegisterModal">Register a new memo</ActionButton>
        <ActionButton :btn-color="isDark ? `bg-gray-400` : `bg-gray-500`" @on-click="memoStore.deleteFn">Delete a completed memo</ActionButton>
      </div>
      <RegisterModal v-if="registerModalIsShowed" />
    </div>
    <div class="w-full mt-6 md:text-[16px] text-[14px]">
      <h3 class="p-2 text-2xl font-semibold text-cyan-900" :class="isDark && `!text-cyan-600`">Memos</h3>
      <div class="w-full flex px-3 items-center justify-around border-b-2 border-cyan-900" :class="isDark && `!border-cyan-600`" />
      <div class="min-h-[400px] flex flex-col gap-2 mt-4 md:p-2 md:overflow-y-auto md:scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-700">
        <MemoItem v-if="memos?.length" v-for="memo in memos" :memo="memo" :key="memo.title" />
        <div v-else class="mx-auto mt-6 flex gap-2 font-semibold" :class="isDark && `text-white`">
          <p class="md:text-3xl text-2xl italic">Let's register a new memo...</p>
          <font-awesome-icon
            :icon="['fas', 'pen']"
            class="md:w-[40px] md:h-[40px] w-[30px] h-[30px] cursor-pointer select-none hover:-translate-y-1 duration-200"
            @click="uiStore.handleRegisterModal"
          />
        </div>
      </div>
    </div>
  </main>
  <footer class="w-full h-[60px] text-center text-[18px] mt-4" :class="isDark && `text-white`">
    <small class="leading-[60px]">&copy; {{ now.getFullYear() }} SeiyaCode</small>
  </footer>
</template>
