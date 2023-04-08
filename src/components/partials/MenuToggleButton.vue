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
  <div class="w-[100px] h-[100px] rounded-bl-full bg-cyan-900 fixed top-0 right-0" :class="props.isDark && `!bg-cyan-600`">
    <div class="relative">
      <button class="absolute top-7 right-7" @click="onClick">
        <font-awesome-icon v-if="isOpen" :icon="['fas', 'xmark']" class="text-3xl text-white" />
        <font-awesome-icon v-else :icon="['fas', 'ellipsis']" class="text-3xl text-white" />
      </button>
    </div>
  </div>
</template>
