<script setup lang="ts">
const props = defineProps({
  isDark: Boolean,
});
const emits = defineEmits(["showMenu"]);
const onClick = () => {
  emits("showMenu");
};
</script>

<template>
  <div class="w-[210px] h-[210px] bg-cyan-900 fixed md:-top-[100px] md:-right-[100px] -top-[125px] -right-[125px] rotate-45" :class="props.isDark && `!bg-cyan-600`">
    <div class="w-full h-full relative">
      <button class="left-1/2 -translate-x-1/2 md:bottom-[25px] bottom-[15px] absolute" @click="onClick">
        <font-awesome-icon :icon="['fas', 'ellipsis']" class="text-3xl text-white -rotate-45" />
      </button>
    </div>
  </div>
</template>
