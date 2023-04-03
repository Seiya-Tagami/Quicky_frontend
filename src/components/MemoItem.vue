<script setup lang="ts">
import { ref } from "vue";
import EditModal from "./EditModal.vue";
import { UpdatingData } from "../types"

const editModalIsShowed = ref<boolean>(false);
const isDone = ref<boolean>(false);

const handleEditModal = () => (editModalIsShowed.value = !editModalIsShowed.value);

// props
const props = defineProps({
  memo: Object,
});

// emits
const emit = defineEmits(["handleMemo", "updateMemo"]);
const handleMemo = () => {
  if (!props.memo) return;
  emit("handleMemo", props.memo.id);

  isDone.value = !isDone.value;
};

const updateMemo = (updatingData: UpdatingData) => {
  emit("updateMemo", updatingData);
  editModalIsShowed.value = false;
};
</script>

<template>
  <div
    class="w-full flex items-center justify-around p-3 md:border-l-[5px] border-l-[6px] border-blue-900 bg-white rounded-md duration-300"
    :class="props.memo!.isDone && `!border-green-500 `"
  >
    <input type="checkbox" @change="handleMemo" :checked="props.memo?.isDone" class="w-8 h-4 cursor-pointer" />
    <div class="max-w-[480px] w-full flex md:justify-between md:flex-row flex-col ml-[36px]">
      <span class="w-fit font-semibold relative text-[18px] text-cyan-900 duration-300" :class="props.memo!.isDone && `!text-gray-300`">
        {{ props.memo?.title.substring(0, 15) }}<span class="text-gray-400">{{ props.memo?.title.length > 15 ? "..." : "" }}</span>
        <div class="absolute w-[150%] h-[2px] top-1/2 left-1/2 -translate-x-1/2 bg-cyan-900" v-show="props.memo?.isDone" />
      </span>
      <div class="flex gap-2 text-gray-500 duration-300" :class="props.memo!.isDone && `!text-gray-300`">
        <span>{{ props.memo?.updatedAt !== "" ? "updated at" : "created at" }}</span>
        <span>{{ props.memo?.updatedAt !== "" ? props.memo?.updatedAt : props.memo?.createdAt }}</span>
      </div>
    </div>
    <button class="text-white bg-blue-900 md:p-3 p-2 font-semibold rounded w-fit" @click="handleEditModal">Detail</button>
  </div>
  <EditModal v-if="editModalIsShowed" @handle-modal="handleEditModal" @update-memo="updateMemo" :id="props.memo!.id" :title="props.memo!.title" :content="props.memo!.content" />
</template>
