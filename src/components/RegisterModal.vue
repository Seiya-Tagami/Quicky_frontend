<script setup lang="ts">
import { ref } from "vue";

import ActionButton from "./partials/ActionButton.vue";

const title = ref<string>("");
const content = ref<string>("");

const preventAdd = ref<boolean>(false);

const props = defineProps({
  isDark: Boolean,
});

const checkContent = () => {
  const isInputContent = title.value.trim() !== "" && content.value.trim() !== "";
  if (isInputContent) {
    preventAdd.value = false;
  } else {
    preventAdd.value = true;
  }
};

// emits
const emit = defineEmits(["handleModal", "addMemo"]);
const handleRegisterModal = () => {
  emit("handleModal");
};

const addMemo = () => {
  checkContent();
  if (preventAdd.value) return;
  emit("addMemo", { title: title.value, content: content.value });
  title.value = "";
  content.value = "";
};
</script>

<template>
  <div
    class="max-w-[600px] md:w-full w-[95%] border rounded-md p-6 absolute top-0 left-1/2 z-20 animate-slide-bottom"
    :class="props.isDark ? `bg-gray-800 text-cyan-500 border-cyan-500` : `bg-white text-cyan-900`"
  >
    <div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">New memo</h2>
        <button @click="handleRegisterModal">
          <font-awesome-icon :icon="['fas', 'xmark']" class="w-7 h-7 cursor-pointer" />
        </button>
      </div>
      <div v-show="preventAdd" class="mt-2 -mb-2 flex items-center gap-2 bg-yellow-100 p-2 rounded-md font-semibold text-yellow-600">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        <span>Error! In order to register, you should type the title and content.</span>
      </div>
      <div class="flex items-center mt-4 text-gray-300 border border-gray-400 rounded">
        <span class="px-4 py-2 bg-gray-200 font-bold text-gray-400 rounded-l" :class="props.isDark && `bg-gray-700`">title</span>
        <input type="text" class="p-2 flex-[1] rounded-r" :class="props.isDark && `bg-gray-800`" v-model="title" />
      </div>
      <div class="w-full mt-2 text-gray-300">
        <textarea
          id="js-body"
          class="w-full md:h-[200px] h-[300px] px-4 py-2 border border-gray-400 rounded"
          :class="props.isDark && `bg-gray-800`"
          v-model="content"
          placeholder="content"
        ></textarea>
      </div>
      <div class="mt-2 ml-auto flex gap-2 w-fit">
        <ActionButton :btn-color="props.isDark ? `bg-gray-400` : `bg-gray-500`" @on-click="handleRegisterModal">Cancel</ActionButton>
        <ActionButton :btn-color="props.isDark ? `bg-blue-400` : `bg-blue-900`" @on-click="addMemo">Register</ActionButton>
      </div>
    </div>
  </div>
  <div class="w-screen fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#07070750]" />
</template>
