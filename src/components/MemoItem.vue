<script setup lang="ts">
import { ref } from "vue";
import EditModal from "./EditModal.vue";
import { UpdatingData } from "../types/type";

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
    class="w-full flex items-center justify-around p-3 md:border-l-[5px] border-l-[6px] border-blue-900 bg-white rounded-md duration-300 relative"
    :class="props.memo!.isDone && `!border-green-500 text-gray-300`"
  >
    <input type="checkbox" @change="handleMemo" :checked="props.memo!.isDone" class="w-4 h-4" />
    <span class="font-semibold"
      >{{ props.memo && props.memo.title.substring(0, 10) }}<span class="text-gray-400">{{ props.memo && props.memo.title.length > 10 ? "..." : "" }}</span></span
    >
    <span>{{ props.memo && props.memo.createdAt }}</span>
    <span>{{ props.memo && props.memo.updatedAt }}</span>
    <button class="text-white bg-blue-900 md:p-3 p-2 font-semibold rounded w-fit" @click="handleEditModal">Detail</button>
    <div class="absolute w-[50%] h-[2px] bg-slate-600" v-show="props.memo!.isDone" />
  </div>
  <EditModal v-if="editModalIsShowed" @handle-modal="handleEditModal" @update-memo="updateMemo" :id="props.memo!.id" :title="props.memo!.title" :content="props.memo!.content" />
</template>
