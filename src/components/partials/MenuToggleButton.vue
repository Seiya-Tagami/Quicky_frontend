<script setup lang="ts">
import { ref } from "vue";

// props
const props = defineProps({
  isDark: Boolean,
});

// functions
const isOpen = ref<boolean>(false);
const emits = defineEmits(["open-menu"]);
const onClick = () => {
  emits("open-menu");
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="w-[210px] h-[210px] bg-cyan-900 fixed md:-top-[110px] md:-right-[110px] -top-[115px] -right-[115px] rotate-45 rounded-full" :class="props.isDark && `!bg-cyan-600`">
    <div class="w-full h-full relative">
      <button class="left-1/2 -translate-x-1/2 bottom-[25px] absolute" @click="onClick">
        <font-awesome-icon v-if="isOpen" :icon="['fas', 'xmark']" class="text-3xl text-white -rotate-45" />
        <font-awesome-icon v-else :icon="['fas', 'ellipsis']" class="text-3xl text-white -rotate-45" />
      </button>
    </div>
  </div>
</template>
