<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps({
  isDark: Boolean,
});

const isSpin = ref<boolean>(false);
const emits = defineEmits(["onClick"]);
const onClick = () => {
  emits("onClick");
  isSpin.value = true;
  setTimeout(() => {
    isSpin.value = false;
  }, 2000);
};

</script>

<template>
  <div
    class="w-[200px] text-cyan-900 bg-gray-200 border-2 border-cyan-900 rounded-lg fixed md:top-[66px] top-[50px] right-[16px]"
    :class="isDark && `!bg-gray-800 text-white border-cyan-600`"
  >
    <div class="w-full flex items-center justify-start gap-[16px] px-3 py-3 border-cyan-900 border-b-[1px]" :class="props.isDark && `!border-cyan-600`">
      <span class="font-semibold">Appearance</span>
      <font-awesome-icon :icon="['fas', 'circle-half-stroke']" class="text-2xl cursor-pointer" :class="isSpin && `fa-spin-pulse`" @click="onClick" />
    </div>
    <div>
      <div class="flex items-center justify-start gap-6 px-3 py-2">
        <span class="font-semibold">Follow me!</span>
        <div class="flex items-center gap-3">
          <a href="https://github.com/Seiya-Tagami/Simple-Memo" :class="props.isDark && `w-7 h-7 rounded-lg bg-white flex items-center justify-center`">
            <img src="../../assets/github.png" alt="github" class="w-6 h-6" />
          </a>
          <a href="https://seiya-tagami.github.io/portfolio" :class="props.isDark && `w-7 h-7 rounded-lg bg-white flex items-center justify-center`">
            <img src="../../assets/developer.png" alt="developer" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
