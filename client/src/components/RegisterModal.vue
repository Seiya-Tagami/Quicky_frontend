<script setup lang="ts">
import { ref } from "vue";

const title = ref<string>("");
const content = ref<string>("");

const allowAdd = ref<boolean>(true);
const checkContent = () => {
  if (title.value.trim() !== "" && content.value.trim() !== "") {
    allowAdd.value = false;
  } else {
    allowAdd.value = true;
  }
};

// emits
const emit = defineEmits(["handleModal", "addMemo"]);
const handleModal = () => {
  emit("handleModal");
};

const addMemo = () => {
  emit("addMemo", { title: title.value, content: content.value });
  title.value = "";
  content.value = "";
};
</script>

<template>
  <div class="max-w-[600px] w-full bg-white border rounded-md p-6 absolute top-0 left-1/2 z-20 animate-slide-bottom">
    <div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">New memo</h2>
        <button @click="handleModal">
          <font-awesome-icon :icon="['fas', 'xmark']" class="w-7 h-7 cursor-pointer" />
        </button>
      </div>
      <div class="flex items-center mt-8 border border-gray-400">
        <span class="px-4 py-2 bg-gray-200 font-bold">title</span>
        <input type="text" class="p-2 flex-[1]" v-model="title" @change="checkContent" />
      </div>
      <div class="w-full border border-gray-400 mt-2">
        <textarea id="js-body" class="w-full md:h-[200px] h-[300px] px-4 py-2" v-model="content" placeholder="content" @change="checkContent"></textarea>
      </div>
      <button class="block mt-2 ml-auto text-white bg-blue-900 disabled:bg-slate-300 px-4 py-3 text-[16px] font-semibold rounded w-fit" @click="addMemo" :disabled="allowAdd">
        Register
      </button>
    </div>
  </div>
  <div class="w-screen h-screen absolute inset-0 z-10 bg-[#07070750]" @click="handleModal" />
</template>
