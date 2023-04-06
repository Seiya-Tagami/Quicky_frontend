<script setup lang="ts">
import { ref } from "vue";

import ActionButton from "./partials/ActionButton.vue";
import { useUserInterfaceStore } from "../stores/UserInterfaceStore";
import { useMemoStore } from "../stores/MemoStore";
import { storeToRefs } from "pinia";
const uiStore = useUserInterfaceStore();
const { isDark, editModalIsShowed } = storeToRefs(uiStore);
const memoStore = useMemoStore();

// props
const props = defineProps({
  id: String,
  title: String,
  content: String,
});

const title = ref<string>(props.title!);
const content = ref<string>(props.content!);
const preventUpdate = ref<boolean>(false);

// functions
const checkContent = () => {
  const isInputContent = title.value.trim() !== "" && content.value.trim() !== "";
  const isSameContent = props.title !== title.value || props.content !== content.value;
  if (isInputContent && isSameContent) {
    preventUpdate.value = false;
  } else {
    preventUpdate.value = true;
  }
};

const updateMemo = () => {
  checkContent();
  if (preventUpdate.value) return;
  memoStore.updateFn({ id: props.id!, title: title.value, content: content.value });
  editModalIsShowed.value = false;
};
</script>

<template>
  <div
    class="max-w-[600px] md:w-full w-[95%] border rounded-md p-6 absolute top-0 left-1/2 z-20 animate-slide-bottom"
    :class="isDark ? `bg-gray-800 text-cyan-500 border-cyan-500` : `bg-white text-cyan-900`"
  >
    <div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">Detail</h2>
        <button @click="uiStore.handleEditModal">
          <font-awesome-icon :icon="['fas', 'xmark']" class="w-7 h-7 cursor-pointer" />
        </button>
      </div>
      <div v-show="preventUpdate" class="mt-2 -mb-2 flex items-center gap-2 bg-yellow-100 p-2 rounded-md font-semibold text-yellow-600">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        <span>Error! In order to update, you should change the title or content.</span>
      </div>
      <div class="mt-4 flex items-center border border-gray-400 rounded" :class="isDark && `text-gray-300`">
        <span class="px-4 py-2 bg-gray-200 font-bold rounded-l" :class="isDark && `bg-gray-700`">title</span>
        <input type="text" class="p-2 flex-[1] rounded-r" :class="isDark && `bg-gray-800`" v-model="title" />
      </div>
      <div class="w-full mt-2" :class="isDark && `text-gray-300`">
        <textarea
          class="w-full md:h-[200px] h-[300px] px-4 py-2 border border-gray-400 rounded"
          :class="isDark && `bg-gray-800`"
          v-model="content"
          placeholder="content"
        ></textarea>
      </div>
      <div class="mt-2 ml-auto flex gap-2 w-fit">
        <ActionButton :btn-color="isDark ? `bg-gray-400` : `bg-gray-500`" @on-click="uiStore.handleEditModal">Cancel</ActionButton>
        <ActionButton :btn-color="isDark ? `bg-blue-400` : `bg-blue-900`" @on-click="updateMemo">Update</ActionButton>
      </div>
    </div>
  </div>
  <div class="w-screen fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#07070750]" />
</template>
