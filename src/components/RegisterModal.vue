<script setup lang="ts">
import { ref, watch } from 'vue';

import ActionButton from './partials/ActionButton.vue';

// pinia
import { useUserInterfaceStore } from '../stores/UserInterfaceStore';
import { useMemoStore } from '../stores/MemoStore';
import { storeToRefs } from 'pinia';
const uiStore = useUserInterfaceStore();
const { isDark, registerModalIsShowed } = storeToRefs(uiStore);
const memoStore = useMemoStore();

// functions
const title = ref<string>('');
const content = ref<string>('');
const category = ref<string>('study');
const link = ref<string>('');
const preventAdd = ref<boolean>(false);

const checkContent = () => {
  const isInputContent = title.value.trim() !== '' && content.value.trim() !== '';
  if (isInputContent) {
    preventAdd.value = false;
  } else {
    preventAdd.value = true;
  }
};

const addMemo = () => {
  checkContent();
  if (preventAdd.value) return;
  memoStore.addFn({ title: title.value, content: content.value, category: category.value, link: link.value });
  title.value = '';
  content.value = '';
  category.value = '';
  link.value = '';
  registerModalIsShowed.value = false;
};

watch(category, (newVal) => {
  console.log(newVal);
});
</script>

<template>
  <div class="max-w-[600px] md:w-full w-[90%] h-screen rounded-l-md p-6 fixed top-0 right-0 z-20 animate-slide-in" :class="isDark ? `bg-gray-800 ` : `bg-white `">
    <div>
      <h2 class="font-bold text-2xl" :class="isDark ? `text-cyan-500 ` : `text-cyan-900`">New memo</h2>
      <div v-show="preventAdd" class="mt-2 -mb-2 flex items-center gap-2 bg-yellow-100 p-2 rounded-md font-semibold text-yellow-600">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        <span>Error! In order to register, you should type the title and content.</span>
      </div>
      <div class="flex items-center mt-4 border border-gray-400 text-[16px] rounded" :class="isDark && `text-gray-300`">
        <span class="px-4 py-2 bg-gray-200 font-bold rounded-l" :class="isDark && `bg-gray-700`">title</span>
        <input type="text" class="p-2 flex-[1] rounded-r" :class="isDark && `bg-gray-800`" v-model="title" />
      </div>
      <div class="w-full mt-2 text-[16px]" :class="isDark && `text-gray-300`">
        <textarea class="w-full md:h-[200px] h-[260px] px-4 py-2 border border-gray-400 rounded" :class="isDark && `bg-gray-800`" v-model="content" placeholder="content">
        </textarea>
      </div>
      <div class="mt-2 flex items-center gap-3">
        <span class="font-semibold" :class="isDark ? `text-white` : `text-dark`">Category</span>
        <select
          name="category"
          id=""
          class="p-2 border text-[16px] h-fit rounded cursor-pointer"
          :class="isDark ? `text-cyan-600 border-cyan-600 bg-gray-800` : `text-cyan-900 border-cyan-900`"
          v-model="category"
        >
          <option value="study" selected>study</option>
          <option value="hobby">hobby</option>
          <option value="hobby">work</option>
          <option value="others">others</option>
        </select>
      </div>
      <div class="flex items-center gap-2 mt-2 text-[16px]" :class="isDark && `text-gray-300`">
        <font-awesome-icon :icon="['fas', 'link']" />
        <input type="text" class="w-full p-1 border border-gray-400 rounded" :class="isDark && `bg-gray-800`" v-model="link" placeholder="add link" />
      </div>
      <div class="mt-6 ml-auto flex gap-2 w-fit">
        <ActionButton :btn-color="isDark ? `bg-gray-400` : `bg-gray-500`" @on-click="uiStore.handleRegisterModal">Cancel</ActionButton>
        <ActionButton :btn-color="isDark ? `bg-blue-400` : `bg-blue-900`" @on-click="addMemo">Register</ActionButton>
      </div>
    </div>
  </div>
  <div class="w-screen fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#07070750]" :class="isDark && `bg-[#70707050]`" @click="uiStore.handleRegisterModal" />
</template>
