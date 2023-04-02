<script setup lang="ts">
import { ref } from "vue";

// props
const props = defineProps({
  id: String,
  title: String,
  content: String,
});

const title = ref<string>(props.title!);
const content = ref<string>(props.content!);
const preventUpdate = ref<boolean>(false);

const checkContent = () => {
  const isInputContent = title.value.trim() !== "" && content.value.trim() !== "";
  const isSameContent = props.title !== title.value || props.content !== content.value;
  if (isInputContent && isSameContent) {
    preventUpdate.value = false;
  } else {
    preventUpdate.value = true;
  }
};
// emits
const emit = defineEmits(["handleModal", "updateMemo"]);
const handleEditModal = () => {
  emit("handleModal");
};

const updateMemo = () => {
  checkContent();
  if (preventUpdate.value) return;
  emit("updateMemo", { id: props.id, title: title, content: content });
};
</script>

<template>
  <div class="max-w-[600px] md:w-full w-[95%] bg-white border rounded-md p-6 absolute top-0 left-1/2 z-20 animate-slide-bottom">
    <div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">Detail</h2>
        <button @click="handleEditModal">
          <font-awesome-icon :icon="['fas', 'xmark']" class="w-7 h-7 cursor-pointer" />
        </button>
      </div>
      <div v-show="preventUpdate" class="mt-2 -mb-2 flex items-center gap-2 bg-yellow-100 p-2 rounded-md font-semibold text-yellow-600">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        <span>Error! In order to update, you should change the title or content.</span>
      </div>
      <div class="mt-4 flex items-center border border-gray-400">
        <span class="px-4 py-2 bg-gray-200 font-bold">title</span>
        <input type="text" class="p-2 flex-[1]" v-model="title" />
      </div>
      <div class="w-full mt-2">
        <textarea class="w-full md:h-[200px] h-[300px] px-4 py-2 border border-gray-400" v-model="content" placeholder="content"></textarea>
      </div>
      <div class="mt-2 ml-auto flex gap-2 w-fit">
        <button class="block text-white bg-gray-500 px-4 py-3 text-[16px] font-semibold rounded w-fit disabled:bg-slate-300" @click="handleEditModal">Cancel</button>
        <button class="block text-white bg-blue-900 disabled:bg-slate-300 px-4 py-3 text-[16px] font-semibold rounded w-fit" @click="updateMemo">Update</button>
      </div>
    </div>
  </div>
  <div class="w-screen fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#07070750]" />
</template>
