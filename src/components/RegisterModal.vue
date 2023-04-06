<script setup lang="ts">
import { ref } from "vue";

import ActionButton from "./partials/ActionButton.vue";

// pinia
import { useUserInterfaceStore } from "../stores/UserInterfaceStore";
import { useMemoStore } from "../stores/MemoStore";
import { storeToRefs } from "pinia";
const uiStore = useUserInterfaceStore();
const { isDark, registerModalIsShowed } = storeToRefs(uiStore);
const memoStore = useMemoStore();

const title = ref<string>("");
const content = ref<string>("");
const preventAdd = ref<boolean>(false);

// functions
const checkContent = () => {
  const isInputContent = title.value.trim() !== "" && content.value.trim() !== "";
  if (isInputContent) {
    preventAdd.value = false;
  } else {
    preventAdd.value = true;
  }
};

const addMemo = () => {
  checkContent();
  if (preventAdd.value) return;
  memoStore.addFn({ title: title.value, content: content.value });
  title.value = "";
  content.value = "";
  registerModalIsShowed.value = false;
};
</script>

<template>
  <div
    class="max-w-[600px] md:w-full w-[95%] border rounded-md p-6 absolute top-0 left-1/2 z-20 animate-slide-bottom"
    :class="isDark ? `bg-gray-800 text-cyan-500 border-cyan-500` : `bg-white text-cyan-900`"
  >
    <div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">New memo</h2>
        <button @click="uiStore.handleRegisterModal">
          <font-awesome-icon :icon="['fas', 'xmark']" class="w-7 h-7 cursor-pointer" />
        </button>
      </div>
      <div v-show="preventAdd" class="mt-2 -mb-2 flex items-center gap-2 bg-yellow-100 p-2 rounded-md font-semibold text-yellow-600">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        <span>Error! In order to register, you should type the title and content.</span>
      </div>
      <div class="flex items-center mt-4 border border-gray-400 rounded" :class="isDark && `text-gray-300`">
        <span class="px-4 py-2 bg-gray-200 font-bold rounded-l" :class="isDark && `bg-gray-700`">title</span>
        <input type="text" class="p-2 flex-[1] rounded-r" :class="isDark && `bg-gray-800`" v-model="title" />
      </div>
      <div class="w-full mt-2" :class="isDark && `text-gray-300`">
        <textarea
          id="js-body"
          class="w-full md:h-[200px] h-[300px] px-4 py-2 border border-gray-400 rounded"
          :class="isDark && `bg-gray-800`"
          v-model="content"
          placeholder="content"
        ></textarea>
      </div>
      <div class="mt-2 ml-auto flex gap-2 w-fit">
        <ActionButton :btn-color="isDark ? `bg-gray-400` : `bg-gray-500`" @on-click="uiStore.handleRegisterModal">Cancel</ActionButton>
        <ActionButton :btn-color="isDark ? `bg-blue-400` : `bg-blue-900`" @on-click="addMemo">Register</ActionButton>
      </div>
    </div>
  </div>
  <div class="w-screen fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#07070750]" />
</template>
