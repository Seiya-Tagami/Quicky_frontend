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
const allowUpdate = ref<boolean>(true);

const checkContent = () => {
  const isInputContent = title.value.trim() !== "" && content.value.trim() !== "";
  const isSameContent = props.title !== title.value || props.content !== content.value;
  if (isInputContent && isSameContent) {
    allowUpdate.value = false;
  } else {
    allowUpdate.value = true;
  }
};
// emits
const emit = defineEmits(["handleModal", "updateMemo"]);
const handleEditModal = () => {
  emit("handleModal");
};

const updateMemo = () => {
  emit("updateMemo", { id: props.id, title: title, content: content });
};
</script>

<template>
  <div class="max-w-[600px] w-full bg-white border rounded-md p-6 absolute top-0 left-1/2 z-20 animate-slide-bottom">
    <div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">Detail</h2>
        <button @click="handleEditModal">
          <font-awesome-icon :icon="['fas', 'xmark']" class="w-7 h-7 cursor-pointer" />
        </button>
      </div>
      <div class="flex items-center mt-8 border border-gray-400">
        <span class="px-4 py-2 bg-gray-200 font-bold">title</span>
        <input type="text" class="p-2 flex-[1]" v-model="title" @change="checkContent" />
      </div>
      <div class="w-full mt-2">
        <textarea class="w-full md:h-[200px] h-[300px] px-4 py-2 border border-gray-400" v-model="content" @change="checkContent" placeholder="content"></textarea>
      </div>
      <div class="mt-2 ml-auto flex gap-2 w-fit">
        <button class="block text-white bg-gray-500 px-4 py-3 text-[16px] font-semibold rounded w-fit disabled:bg-slate-300" @click="handleEditModal">Cancel</button>
        <button class="block text-white bg-blue-900 disabled:bg-slate-300 px-4 py-3 text-[16px] font-semibold rounded w-fit" @click="updateMemo" :disabled="allowUpdate">
          Update
        </button>
      </div>
    </div>
  </div>
  <div class="w-screen h-screen absolute inset-0 z-10 bg-[#07070750]" />
</template>
