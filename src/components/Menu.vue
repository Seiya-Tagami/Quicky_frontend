<script setup lang="ts">
import MenuToggleButton from "./partials/MenuToggleButton.vue";
import MiniModal from "./partials/MiniModal.vue";

import { ref } from "vue";
const isShow = ref<boolean>(false);
const isDark = ref<boolean>(false);

const showMenu = () => {
  isShow.value = !isShow.value;
};

const onClick = () => {
  isDark.value = !isDark.value
  alert(isDark.value);
};
</script>

<template>
  <div>
    <MenuToggleButton @show-menu="showMenu" />
    <MiniModal v-show="isShow" @on-click="onClick" />
  </div>
</template>
