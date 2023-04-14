<script setup lang="ts">
const props = defineProps({
  btnColor: String,
});

const emits = defineEmits(['on-click']);
const onClick = () => {
  emits('on-click');
};
</script>

<template>
  <button class="w-fit flex items-center gap-3 text-white px-5 py-3 md:p-3 text-[16px] font-semibold rounded select-none" :class="props.btnColor" @click="onClick">
    <slot></slot>
  </button>
</template>
