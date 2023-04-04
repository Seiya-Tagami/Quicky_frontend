<script setup lang="ts">
const props = defineProps({
  btnColor: String,
});

const emits = defineEmits(["onClick"]);
const onClick = () => {
  emits("onClick");
};
</script>

<template>
  <button class="text-white px-3 py-3 text-[16px] font-semibold rounded w-fit" :class="btnColor" @click="onClick"><slot></slot></button>
</template>
