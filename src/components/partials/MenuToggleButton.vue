<script setup lang="ts">
// pinia
import { useUserInterfaceStore } from '../../stores/UserInterfaceStore';
import { storeToRefs } from 'pinia';
const uiStore = useUserInterfaceStore();
const { isOpen } = storeToRefs(uiStore);

// props
const props = defineProps({
  isDark: Boolean,
});

// functions
const emits = defineEmits(['open-menu']);
const onClick = () => {
  emits('open-menu');
};
</script>

<template>
  <div class="w-[100px] h-[100px] rounded-bl-full bg-cyan-900 absolute top-0 right-0 select-none" :class="props.isDark && `!bg-cyan-600`">
    <div class="relative">
      <button class="absolute top-7 right-7" @click="onClick">
        <font-awesome-icon v-if="isOpen" :icon="['fas', 'xmark']" class="text-3xl text-white" />
        <font-awesome-icon v-else :icon="['fas', 'ellipsis']" class="text-3xl text-white" />
      </button>
    </div>
  </div>
</template>
