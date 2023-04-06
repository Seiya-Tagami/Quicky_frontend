import { defineStore } from "pinia";

export const useUserInterfaceStore = defineStore("UserInterface", {
  state: () => ({
    isDark: false,
    isOpen: false,
    registerModalIsShowed: false,
    editModalIsShowed: false,
  }),
  actions: {
    changeTheme() {
      this.isDark = !this.isDark;
      document.querySelector("body")!.classList.toggle("bg-gray-800");
    },
    openMenu() {
      this.isOpen = !this.isOpen;
    },
    handleRegisterModal() {
      this.registerModalIsShowed = !this.registerModalIsShowed;
    },
    handleEditModal() {
      this.editModalIsShowed = !this.editModalIsShowed;
    }
  },
});