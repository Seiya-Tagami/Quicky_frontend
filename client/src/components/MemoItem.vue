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
  <div class="w-full flex items-center justify-around md:p-3 p-2 border-l-4 border-green-500 bg-white rounded-md duration-300 relative ">
    <input type="checkbox" @change="handleMemo" :checked="props.memo!.isDone" />
    <span>{{ props.memo && props.memo.title }}</span>
    <span>{{ props.memo && props.memo.createdAt }}</span>
    <span>{{ props.memo && props.memo.updatedAt }}</span>
    <button class="text-white bg-blue-900 md:p-3 p-2 font-semibold rounded w-fit" @click="handleEditModal">Detail</button>
    <div class="absolute w-[60%] h-[2px] bg-slate-500" v-show="props.memo!.isDone" />
  </div>
  <EditModal
    v-if="editModalIsShowed"
    @handle-edit-modal="handleEditModal"
    @update-memo="updateMemo"
    :id="props.memo!.id"
    :title="props.memo!.title"
    :content="props.memo!.content"
  />
</template>
