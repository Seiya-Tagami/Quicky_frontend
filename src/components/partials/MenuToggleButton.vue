<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  isDark: Boolean,
});

const isOpen = ref<boolean>(false);
const emits = defineEmits(["showMenu"]);
const onClick = () => {
  emits("showMenu");
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="w-[210px] h-[210px] bg-cyan-900 fixed md:-top-[110px] md:-right-[110px] -top-[125px] -right-[125px] rotate-45" :class="props.isDark && `!bg-cyan-600`">
    <div class="w-full h-full relative">
      <button class="left-1/2 -translate-x-1/2 md:bottom-[25px] bottom-[15px] absolute" @click="onClick">
        <font-awesome-icon v-if="isOpen" :icon="['fas', 'xmark']" class="text-3xl text-white -rotate-45" />
        <font-awesome-icon v-else :icon="['fas', 'ellipsis']" class="text-3xl text-white -rotate-45" />
      </button>
    </div>
  </div>
</template>
