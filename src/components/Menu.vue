<script setup lang="ts">
import MenuToggleButton from "./partials/MenuToggleButton.vue";
import MiniModal from "./partials/MiniModal.vue";

import { useUserInterfaceStore } from "../stores/UserInterfaceStore";
import { storeToRefs } from "pinia";

const store = useUserInterfaceStore();
const { isDark, isOpen } = storeToRefs(store);
</script>

<template>
  <div class="overflow-hidden">
    <MenuToggleButton @open-menu="store.openMenu" :isDark="isDark" />
    <MiniModal v-show="isOpen" @on-click="store.changeTheme" :isDark="isDark" />
  </div>
</template>
