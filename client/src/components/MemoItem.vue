<script setup lang="ts">
// props
const props = defineProps({
  memo: Object,
});

// emits
const emit = defineEmits(["deleteMemo"]);
const deleteMemo = () => {
  if (!props.memo) return;
  emit("deleteMemo", props.memo.id);
};
</script>

<template>
  <div class="w-full flex p-3 items-center justify-around border-b border-gray-200 hover:bg-gray-100 duration-300">
    <input type="checkbox" @change="deleteMemo" />
    <span>{{ props.memo && props.memo.title }}</span>
    <span>{{ props.memo && props.memo.createdAt }}</span>
    <span>{{ props.memo && props.memo.updatedAt }}</span>
    <button class="text-white bg-blue-600 px-3 py-3 text-[16px] font-semibold rounded w-fit">編集</button>
  </div>
</template>
