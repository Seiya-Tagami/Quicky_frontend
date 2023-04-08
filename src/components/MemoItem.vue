<script setup lang="ts">
import { ref } from "vue";
import EditModal from "./EditModal.vue";

// pinia
import { useUserInterfaceStore } from "../stores/UserInterfaceStore";
import { useMemoStore } from "../stores/MemoStore";
import { storeToRefs } from "pinia";
const uiStore = useUserInterfaceStore();
const { isDark, isOpen } = storeToRefs(uiStore);
const memoStore = useMemoStore();

// props
const props = defineProps({
  memo: Object,
});

// functions
const isDone = ref<boolean>(false);
const editModalIsShowed = ref<boolean>(false);

const handleMemo = () => {
  if (!props.memo) return;
  memoStore.handleFn(props.memo.id);
  isDone.value = !isDone.value;
};

const handleEditModal = () => {
  editModalIsShowed.value = !editModalIsShowed.value;
};
</script>

<template>
  <div
    class="w-full flex items-center justify-around p-3 md:border-l-[5px] border-l-[6px] rounded-md duration-300"
    :class="[props.memo!.isDone && `${isDark ? `!border-green-400` : `!border-green-600`}`, isDark ? `bg-gray-700 border-blue-400` : `bg-white border-blue-900`]"
  >
    <input type="checkbox" @change="handleMemo" :checked="props.memo?.isDone" class="w-8 h-4 cursor-pointer" />
    <div class="max-w-[480px] w-full flex md:justify-between md:flex-row flex-col ml-[36px]">
      <span class="w-fit font-semibold relative text-[18px] duration-300" :class="[isDark ? `text-white` : `text-cyan-900`, props.memo!.isDone && `!text-gray-300`]">
        {{ props.memo?.title.substring(0, 15) }}<span class="text-gray-400">{{ props.memo?.title.length > 15 ? "..." : "" }}</span>
        <div class="absolute w-[150%] h-[2px] top-1/2 left-1/2 -translate-x-1/2" :class="isDark ? `bg-blue-400` : `bg-cyan-900`" v-show="props.memo?.isDone" />
      </span>
      <div class="flex gap-2 duration-300" :class="[isDark ? `text-violet-300` : `text-gray-500`,props.memo!.isDone && `${isDark ? `!text-gray-400` : `!text-gray-300`}`]">
        <span>{{ props.memo?.updatedAt !== "" ? "updated at" : "created at" }}</span>
        <span class="font-semibold">{{ props.memo?.updatedAt !== "" ? props.memo?.updatedAt : props.memo?.createdAt }}</span>
      </div>
    </div>
    <button class="md:p-3 p-2 font-semibold rounded w-fit text-white" :class="isDark ? `bg-blue-400` : `bg-blue-900`" @click="handleEditModal">Detail</button>
  </div>
  <EditModal v-if="editModalIsShowed" :id="props.memo!.id" :title="props.memo!.title" :content="props.memo!.content" :link="props.memo!.link" @on-click="handleEditModal" />
</template>
