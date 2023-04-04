<script setup lang="ts">
import MenuToggleButton from "./partials/MenuToggleButton.vue";
import MiniModal from "./partials/MiniModal.vue";

import { ref } from "vue";
const isShow = ref<boolean>(false);

const props = defineProps({
  isDark: Boolean,
});

const showMenu = () => {
  isShow.value = !isShow.value;
};

const emits = defineEmits(["onClick"]);
const onClick = () => {
  emits("onClick");
};
</script>

<template>
  <div>
    <MenuToggleButton @show-menu="showMenu" :isDark="props.isDark" />
    <MiniModal v-show="isShow" @on-click="onClick" :isDark="props.isDark" />
  </div>
</template>
