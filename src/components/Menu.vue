<script setup lang="ts">
import MenuToggleButton from './partials/MenuToggleButton.vue';
import MiniModal from './partials/MiniModal.vue';

//pinia
import { useUserInterfaceStore } from '../stores/UserInterfaceStore';
import { storeToRefs } from 'pinia';
const uiStore = useUserInterfaceStore();
const { isDark, isOpen } = storeToRefs(uiStore);
</script>

<template>
  <div>
    <MenuToggleButton @open-menu="uiStore.handleMenu" :isDark="isDark" />
    <MiniModal v-show="isOpen" @on-click="uiStore.changeTheme" :isDark="isDark" />
  </div>
</template>
